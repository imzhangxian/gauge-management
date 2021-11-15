import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [workorders, setWorkorders] = useState([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const wo_status_mapping = ['Open', 'Checking', 'Approving', 'Executing', 'Finished', 'Failed']

  useEffect(() => {
    (async () => {
      const authConfig = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }
      }
      try {
        let resp = await axios.get('/api/tasks/mine', authConfig)
        setTasks(resp.data)
        resp = await axios.get('/api/workorders/mine', authConfig)
        setWorkorders(resp.data)
      } catch (e) { console.log(e) }
    })()
  }, [])

  return (
    <div className='flex flex-col mx-auto'>
    <div className='block'>
      <div className='p-2 mx-auto'>
        <h3>Tasks</h3>
      </div>
      <ul>
        {tasks.map((task, i) => {
          return (
          <li key={i}>
            <div className={'p-2 grid grid-cols-2 md:grid-cols-4 hover:bg-blue-100 cursor-pointer ' 
              + (i % 2 ? 'bg-gray-100' : 'bg-gray-300')}
              onClick={() => {navigate('/taskdetails/' + task.id)}}>
              <div className='m-1 px-1 col-span-1'>{task.name}</div>
              <div className='m-1 px-1 col-span-2 hidden md:block'>{task.description}</div>
              <div className='m-1 px-1 col-span-1'>
                {task.completed ? 'Closed' : 'Open'}
              </div>
            </div>
          </li>)
        })}
      </ul>
    </div>
    {/** TODO to create a new component for work orders */}
    <div className='block mx-auto my-4'>
    </div>
    <div className='block'>
      <div className='p-2 mx-auto'>
        <h3>Work Orders</h3>
      </div>
      <ul>
        {workorders.map((wo, i) => {
          return (
          <li key={i}>
            <div className={'m-1 p-2 grid grid-cols-2 md:grid-cols-4 hover:bg-blue-100 cursor-pointer '
             + (i % 2 ? 'bg-gray-100' : 'bg-gray-300')}>
              <div className='m-1 px-1 col-span-1'>{wo.name}</div>
              <div className='m-1 px-1 col-span-2 hidden md:block'>{wo.description}</div>
              <div className='m-1 px-1 col-span-1'>
                {wo.state >= 0 ? 
                  wo_status_mapping[wo.state] : 
                  wo_status_mapping[wo.state + wo_status_mapping.length]}
              </div>
            </div>
          </li>)
        })}
      </ul>
    </div>
    </div>
  )
}

export default Tasks
