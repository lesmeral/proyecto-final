const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    userdoctor: {
        type: String,
        required: true
    },
    namepet: {
        type: String,
        required: true
    },
    userowner: {
        type: String,
        required: true
    },
    dateapp: {
        type: Date,
        required: true
    },
    hourapp:{
        type:String,
        required: true,
        unique:true
    }
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)