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
                        dateappointment: req.body.dateappointment
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
// Obtener todos los usuarios
router.get("/appointmentall", async (req, res) => {
    try {
        const result = await Doctor.find()
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

// Obtener un usuario en especifico
router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params
        const result = await Doctor.findOne({ username: username })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

// Borrar un usuario en especifico
router.delete("/:username", async (req, res) => {
    const { username } = req.params
    try {
        const result = await Doctor.remove({ username: username })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

// Actualizar información de un usuario
router.patch("/:username", async (req, res) => {
    const { username } = req.params
    const { name, email, password } = req.body
    try {
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const result = await Doctor
                .updateOne({ username: username }, { $set: { name, email, password: hashPassword } })
            res.status(200).json({ result })
        } else {
            const result = await Doctor
                .updateOne({ username: username }, { $set: { name, email } })
            res.status(200).json({ result })
        }
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

module.exports = router