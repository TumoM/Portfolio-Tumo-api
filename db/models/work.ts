

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        maxLength: 128,
        minLength: 1 
        },
    company: { 
        type: String, 
        required: true, 
        maxLength: 64,
        minLength: 1
        },
    companyWebsite: { 
        type: String, 
        required: true, 
        maxLength: 128,
        minLength: 1
        },
    location: { 
        type: String, 
        required: true ,
        minLength: 1
        },
    jobTitle: { 
        type: String, 
        required: true ,
        minLength: 1
        },
    description: {
        type: String, 
        required: true,
        minLength: 1 
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
        required:true,
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

module.exports = mongoose.model('Work', workSchema);