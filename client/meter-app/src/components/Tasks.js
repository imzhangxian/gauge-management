import axios from 'axios'
import { useState, useEffect, useContext, Fragment } from 'react'
import { useNavigate } from 'react-router'
import { Dialog, Transition} from '@headlessui/react'
import { AuthContext } from '../context/AuthContext'
import taskform_mapping from './taskforms/TaskformMapping'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [workorders, setWorkorders] = useState([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const wo_status_mapping = ['Open', 'Checking', 'Approving', 'Executing', 'Finished', 'Failed']
  let wotypes = Object.keys(taskform_mapping)
  let inputs = { type: wotypes[0] }

  useEffect(() => {
    (async () => {
      const authConfig = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }
      }
      try {
        setLoading(true)
        let resp = await axios.get('/api/tasks/mine', authConfig)
        setTasks(resp.data)
        resp = await axios.get('/api/workorders/mine', authConfig)
        setWorkorders(resp.data)
        setLoading(false)
      } catch (e) { console.log(e) }
    })()
  }, [])

  function createWorkOrder(data) {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    axios.post('/api/workorders', 
      {type: data.type, name: data.name, description: data.description, initialstate: 0}, 
      authConfig)
      .then(resp => {
        let newwo = resp.data[0]
        let newtask = resp.data[1]
        setWorkorders([newwo, ...workorders])
        setTasks([newtask, ...tasks])
        setShowCreateDialog(false)
      })
      .catch(e => {
        console.log(e)
        window.alert('Create work order failed!')
      })
  }

  return (
    <>
    <div className='flex flex-col mx-auto'>
    <div className='block'>
      <div className='p-2 mx-auto'>
        <h3>Tasks</h3>
      </div>
      {loading ?   
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div> :
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
      }
    </div>
    {/** TODO? to create a new component for work orders */}
    <div className='block mx-auto my-4'>
    </div>
    <div className='block'>
      <div className='p-2 mx-auto'>
        <h3>Work Orders</h3>
      </div>
      <div className='p-2'>
      <button className="px-6 py-2 bg-blue-500 hover:bg-blue-200 rounded-md"
        onClick={() => {setShowCreateDialog(true)}} >
          Create Order
      </button>
      </div>
      {loading ? 
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div> :
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
      }
    </div>

    <Transition appear show={showCreateDialog} as={Fragment}>
      <Dialog 
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {setShowCreateDialog(false)}} >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-sm mx-auto p-4">
            <Dialog.Title as="h3" className="mb-2 text-lg leading-6 font-medium text-gray-900">
              Create Work Order
            </Dialog.Title>
            <div className='p-2 flex flex-col justify-start'>
            <select className='border-2 m-2 p-1' 
              defaultValue={inputs.type}
              onChange={e => { inputs.type = e.target.value }} >
                <option className='m-2' key={-1} value={''} disabled> --- select work order type ---</option>
                {wotypes.map((type, i) => {
                  return (
                    <option className='m-2' key={i} value={type}>{type}</option>
                  )
                })}
                <option className='m-2' key={-2} value={''} disabled></option>
            </select>
            <input className='border-2 m-2 p-1' 
              type='text' 
              placeholder='Name' 
              onChange={e => { inputs.name = e.target.value }} />
            <textarea className='border-2 m-2 p-1 resize' 
              type='text' 
              placeholder='Description' 
              onChange={e => { inputs.description = e.target.value }} />
            </div>
            <div className='flex mt-4 mb-2 justify-evenly'>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200 "
                onClick={() => createWorkOrder(inputs)} >
                Create
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200"
                onClick={() => {setShowCreateDialog(false)}} >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>

    </div>
    </>
  )
}

export default Tasks
