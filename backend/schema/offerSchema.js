import mongoose from "mongoose";

export const offerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        endDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        description: {
            type: String,
            trim: true
        },
        discountAmount: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number,
            required: true
        },
        durationMonths: {
            type: Number,
            required: true,
        },
        durationEndDate: {
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

export const Offer = mongoose.model("Offer", offerSchema);
