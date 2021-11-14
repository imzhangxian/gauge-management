import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import TaskformRouter from './taskforms/TaskformRouter'

function TaskDetails() {
  const [task, setTask] = useState(null)
  const [taskform, setTaskform] = useState(null)
  const { user } = useContext(AuthContext)
  let { taskid } = useParams()

  useEffect(() => {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    axios.get(`/api/tasks/withorder/${taskid}`, authConfig)
    .then(res => {
      setTask(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    if (task) {
      TaskformRouter(task.ordertype, task.step).then(
        taskform => {
          setTaskform(taskform)
        }
      )
    }
  }, [task])

  return (
    <>
    <div>Tasks</div>
    {task && taskform ? 
    <>
      <ul>
        <li>{task.name}</li>
        <li>{task.description}</li>
      </ul>
      <div>
        <taskform.default />
      </div>
      </>
        : ''}
    </>
  )
}

export default TaskDetails
