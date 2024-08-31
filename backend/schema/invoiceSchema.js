import mongoose from "mongoose";

export const invoiceSchema = new mongoose.Schema(
    {
        customerInvoiceData: {
            type: String,
            get: function(data) {
                try { 
                  return JSON.parse(data);
                } catch(error) { 
                  return data;
                }
            },
            set: function(data) {
                return JSON.stringify(data);
            }
        },
        subscriptionId: {
            type: mongoose.Schema.ObjectId,
            ref: "Subscription"
        },
        planHistoryId: {
            type: mongoose.Schema.ObjectId,
            ref: "PlanHistory"
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
        amount: {
            type: Number,
            default: 0
        },
        dueAt: {
            type: Date,
            required: true,
            default: new Date(),
        },
        paidAt: {
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

export const Invoice = mongoose.model("Invoice", invoiceSchema);
