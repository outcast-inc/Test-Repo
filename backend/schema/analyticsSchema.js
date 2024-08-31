import mongoose from "mongoose";

export const analyticsSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            trim: true
        },
        source: {
            type: String,
            trim: true
        },
        count: {
            type: Number,
            required: true,
            default: 0
        },
        createdAt: {
            type: Date,
            required: true,
            default: new Date(),
        },
        ips: [{
            type: String,
        }]
    }
);

export const Analytics = mongoose.model('Analytics', analyticsSchema);