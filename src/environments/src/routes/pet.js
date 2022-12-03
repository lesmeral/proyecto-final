const express = require("express")
const bcrypt = require("bcryptjs")
const Pet = require("../models/pet.js")
const User = require("../models/user.js")
const router = express.Router()

//crear usuario
router.post('/create', async (req, res) => {
    try {
        const valid = await User.findOne({ username: req.body.username })
        if (valid) {
            const pet = new Pet({
                name: req.body.name,
                dateb: req.body.dateb,
                userOwner: valid.username
            })
            const result = await pet.save()
            res.status(200).json({ result })
        } else {
            res.status(500).json({ message: "Error username no exist" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating pet" })
    }

})
// Obtener todos los usuarios
router.get("/petall", async (req, res) => {
    try {
        const result = await Pet.find()
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update pet" })
    }
})

// Obtener un usuario en especifico
router.get("/:name/:owner", async (req, res) => {
    try {
        const { name, owner } = req.params
        const result = await Pet.findOne({ name: name, userOwner: owner })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update pet" })
    }
})

// Obtener perros de un usuario en especifico
router.get("/:owner", async (req, res) => {
    try {
        const { owner } = req.params
        const result = await Pet.find({ userOwner: owner })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update pet" })
    }
})

// Borrar un usuario en especifico
router.delete("/:name/:owner", async (req, res) => {
    try {
        const { name, owner } = req.params
        const result = await Pet.remove({ name: name, userOwner: owner })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: "Error update pet" })
    }
})

// Actualizar información de un usuario
router.patch("/:name/:owner", async (req, res) => {
    const { name, owner } = req.params
    const nameU = req.body.name
    const dateb = req.body.dateb
    const userOwnerU= req.body.userOwner
    try {
        const result = await Pet
            .updateOne({ name: name, userOwner: owner }, { $set: { name: nameU, dateb: dateb, userOwner: userOwnerU } })
        res.status(200).json({ result })
    } catch (error) {
    res.status(500).json({ message: "Error update pet" })
}
})

module.exports = router