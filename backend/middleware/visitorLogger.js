const Visitor = require("../models/Visitor");
const axios = require("axios");

// Rate limiting: Don't log same IP within 5 minutes
const logVisitorCache = new Map();

/**
 * Validate if IP is a valid public IP address
 */
const isValidIP = (ip) => {
  if (!ip || typeof ip !== "string") return false;

  // Remove IPv6 prefix if present
  const cleanIP = ip.split(":").pop();

  // Check for valid IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(cleanIP)) {
    const parts = cleanIP.split(".").map(Number);
    return parts.every((part) => part >= 0 && part <= 255);
  }

  // Check for valid IPv6 (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  if (ipv6Regex.test(cleanIP)) return true;

  return false;
};

const getGeolocation = async (ip) => {
  try {
    // If IP is invalid, use the server's own location
    const useServerLocation = !isValidIP(ip);
    const url = useServerLocation
      ? "https://ipinfo.io/json"
      : `https://ipinfo.io/${ip}/json`;

    const response = await axios.get(url, {
      timeout: 2000,
    });

    // Check for error response
    if (response.data && response.data.error) {
      console.error("IPInfo.io error:", response.data.error);
      return {
        country: "Unknown",
        region: "Unknown",
        city: "Unknown",
        latitude: null,
        longitude: null,
      };
    }

    // Check if the response contains valid location data
    if (response.data && response.data.country) {
      // Parse latitude and longitude from the "loc" field (format: "lat,lon")
      let latitude = null;
      let longitude = null;
      if (response.data.loc) {
        const parts = response.data.loc.split(",");
        latitude = parseFloat(parts[0]) || null;
        longitude = parseFloat(parts[1]) || null;
      }

      return {
        country: response.data.country || "Unknown",
        region: response.data.region || "Unknown",
        city: response.data.city || "Unknown",
        latitude,
        longitude,
      };
    }

    // Fallback values
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
    };
  } catch (error) {
    console.error("Geolocation error:", error.message);
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
    };
  }
};

const isBot = (userAgent) => {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
  ];
  return botPatterns.some((pattern) => pattern.test(userAgent));
};

const logVisitor = async (req, res, next) => {
  try {
    let ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Handle comma-separated IPs from x-forwarded-for (take the first one - client IP)
    if (ip && Array.isArray(ip)) {
      ip = ip[0];
    }
    if (ip && typeof ip === "string" && ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    // Clean up IPv6 prefix
    if (ip && ip.startsWith("::")) {
      ip = ip.substring(2);
    }
    if (ip && ip.startsWith("::ffff:")) {
      ip = ip.substring(7);
    }

    const userAgent = req.get("User-Agent") || "";
    const referrer = req.get("Referer") || null;
    const language = req.get("Accept-Language")?.split(",")[0] || "unknown";
    const page = req.path;

    // Skip if bot
    if (isBot(userAgent)) {
      return next();
    }

    // Rate limiting check
    const cacheKey = `${ip}-${page}`;
    const now = Date.now();
    const lastLog = logVisitorCache.get(cacheKey);

    if (lastLog && now - lastLog < 300000) {
      // 5 minutes
      return next();
    }

    logVisitorCache.set(cacheKey, now);

    // Get geolocation (fire and forget - don't wait)
    getGeolocation(ip).then((location) => {
      const visitor = new Visitor({
        ip: ip ? ip.split(":").pop() : "unknown", // Remove IPv6 prefix if present
        userAgent,
        referrer,
        language,
        page,
        ...location,
        // Support browser-provided coordinates
        latitude: req.body?.latitude !== undefined ? req.body.latitude : null,
        longitude:
          req.body?.longitude !== undefined ? req.body.longitude : null,
        // Explicitly set isBot to false for valid visitors
        isBot: false,
      });
      visitor.save().catch((err) => console.error("Visitor save error:", err));
    });

    next();
  } catch (error) {
    console.error("Visitor logging error:", error);
    next();
  }
};

module.exports = { logVisitor, isBot };
