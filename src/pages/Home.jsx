import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

const Home = () => {

    const [tasks, setTasks] = useState([])

    const id = useLocation().search
        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/server/tasks${id}`)
                setTasks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])
    
  return (
    <div className="home__container">
        <h1>My Tasks.</h1>
        <div className="tasks__container">
            {tasks.map(task => (
                <div style={{textDecoration: (task.task_state === "done") ? 'line-through' : '' }} className="task__container" key={task.task_id}>
                    <Link className="home__link" to={`/write?edit=${task.task_id}`} state={task}>
                        <h2 className='task__title'>{task.task_name}</h2>
                    </Link>
                    <p className='task__description'>{task.task_description}</p>
                    <p className='task__date'>Created on: {moment(task.task_date).format("D MMM YYYY - HH:mm")}</p>
                    {(task.task_edit === null) ? (<p className='task__edit'></p>)
                                              : (<p className='task__edit'>Updated on: {moment(task.task_edit).format("D MMM YYYY - HH:mm")}</p>)}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home