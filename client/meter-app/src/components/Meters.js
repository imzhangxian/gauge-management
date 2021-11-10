import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { Listbox } from '@headlessui/react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function Meters() {
  const sortCriteria = {
    "number": "Sort By Number",
    "distance": "Sort By Distance"
  }
  const [sortBy, setSortBy] = useState('...')
  const [meters, setMeters] = useState([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const fetchMeters = () => {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    axios.get('/api/watermeters', authConfig)
    .then(res => {
      setMeters(res.data)
    })
    .catch(e => console.log(e))
  }

  // useEffect initialize
  useEffect(fetchMeters, [])

  // TODO useEffect sort by

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-6 my-3">
        <button className="col-start-1 col-span-1 p-2 bg-blue-500 hover:bg-blue-200 rounded-md hidden md:block">
          Add Meter
        </button>
        <div className="relative col-start-3 col-span-1 md:col-start-5 md:col-span-2">
        <Listbox value={0} onChange={setSortBy}>
          <Listbox.Button className="relative w-full p-2 bg-yellow-400 hover:bg-yellow-200 rounded-md">{"Sort by " + sortBy}</Listbox.Button>
          <Listbox.Options className="absolute w-full position p-2 mt-2 bg-yellow-300 rounded-md">
            {Object.keys(sortCriteria).map((k, i) => {
              return (
              <Listbox.Option
                key={i}
                value={k}
                className="p-2 hover:bg-yellow-50 rounded-md cursor-pointer"
              > {sortCriteria[k]}
              </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Listbox>
        </div>
      </div>
      <ul>
        <li>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-300 rounded-t-md">
            <div className="text-left p-2 hover:bg-gray-200 rounded-tl-md">Number</div>
            <div className="text-left p-2 hover:bg-gray-200">Name</div>
            <div className="text-left p-2 hover:bg-gray-200 hidden md:block md:col-span-3">Adderss</div>
            <div className="text-left p-2 hover:bg-gray-200 rounded-tr-md">Updated</div>
          </div>
        </li>
        {meters.map((meter) => {
          return (
          <li key={meter.id}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-100 hover:bg-blue-50 cursor-pointer my-1 shadow-md"
              onClick={() => {navigate('/meterdetails/' + meter.id)}}>
              <div className="text-left p-2">{meter.name}</div>
              <div className="text-left p-2">{meter.number}</div>
              <div className="text-left p-2 hidden md:block md:col-span-3">{'N.A.'}</div>
              <div className="text-left p-2">{meter.update_on}</div>
            </div>
          </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Meters
