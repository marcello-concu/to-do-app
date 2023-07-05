import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const WriteTask = () => {
    
  const navigate = useNavigate()

  const state = useLocation().state
  
  const [task_name, setTask_name] = useState(state?.task_name || "")
  const [task_description, setTask_description] = useState(state?.task_description || "")
  const [task_state, setTask_state] = useState(state?.task_state || "")
  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      state ? await axios.put(`/server/tasks/${state.task_id}`, {
        task_name, task_description, task_state, task_edit: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }) : await axios.post(`/server/tasks/`, {
        task_name, task_description, task_state: "todo", task_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/server/tasks/${state.task_id}`)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className='add__task'>
      {
        state ? (<h1>Update Task.</h1>)
              : (<h1>New Task.</h1>)
      }
      <div className="form__container">
          <input type="text" className='title__input' placeholder='Title' value={task_name} onChange={(e)=>setTask_name(e.target.value)} />
          <textarea rows="4" cols="50" className='desc__input' placeholder='Description' value={task_description} onChange={(e)=>setTask_description(e.target.value)} />
          <div className="status__container">
            <div className="status">
              <input type="radio" checked={task_state === "todo"} name="task_state" value="todo" id="todo" onChange={(e)=>setTask_state(e.target.value)}/>
              <label htmlFor="todo">To Do</label>
            </div>
            <div className="status">
              <input type="radio" checked={task_state === "done"} name="task_state" value="done" id="done" onChange={(e)=>setTask_state(e.target.value)}/>
              <label htmlFor="done">Done</label>
            </div>
          </div>
          { 
            state ? (<input type="submit" value="UPDATE" className="task__btn" onClick={handleSubmit} />)
                  : (<input type="submit" value="ADD" className="task__btn" onClick={handleSubmit} />) 
          }
      </div>
      <div className="btn__container">
        { state?.task_id && (<span className='write__link delete' onClick={handleDelete}>DELETE</span>) }
        <Link className='write__link' to={`/`}>BACK</Link>
      </div>
    </div>
  )
}

export default WriteTask
