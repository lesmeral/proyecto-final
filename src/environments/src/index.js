const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require("dotenv").config()
const userRoutes = require("./routes/user.js")
const doctorRoutes = require("./routes/doctor.js")
const petRoutes = require("./routes/pet.js")
const appointmentRoutes = require("./routes/appointment.js")


const app = express()
const port = process.env.PORT || 9000


//middlewares
app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/doctor', doctorRoutes)
app.use('/pet', petRoutes)
app.use('/appointment', appointmentRoutes)

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