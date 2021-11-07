import { Menu } from '@headlessui/react'

function Navbar() {
    return (
      <header className="flex flex-row justify-center bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm shadow-lg">
        <Menu as="div" className="relative">
          <Menu.Button><img className="w-12 h-12 my-2 mx-4 rounded-full shadow-md border-2" 
            src="./avatars/my_avatar_1.png" alt="avatar" href="#"></img>
          </Menu.Button>
          <Menu.Items className="absolute rounded-lg border-2 drop-shadow-lg bg-indigo-50">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button className={`${active && 'bg-blue-500 rounded-lg text-gray-50'} px-4 py-1`} href="/account-settings" >
                  <span>Profile</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button className={`${active && 'bg-blue-500 rounded-lg text-gray-50'} px-4 py-1`} href="/logout" >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
          </Menu.Items>
        </Menu>
        <div className="flex flex-grow content-center">
           <input className="text-sm rounded-md ml-auto mr-10 my-auto py-2 pl-10 pr-3 w-3/4" type="search" id="search" placeholder="Search"></input>
        </div>
      </header>
    )
  }
  
  export default Navbar