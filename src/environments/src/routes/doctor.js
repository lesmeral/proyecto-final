const express = require("express")
const bcrypt = require("bcryptjs")
const Doctor = require("../models/doctor.js")

const router = express.Router()

//crear usuario
router.post('/create', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const doctor = new Doctor({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        const result = await doctor.save()

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error creating Doctor" })
    }

})
// Obtener todos los usuarios
router.get("/doctorall", async (req, res) => {
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
        const result = await Doctor.findOne({username:username})
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

// Borrar un usuario en especifico
router.delete("/:username", async (req, res) => {
    const { username } = req.params
    try {
        const result = await Doctor.remove({username:username})
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
                .updateOne({ username:username }, { $set: { name, email, password: hashPassword } })
            res.status(200).json({ result })
        } else {
            const result = await Doctor
                .updateOne({ username:username }, { $set: { name, email } })
            res.status(200).json({ result })
        }
    } catch (error) {
        res.status(500).json({ message: "Error update Doctor" })
    }
})

module.exports = router