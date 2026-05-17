const axios = require("axios");
const Visitor = require("../models/Visitor");

class VisitorService {
  /**
   * Check if user agent is a bot
   */
  static isBot(userAgent) {
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
  }

  /**
   * Validate if IP is a valid public IP address
   */
  static isValidIP(ip) {
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
  }

  /**
   * Get geolocation data from IP
   */
  static async getGeolocation(ip) {
    try {
      // If IP is invalid, use the server's own location
      const useServerLocation = !this.isValidIP(ip);
      const apiKey = process.env.IPINFO_API_KEY;
      const baseUrl = useServerLocation
        ? "https://ipinfo.io/json"
        : `https://ipinfo.io/${ip}/json`;
      const url = apiKey ? `${baseUrl}?token=${apiKey}` : baseUrl;

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
      // Final fallback - return default values
      return {
        country: "Unknown",
        region: "Unknown",
        city: "Unknown",
        latitude: null,
        longitude: null,
      };
    }
  }

  /**
   * Reverse geocode coordinates to city/region using Nominatim (OpenStreetMap)
   */
  static async reverseGeocode(latitude, longitude) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
      const response = await axios.get(url, {
        timeout: 3000,
        headers: {
          "User-Agent": "Portfolio-Visitor-Tracker/1.0",
        },
      });

      if (response.data && response.data.address) {
        const addr = response.data.address;
        return {
          country: addr.country || "Unknown",
          region: addr.state || addr.region || "Unknown",
          city:
            addr.city || addr.town || addr.village || addr.suburb || "Unknown",
        };
      }
      return null;
    } catch (error) {
      console.error("Reverse geocode error:", error.message);
      return null;
    }
  }

  /**
   * Track a new visitor
   */
  static async trackVisitor(visitData) {
    const { ip, userAgent, referrer, language, page, latitude, longitude } =
      visitData;

    // Skip bots
    if (this.isBot(userAgent)) {
      return { success: true, message: "Bot skipped" };
    }

    // Get geolocation from IP (fallback if browser location not available)
    const location = await this.getGeolocation(ip);

    // Determine if we have browser-provided coordinates
    const hasBrowserLocation =
      latitude !== undefined && longitude !== undefined;

    // Default values
    let finalLocation = { ...location };

    // If we have browser coordinates, use reverse geocoding to get city/region
    if (hasBrowserLocation) {
      const reverseLocation = await this.reverseGeocode(latitude, longitude);
      if (reverseLocation) {
        finalLocation = {
          ...location,
          ...reverseLocation,
          latitude,
          longitude,
        };
      } else {
        // Fallback: use IP location but override coordinates
        finalLocation = {
          ...location,
          latitude,
          longitude,
        };
      }
    }

    // Create visitor record
    const visitor = new Visitor({
      ip: ip ? ip.split(":").pop() : "unknown",
      userAgent,
      referrer: referrer || null,
      language: language || "unknown",
      page,
      country: finalLocation.country,
      region: finalLocation.region,
      city: finalLocation.city,
      latitude: finalLocation.latitude,
      longitude: finalLocation.longitude,
      // Explicitly set isBot to false for valid visitors
      isBot: false,
    });

    await visitor.save();
    return { success: true, visitor };
  }

  /**
   * Get total unique visitors
   */
  static async getVisitorCount() {
    return await Visitor.countDocuments({ isBot: false });
  }

  /**
   * Get today's visitors
   */
  static async getTodayVisitorCount() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await Visitor.countDocuments({
      isBot: false,
      timestamp: { $gte: today },
    });
  }

  /**
   * Get recent visitors
   */
  static async getRecentVisitors(limit = 10) {
    return await Visitor.find({ isBot: false })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select("ip country page timestamp");
  }
}

module.exports = VisitorService;
