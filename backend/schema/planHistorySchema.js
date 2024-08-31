import mongoose from "mongoose";

export const planHistorySchema = new mongoose.Schema(
    {
        subscriptionId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Subscription"
        },
        planId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Plan"
        },
        dateStart: {
            type: Date,
            required: true,
            default: new Date(),
        },
        dateEnd: {
            type: Date,
            required: true,
            default: new Date(),
        },
        createdAt: {
            type: Date,
            required: true,
            default: new Date(),
        },
        updatedAt: {
            type: Date,
            required: true,
            default: new Date(),
        },
        createdById: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        updatedById: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        }
    }
);

export const PlanHistory = mongoose.model("PlanHistory", planHistorySchema);
