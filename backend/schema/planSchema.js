import mongoose from "mongoose";

export const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        softwareId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Software"
        },
        groupTypeId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "ClientGroupType"
        },
        price: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
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

export const Plan = mongoose.model("Plan", planSchema);
