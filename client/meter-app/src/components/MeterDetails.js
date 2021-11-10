import { useState, useEffect, useContext, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Transition, Dialog } from '@headlessui/react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function MeterDetails() {
  const [meter, setMeter] = useState({})
  const [readings, setReadings] = useState([])
  const [isReadingOpen, setIsReadingOpen] = useState(false)
  const [inputs, setInputs] = useState({})
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  let { meterid } = useParams()

  // load meter details on page initialize
  useEffect(() => {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    axios.get(`/api/watermeters/${meterid}`, authConfig)
    .then(res => {
      setMeter(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  // list readings once meter loaded
  useEffect(() => {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    axios.get(`/api/readings/${meterid}`, authConfig)
    .then(res => {
      setReadings(res.data)
    })
    .catch(e => console.log(e))
  }, [meter])

  function readMeter() {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    console.log('updating reading for ' + meter.id)
    axios.post('/api/readings', { meterid: meter.id, reading: inputs.reading }, authConfig)
    .then(res => {
      setReadings([{reading: res.data.reading, update_on: res.data.update_on}, ...readings])
    })
    .catch(e => console.log(e))
    setIsReadingOpen(false)
  }

  return (
    <div className='flex flex-col rounded-md bg-gray-50 mt-4 p-2 max-w-xl m-auto'>
    <div className='mb-6'><a className='p-2 rounded-md bg-blue-400 hover:bg-blue-300' 
      href="#" onClick={() => {navigate('/')}}>&lt;&lt;Back</a></div>
    <h3>Meter {meter.number}</h3>
    <div className='m-2'>
    <ul>
    {Object.keys(meter).map((key, i) => {
      let bgcolor = 'bg-gray-100'
      if (i % 2 == 0) {
        bgcolor = 'bg-gray-200'
      }
      return (
      <li key={i}>
        <div className={'grid grid-cols-3 md:grid-cols-6 p-2 ' + bgcolor}>
          <div className="col-span-1 md:col-span-2">{key}: </div>
          <div className="col-span-2 md:col-span-4 px-2">{meter[key]}</div>
        </div>
      </li>
      )
    })}
    </ul>
    </div>

    <h3>Readings</h3>
    <div className='m-2'>
    <ul>
    {readings.map((reading, i) => {
      let bgcolor = 'bg-gray-100'
      if (i % 2 == 0) {
        bgcolor = 'bg-gray-200'
      }
      return (
      <li key={i}>
        <div className={'grid grid-cols-3 md:grid-cols-6 p-2 ' + bgcolor}>
          <div className="col-span-1 md:col-span-2">{reading.reading}</div>
          <div className="col-span-2 md:col-span-4 px-2">{reading.update_on}</div>
        </div>
      </li>
      )
    })}
    </ul>
    </div>
    <div className='mb-6'>
      <a className='p-2 rounded-md bg-blue-400 hover:bg-blue-300' 
        href="#" onClick={() => {setIsReadingOpen(true)}}>
          Read
      </a>
    </div>
    <Transition appear show={isReadingOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {setIsReadingOpen(false)}} >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-sm mx-auto p-4">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
              Input new reading
            </Dialog.Title>
            <input className='border-2' 
              type='number' 
              placeholder='Input reading' 
              onChange={e => { inputs.reading = e.target.value }} />
            <div className='flex m-2 justify-evenly'>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200 "
                onClick={readMeter} >
                Read
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200"
                onClick={() => {setIsReadingOpen(false)}} >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
    </div>
  )
}

export default MeterDetails