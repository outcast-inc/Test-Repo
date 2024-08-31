import mongoose from "mongoose";

export const clientGroupTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        minMembers: {
            type: Number,
            required: true
        },
        maxMembers: {
            type: Number,
            required: true
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

export const ClientGroupType = mongoose.model("ClientGroupType", clientGroupTypeSchema);
