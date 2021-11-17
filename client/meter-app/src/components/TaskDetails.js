import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { t } from 'i18next'
import { AuthContext } from '../context/AuthContext'
import TaskformRouter from './taskforms/TaskformRouter'

function TaskDetails() {
  const [task, setTask] = useState(null)
  const [taskform, setTaskform] = useState(null)
  const { user } = useContext(AuthContext)
  let { taskid } = useParams()
  const navigate = useNavigate()

  const authConfig = {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    }
  }

  useEffect(() => {
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

  function displayTaskProperty(task, key) {
    let value = task[key]
    let disp = ''
    console.log('displaying ' + key)
    switch (key) {
      case 'variables':
        if (value) {
          Object.keys(value).map(k => {
            disp += `${k} : ${value[k]}, `
          })
        }
        break
      case 'completed':
        disp = value ? 'Yes' : 'No'
        break
      default:
        disp = value
    }
    return disp
  }

  return (
    <div className='flex flex-col rounded-md bg-gray-50 mt-4 p-2 max-w-xl m-auto'>
    <div className='mb-6'><a className='p-2 rounded-md bg-blue-400 hover:bg-blue-300' 
      href="#" onClick={() => {navigate('/home/tasks')}}>{t('button.back')}</a></div>
    <div className='m-2'>
    <ul>
    { task ? Object.keys(task).map((key, i) => {
      return (
      <li key={i}>
        <div className={'grid grid-cols-3 md:grid-cols-6 p-2 ' 
          + (i % 2 ? 'bg-gray-100' : 'bg-gray-200')}>
          <div className="col-span-1 md:col-span-2">{key}: </div>
          <div className="col-span-2 md:col-span-4 px-2">{displayTaskProperty(task, key)}</div>
        </div>
      </li>
      )
    }) : <li></li>}
    </ul>
    </div>
    { task && taskform ? 
    <>
      <div className='mx-auto'>
        <taskform.default task={task}/>
      </div>
    </>
      : ''}
  </div>
  )
}

export default TaskDetails
