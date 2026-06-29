const express = require("express");
const router = express.Router();

const {
  getPriorityNotifications,
} = require("../services/notificationService");

const logger = require("../middleware/logger");

router.get("/priority", async (req, res) => {
  try {
    logger.info("priority endpoint called");

    const limit = Number(req.query.limit) || 10;

    const notifications = [
      {
        ID: "1",
        Type: "Placement",
        Message: "Microsoft Hiring",
        Timestamp: "2026-04-22 17:51:18",
      },
      {
        ID: "2",
        Type: "Result",
        Message: "Mid Sem",
        Timestamp: "2026-04-22 17:51:30",
      },
      {
        ID: "3",
        Type: "Event",
        Message: "Tech Fest",
        Timestamp: "2026-04-22 17:50:06",
      },
    ];

    const result = getPriorityNotifications(
      notifications,
      limit
    );

    res.status(200).json({
      count: result.length,
      notifications: result,
    });
  } catch (error) {
    logger.error("priority endpoint failed", {
      error: error.message,
    });

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;