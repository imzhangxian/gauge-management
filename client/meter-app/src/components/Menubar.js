import { Tab } from '@headlessui/react'
import { AiFillSchedule, AiFillDashboard, AiFillPieChart, AiFillSetting } from 'react-icons/ai'
import Meters from './Meters'
import Tasks from './Tasks'
import Reports from './Reports'
import Setting from './Setting'

function Menubar() {
    return (
      <Tab.Group>
        <Tab.List className="flex justify-center mt-2 p-2 rounded-md shadow-lg bg-blue-50">
          <div className="flex justify-evenly w-1/2">
          <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
            {({ selected }) => selected ? 
              (<div><AiFillDashboard size={64} color='lavender' /><span>Meters</span></div>) : 
              (<div><AiFillDashboard size={64} color='royalblue' /><span>Meters</span></div>)}
  
          </Tab>
          <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
            {({ selected }) => selected ? 
              (<div><AiFillSchedule size={64} color='lavender' /><span>Tasks</span></div>) : 
              (<div><AiFillSchedule size={64} color='royalblue' /><span>Tasks</span></div>)}
          </Tab>
          <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
            {({ selected }) => selected ? 
              (<div><AiFillPieChart size={64} color='lavender' /><span>Reports</span></div>) : 
              (<div><AiFillPieChart size={64} color='royalblue' /><span>Reports</span></div>)}          
          </Tab>
          <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
          {({ selected }) => selected ? 
              (<div><AiFillSetting size={64} color='lavender' /><span>Setting</span></div>) : 
              (<div><AiFillSetting size={64} color='royalblue' /><span>Setting</span></div>)}    
          </Tab>
          </div>
        </Tab.List>
        <Tab.Panels className="p-2 mt-4 bg-gray-100 rounded-md">
          <Tab.Panel className="flex justify-center"><Meters /></Tab.Panel>
          <Tab.Panel className="flex justify-center"><Tasks /></Tab.Panel>
          <Tab.Panel className="flex justify-center"><Reports /></Tab.Panel>
          <Tab.Panel className="flex justify-center"><Setting /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    )
  }
  
  export default Menubar