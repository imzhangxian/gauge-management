import { useContext } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'

function Init(props) {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const authConfig = {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    }
  }

  let variables = {
    submitter: user.id, 
    checker: user.id,
    approver: user.id
  }

  function submitForm(approval, variables) {
    axios.post('/api/tasks/execute/' + props.task.id, 
        {approval: approval, variables: variables}, 
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
      <button className="mx-4 px-4 py-2 bg-blue-500 hover:bg-blue-200 rounded-md"
        onClick={() => {submitForm('approved', variables)}}>
          Approve
      </button>
      <button className="mx-4 px-4 py-2 bg-red-500 hover:bg-red-200 rounded-md"
        onClick={() => {submitForm('approved', variables)}}>
          Reject
      </button>
    </div>
    
  )
}

export default Init
