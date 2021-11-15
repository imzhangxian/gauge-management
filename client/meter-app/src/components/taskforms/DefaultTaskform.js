import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function DefaultTaskform(props) {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const authConfig = {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    }
  }

  function submitForm(approval) {
    axios.post('/api/tasks/execute/' + props.task.id, 
        {approval: approval}, 
        authConfig)
      .then(
        resp => {
          navigate('/')
        }
      ).catch(e => {
        if (e.response) {
          console.log(e.response.data)
          window.alert(e.response.data)
        }
      })
  }

  return (
    <div>
      <button className="mx-4 p-2 bg-blue-500 hover:bg-blue-200 rounded-md"
        onClick={() => {submitForm('approved')}}>
          Approve
      </button>
      <button className="mx-4 p-2 bg-red-500 hover:bg-red-200 rounded-md"
        onClick={() => {submitForm('approved')}}>
          Reject
      </button>
    </div>
    
  )
}

export default DefaultTaskform
