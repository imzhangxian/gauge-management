import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function MeterDetails() {
  const [meter, setMeter] = useState({})
  const [readings, setReadings] = useState([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  let { meterid } = useParams()

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

  return (
    <div className='flex flex-col rounded-md bg-gray-50 mt-4 p-2 max-w-xl m-auto'>
    <div className='mb-6'><a className='p-2 rounded-md bg-blue-400 hover:bg-blue-300' href="#" onClick={() => {navigate('/')}}>&lt;&lt;Back</a></div>
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
    </div>
  )
}

export default MeterDetails