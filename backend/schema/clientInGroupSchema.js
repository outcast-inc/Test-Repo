import mongoose from "mongoose";

export const clientInGroupSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "ClientGroup"
        },
        accountId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "ClientUser"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        timeAdded: {
            type: Date,
            required: true,
            default: new Date(),
        },
        timeRemoved: {
            type: Date,
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

export const ClientInGroup = mongoose.model("ClientInGroup", clientInGroupSchema);
