const express = require("express")
const createDb1Model = require("../models/db1Model")
const router = express.Router()

module.exports = (db1Connection) => {
  const Db1Model = createDb1Model(db1Connection)

  // Define your routes
  router.get("/data", async (req, res) => {
    try {
      const data = await Db1Model.find()
      res.json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.post("/data", async (req, res) => {
    try {
      const newItem = new Db1Model(req.body)
      await newItem.save()
      res.status(201).json(newItem)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  return router
}
