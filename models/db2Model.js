import mongoose from "mongoose"

const db2Schema = new mongoose.Schema({
  year_film: Number,
  year_award: Number,
  ceremony: Number,
  category: String,
  nominee: String,
  film: String,
  win: Boolean,
})

module.exports = (connection) => connection.model("Db2Model", db2Schema)
