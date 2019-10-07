const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artSchema = new Schema({
  objectID: Number,
  department: String,
  medium: String,
  period: String,
  creditLine: String,
  title: String,
  primaryImage: String,
  culture: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Art", artSchema)