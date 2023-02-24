import { db } from "../db.js"

// GET ALL TASKS
export const getTasks = (req,res) => {
    const q = req.query.task_state ? "SELECT * FROM tbl_tasks WHERE task_state=?" : "SELECT * FROM tbl_tasks"

    db.query(q, [req.query.task_state], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

// GET A SINGLE TASK
export const getTask = (req,res) => {
    const q = "SELECT * FROM tbl_tasks WHERE task_id=?"

    db.query(q, [req.params.task_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}

//  ADD A NEW TASK
export const addTask = (req,res) => {
    const q = "INSERT INTO tbl_tasks(`task_name`, `task_description`, `task_date`, `task_state`) VALUES (?)"

    const values = [
        req.body.task_name,
        req.body.task_description,
        req.body.task_date,
        req.body.task_state
    ]
    
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json("Task has been created!")
    })

}

// DELETE A TASK
export const deleteTask = (req,res) => {
  const q = "DELETE FROM tbl_tasks WHERE `task_id` = ?"
  
  db.query(q, [req.params.task_id], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.json("Task has been delete!")
  })
      
}

// UPDATE A TASK
export const updateTask = (req,res) => {
    
    const taskId = req.params.task_id

    const q = "UPDATE tbl_tasks SET `task_name`=?, `task_description`=?, `task_state`=?, `task_edit`=? WHERE `task_id`=?"
   
    const values = [
        req.body.task_name,
        req.body.task_description,
        req.body.task_state,
        req.body.task_edit
    ]

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json("Task has been updated!")
    })
      
}