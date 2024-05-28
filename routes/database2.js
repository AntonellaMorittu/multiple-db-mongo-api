const express = require("express")
const createDb2Model = require("../models/db2Model")
const router = express.Router()

module.exports = (db2Connection) => {
  const Db2Model = createDb2Model(db2Connection)

  // Define your routes
  router.get("/data", async (req, res) => {
    try {
      const data = await Db2Model.find()
      res.json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.post("/data", async (req, res) => {
    try {
      const newItem = new Db2Model(req.body)
      await newItem.save()
      res.status(201).json(newItem)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  return router
}
