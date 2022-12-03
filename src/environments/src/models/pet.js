const mongoose = require("mongoose")

const petSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  dateb:{
    type:Date,
    required:true
  },
  userOwner:{
    type:String,
    required:true
  }
}, { timestamps: true })

module.exports = mongoose.model('Pet', petSchema)