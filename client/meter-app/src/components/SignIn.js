import axios from 'axios';
import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'


function SignIn() {
  const { user, setUser } = useContext(AuthContext)
  const [inputs] = useState({})
  const [failed, setFailed] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    axios.post('/login', { username: inputs.username, password: inputs.password })
      .then(res => {
        let data = res.data
        if (data.success) {
          console.log("login successful - " + data.user.username)
          let user = {
            id: data.user.id,
            name: data.user.username,
            role: data.user.roles,
            org: data.user.org, 
            token: data.token
          }
          setUser(user)
          sessionStorage.setItem('user', JSON.stringify(user))
          navigate('/')
        } else {
          console.log("Login failed.")
          setUser(null)
          sessionStorage.removeItem('user')
          setFailed(true)
        }
      },
        error => {
          console.log("login failed - " + error)
          setUser(null)
          sessionStorage.removeItem('user')
          setFailed(true)
      })
      .catch(e => console.log(e))
  }
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username" type="text" placeholder="Username"
          onChange={e => { inputs.username = e.target.value }}>
        </input>
      </div>
      <div className="mb-6">
        <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password" type="password" placeholder="Password"
          onChange={e => { inputs.password = e.target.value }}>
        </input>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-600 hover:bg-blue-400 text-gray-100 py-2 px-4 rounded" type="button"
          onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  )
}

export default SignIn
