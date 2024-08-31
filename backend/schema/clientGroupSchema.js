import mongoose from "mongoose";

export const clientGroupSchema = new mongoose.Schema(
    {
        clientGroupId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "ClientGroupType"
        },
        invoiceDate: {
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

export const ClientGroup = mongoose.model("ClientGroup", clientGroupSchema);