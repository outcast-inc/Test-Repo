import mongoose from "mongoose";

export const subscriptionSchema = new mongoose.Schema(
    {
        clientGroupId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "ClientGroup"
        },
        trialPeriodStartDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        trialPeriodEndDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        subscribeAfterTrial: {
            type: Boolean,
            required: true,
            default: false
        },
        currentPlanId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Plan"
        },
        offerId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Offer"
        },
        offerStartDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        offerEndDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        dateSubscribed: {
            type: Date,
            required: true,
            default: new Date(),
        },
        validTo: {
            type: Date,
            required: true,
            default: new Date(),
        },
        dateUnsubscribed: {
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

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
