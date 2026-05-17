const VisitorService = require("../services/VisitorService");

class VisitorController {
  /**
   * Track a page visit
   */
  static async trackVisit(req, res) {
    try {
      const { userAgent, referrer, language, page } = req.body;

      // Get real IP from request headers (works behind proxies)
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

      // Validate required fields
      if (!userAgent || !page) {
        return res.status(400).json({
          error: "Missing required fields: userAgent, page",
        });
      }

      const result = await VisitorService.trackVisitor({
        ip,
        userAgent,
        referrer,
        language,
        page,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Track visit error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Get total visitor count
   */
  static async getVisitorCount(req, res) {
    try {
      const count = await VisitorService.getVisitorCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Get today's visitor count
   */
  static async getTodayVisitorCount(req, res) {
    try {
      const count = await VisitorService.getTodayVisitorCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Get recent visitors
   */
  static async getRecentVisitors(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const visitors = await VisitorService.getRecentVisitors(limit);
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = VisitorController;
