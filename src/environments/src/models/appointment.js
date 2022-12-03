const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    idDoctor: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    namepet: {
        type: String,
        required: true
    },
    nameowner: {
        type: String,
        required: true
    },
    dateappointment: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)