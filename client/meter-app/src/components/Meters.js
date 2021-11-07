import { Tab, Menu, Listbox } from '@headlessui/react'

function Meters() {
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-6 my-3">
        <button className="col-start-1 col-span-1 p-2 bg-blue-500 hover:bg-blue-200 rounded-md">Add Meter</button>
        <div className="relative col-start-3 col-span-1 md:col-start-5 md:col-span-2">
        <Listbox value={0} onChange={()=>{}}>
          <Listbox.Button className="relative w-full p-2 bg-yellow-400 hover:bg-yellow-200 rounded-md">{"Sort by ..."}</Listbox.Button>
          <Listbox.Options className="absolute w-full position p-2 mt-2 bg-yellow-300 rounded-md">
            <Listbox.Option
              key={0}
              value={"distance"}
              className="p-2 hover:bg-yellow-50 rounded-md"
            >
              Sort by Distance
            </Listbox.Option>
            <Listbox.Option
              key={1}
              value={"number"}
              className="p-2 hover:bg-yellow-50 rounded-md"
            >
              Sort by Number
            </Listbox.Option>
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
        {(() => {
          let table = []
          let classname = "grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-100 hover:bg-blue-50 my-1 shadow-md"
          for (let i = 0; i < 10; i++) {
            table.push (
            <li key={"meter" + i}>
              <div className={classname}>
                <div className="text-left p-2">WM020{i}</div>
                <div className="text-left p-2">Normal meter 0201{i}</div>
                <div className="text-left p-2 hidden md:block md:col-span-3">No.9 Wangfujin Street, Beijing</div>
                <div className="text-left p-2">2021-11-5</div>
              </div>
            </li>
            )}
            return table
          })()}
      </ul>
    </div>
  )
}

export default Meters
