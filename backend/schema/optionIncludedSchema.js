import mongoose from "mongoose";

export const optionIncludedSchema = new mongoose.Schema(
    {
        planId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Plan"
        },
        optionsId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Option"
        },
        removedAt: {
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

export const OptionIncluded = mongoose.model("OptionIncluded", optionIncludedSchema);
