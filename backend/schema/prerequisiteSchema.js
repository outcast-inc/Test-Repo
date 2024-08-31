import mongoose from "mongoose";

export const prerequisiteSchema = new mongoose.Schema(
    {
        offerId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Offer"
        },
        planId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Plan"
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

export const Prerequisite = mongoose.model("Prerequisite", prerequisiteSchema);