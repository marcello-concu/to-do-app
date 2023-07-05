import express from "express"
import tasksRoutes from "./Routes/tasks.js"
import cors from 'cors'
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('build'))

app.use("/server/tasks", tasksRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}!`)
})