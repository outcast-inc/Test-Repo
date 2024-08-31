import mongoose from "mongoose";

export const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
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
        images: [{ type: String }],
        slug: {
            type: String,
            trim: true,
            default: "",
        },
        publish: {
            type: Boolean,
            required: true,
            default: false,
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
            ref: 'User'
        }
    }
);

export const Course = mongoose.model("Course", courseSchema);
