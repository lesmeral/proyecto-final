const express = require("express")
const bcrypt = require("bcryptjs")
const Appointment = require("../models/appointment.js")
const Doctor = require("../models/doctor.js")
const User = require("../models/user.js")
const Pet = require("../models/pet.js")

const router = express.Router()

//crear cita
router.post('/create', async (req, res) => {
    try {
        const valid1 = await User.findOne({ username: req.body.userowner })
        const valid2 = await Pet.findOne({ name: req.body.namepet })
        const valid3 = await Doctor.findOne({ username: req.body.userdoctor })
        if (valid1) {
            if (valid2) {
                if (valid3) {
                    const appointment = new Appointment({
                        userdoctor: req.body.userdoctor,
                        namepet: req.body.namepet,
                        userowner: req.body.userowner,
                        dateapp: req.body.dateapp,
                        hourapp: req.body.hourapp
                    })
                    const result = await appointment.save()
                    res.status(200).json({ result })
                } else {
                    res.status(500).json({ message: "Error Doctor doesn't exist" })
                }
            } else {
                res.status(500).json({ message: "Error Pet doesn't exist" })
            }
        } else {
            res.status(500).json({ message: "Error User doesn't exist" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating Appointment" })
    }

})
// Obtener todos las citas
router.get("/appointmentall", async (req, res) => {
    try {
        const result = await Appointment.find()
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

// Obtener fecha especifica en especifico
router.get("/date/:date", async (req, res) => {
    try {
        const { date } = req.params
        const datec = new Date(date)
        const datev = datec.toISOString().substring(0, 10)
        console.log(datev)
        const result = await Appointment.find({ dateappointment: datev })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error get appointments" })
    }
})

router.get("/doctor/:userdoctor", async (req, res) => {
    try {
        const { userdoctor } = req.params
        const result = await Appointment.find({ userdoctor: userdoctor })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error get appointments" })
    }
})

router.get("/owner/:userowner", async (req, res) => {
    try {
        const { userowner } = req.params
        const result = await Appointment.find({ userowner: userowner })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error get appointments" })
    }
})

// Borrar un usuario en especifico
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const result = await Appointment.remove({ _id: id })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

// Actualizar información de un usuario
router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { userdoctor, dateapp, hourapp} = req.body
    const datec = new Date(dateapp)
    const datev = datec.toISOString()
    try {
        const result = await Appointment
            .updateOne({ _id: id }, { $set: { userdoctor, dateapp:datev, hourapp} })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Appointment" })
    }
})

module.exports = router