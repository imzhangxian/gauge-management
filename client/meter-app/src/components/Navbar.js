import { Menu } from '@headlessui/react'
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const signout = e => {
    setUser(null)
    sessionStorage.removeItem('user')
    navigate('/signin')
  }
  return (
    <header className="flex flex-row justify-center bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm shadow-lg">
      <Menu as="div" className="relative">
        <Menu.Button>
          <img className="w-12 h-12 my-2 mx-4 rounded-full shadow-md ring-2 ring-gray-300 ring-offset-2" 
            src={"/avatars/" + (user ? user.name.trim() + ".png" : "not_signed_in.png") } 
            onError={(e)=>{e.target.onerror=null; e.target.src="/avatars/default.png"}}
            alt="avatar" href="#" />
        </Menu.Button>
        {user ? 
        <Menu.Items className="absolute rounded-lg border-2 drop-shadow-lg bg-indigo-50">
        <div className="p-1 flex flex-col w-max">
          {/*<Menu.Item>
            {({ active }) => (
              <button className={`${active && 'bg-blue-500 rounded-lg text-gray-50'} px-4 py-1 text-left`} 
                href="/account-settings" >
                <span>Profile</span>
              </button>
            )}
          </Menu.Item>*/}
          <Menu.Item>
            {({ active }) => (
              <button className={`${active && 'bg-blue-500 rounded-lg text-gray-50'} px-4 py-1 text-left`} 
                onClick={signout} >
                Sign out {user.name}
              </button>
            )}
          </Menu.Item>
        </div>
        </Menu.Items>
          : 
        <></> }
      </Menu>

      <div className="flex flex-grow content-center">
      { /*
          <input className="text-sm rounded-md ml-auto mr-10 my-auto py-2 pl-10 pr-3 w-3/4" 
            type="search" id="search" placeholder="Search"></input>
       */}
      </div>
    </header>
  )
}
  
export default Navbar