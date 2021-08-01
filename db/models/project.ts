

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    caption: String,
    url: String
})

const projectSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        maxLength: 128,
        minLength: 1 
        },
    thumbnail: {
        type: String, 
        required: false,
        default: "https://via.placeholder.com/500x500",
        },
    description: {
        type: String, 
        required: true,
        minLength: 1 
        },
    projectLink: { 
        type: String, 
        required: false, 
        default: null,
        minLength: 1
        },
    images: { 
        type: [imagesSchema], 
        required: false, 
        default: []
        },
    startDate: {
        type: Date, 
        required: true
        },
    endDate: {
        type: Date 
    },
    userId: {
        type: String, 
        required:false,
    },
    disableEndDate: {
        type: Boolean, 
        default:false
    },
    createdAt: {
        type: Date, 
        default: Date.now 
        }
    }, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema);