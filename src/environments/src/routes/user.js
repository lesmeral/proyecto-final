const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user.js")

const router = express.Router()

//crear usuario
router.post('/create', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        const result = await user.save()

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error creating user" })
    }

})
// Obtener todos los usuarios
router.get("/userall", async (req, res) => {
    try {
        const result = await User.find()
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update user" })
    }
})

// Obtener un usuario en especifico
router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params
        const result = await User.findOne({username:username})
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update user" })
    }
})

// Borrar un usuario en especifico
router.delete("/:username", async (req, res) => {
    const { username } = req.params
    try {
        const result = await User.remove({username:username})
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update user" })
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
            const result = await User
                .updateOne({ username:username }, { $set: { name, email, password: hashPassword } })
            res.status(200).json({ result })
        } else {
            const result = await User
                .updateOne({ username:username }, { $set: { name, email} })
            res.status(200).json({ result })
        }
    } catch (error) {
        res.status(500).json({ message: "Error update user" })
    }
})

module.exports = router