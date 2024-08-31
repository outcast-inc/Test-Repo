import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    jobTitle: {
        type: String,
        trim: true,
    },
    timezone: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
        required: true,
    },
    avatarUrl: {
        type: String,
        trim: true,
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
});

export const User = mongoose.model('User', userSchema);
