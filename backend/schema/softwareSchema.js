import mongoose from "mongoose";

export const softwareSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        details: {
            type: String,
            trim: true
        },
        accessLink: {
            type: String,
            trim: true
        },
        avatarUrl: {
            type: String,
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

export const Software = mongoose.model("Software", softwareSchema);
