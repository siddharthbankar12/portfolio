const express = require("express");
const router = express.Router();
const VisitorController = require("../controllers/VisitorController");

/**
 * @route POST /api/track-visit
 * @description Track a page visit
 * @body {ip, userAgent, referrer, language, page}
 */
router.post("/track-visit", VisitorController.trackVisit);

/**
 * @route GET /api/visitor-count
 * @description Get total unique visitors
 */
router.get("/visitor-count", VisitorController.getVisitorCount);

/**
 * @route GET /api/visitor-count/today
 * @description Get today's visitors
 */
router.get("/visitor-count/today", VisitorController.getTodayVisitorCount);

/**
 * @route GET /api/recent-visitors
 * @description Get recent visitors (default: 10)
 * @query {limit} - Number of visitors to return
 */
router.get("/recent-visitors", VisitorController.getRecentVisitors);

module.exports = router;
