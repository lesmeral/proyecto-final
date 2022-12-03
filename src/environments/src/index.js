const express = require('express')
const { default: mongoose } = require('mongoose')
require("dotenv").config()
const userRoutes = require("./routes/user.js")
const doctorRoutes = require("./routes/doctor.js")
const petRoutes = require("./routes/pet.js")

const app = express()
const port = process.env.PORT || 9000

//middlewares
app.use(express.json())
app.use('/user',userRoutes)
app.use('/doctor',doctorRoutes)
app.use('/pet',petRoutes)

//Routes
app.get('/', (req, res) => {
res.send("Welcome to Hospital API")
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error(error))


//mongodb connection
app.listen(port, () => console.log("Servidor funcionando en el puerto", port))