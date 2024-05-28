import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import expressListEndpoints from "express-list-endpoints"
import dotenv from "dotenv"
import db1Data from "./data/books.json"
import db2Data from "./data/golden-globes.json"
import database1Routes from "./routes/database1.js"
import database2Routes from "./routes/database2.js"
import createDb1Model from "./models/db1Model.js"
import createDb2Model from "./models/db2Model.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

// MongoDB connection URIs
const db1Uri = "mongodb://localhost:27017/database1"
const db2Uri = "mongodb://localhost:27017/database2"

// Create connections
const db1Connection = mongoose.createConnection(db1Uri)
const db2Connection = mongoose.createConnection(db2Uri)

// Function to initialize data
const initializeData = async () => {
  const Db1Model = createDb1Model(db1Connection)
  const Db2Model = createDb2Model(db2Connection)

  // Check if data already exists to avoid duplication
  const db1Count = await Db1Model.countDocuments()
  const db2Count = await Db2Model.countDocuments()

  if (db1Count === 0) {
    await Db1Model.insertMany(db1Data)
  }

  if (db2Count === 0) {
    await Db2Model.insertMany(db2Data)
  }
}

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})

// Initialize data and start the server
initializeData()
  .then(() => {
    // Use the routes defined in the route modules
    app.use("/db1", database1Routes(db1Connection))
    app.use("/db2", database2Routes(db2Connection))

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error("Failed to initialize data:", err)
  })
