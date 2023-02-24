import express from "express"
import { getTasks, getTask, addTask, deleteTask, updateTask } from "../controllers/tasks.js"

const router = express.Router()

router.get("/", getTasks)
router.get("/:task_id", getTask)
router.post("/", addTask)
router.delete("/:task_id", deleteTask)
router.put("/:task_id", updateTask)

export default router