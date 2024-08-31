import mongoose from "mongoose";

export const optionsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
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


export const Option = mongoose.model("Option", optionsSchema);
