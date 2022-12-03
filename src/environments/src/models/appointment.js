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
    dateappointment: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)