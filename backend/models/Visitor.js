const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    referrer: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: "unknown",
    },
    page: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Unknown",
    },
    region: {
      type: String,
      default: "Unknown",
    },
    city: {
      type: String,
      default: "Unknown",
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    isBot: {
      type: Boolean,
      default: false,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for efficient queries
visitorSchema.index({ isBot: 1, timestamp: 1 });
visitorSchema.index({ page: 1, timestamp: 1 });

module.exports = mongoose.model("Visitor", visitorSchema);
