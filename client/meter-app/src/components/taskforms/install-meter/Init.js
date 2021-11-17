import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { t } from 'i18next'
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

  // const [variables, setVariables] = useState()
  const [checkerSearchKey, setCheckerSearchKey] = useState('')
  const [checkerCandidates, setCheckerCandidates] = useState([])
  const [checker, setChecker] = useState(null)
  const [approverSearchKey, setApproverSearchKey] = useState([])
  const [approverCandidates, setApproverCandidates] = useState([])
  const [approver, setApprover] = useState(null)
  const [error, setError] = useState('')

  // TODO input new meter information ( or derive from work order )

  function submitForm(approval) {
    if (! checker) {
      setError(t('task.err.missing_checker'))
      return
    } else if (! approver) {
      setError(t('task.err.missing_approver'))
      return
    }
    axios.post('/api/tasks/execute/' + props.task.id, 
        {approval: approval, variables: {
          submitter: user.id, 
          checker: checker.id,
          approver: approver.id
        }}, 
        authConfig)
      .then(
        resp => {
          navigate('/home/tasks')
        }
      ).catch(e => {
        if (e.response) {
          console.log(e.response.data)
          window.alert(e.response.data)
        }
      })
  }

  function searchUser(keyphrase, role) {
    function setupParticipant(data, role) {
      switch (role) {
        case 'checker':
          setCheckerCandidates(data)
          break
        case 'approver':
          setApproverCandidates(data)
          break
        default:
          break
      }
    }
    if (keyphrase.length < 3) {
      setupParticipant([], role)
    } else {
      let cancel
      let searchConfig = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }, 
        cancelToken: new axios.CancelToken(c => cancel = c)
      }
      axios.post(
        '/api/search/users', 
        {keyphrase: keyphrase},
        searchConfig)
      .then(resp => {
        setupParticipant(resp.data, role)
      })
      .catch(e => {
        if (e.response) {
          console.log(e.response.data)
          window.alert(e.response.data)
        }
      })
    }
  }

  return (
    <>
    {/** checker selector */}
    <div className='border-2 border-gray-500 rounded-sm'>
    <div className='relative m-2 p-2'>
      <div className='flex flex-row'>
        <input type='text' 
          className='p-1 m-1 border-2'
          value={checkerSearchKey}
          onChange={e => { 
            setCheckerSearchKey(e.target.value)
            searchUser(e.target.value, 'checker')
          }}
          placeholder={t('task.checker.placeholder')} />
        {checker ? <>
          <span className='m-1 p-1'>{checker.display}</span>
          <button className='m-1 px-3 bg-red-600 rounded-sm text-gray-50' 
            onClick={() => setChecker(null)}>-</button>
          </>
          : <></>}
      </div>
      {checkerCandidates.length ?
      <div className='absolute border-2 p-2 bg-gray-100 z-10'>
        <ul>
        {checkerCandidates.map((u, i) => {
          return (
            <li key={i}>
              <button className='hover:bg-blue-200' 
                onClick={() => {
                  setChecker(u)
                  setCheckerCandidates([])
                  setCheckerSearchKey('')
                  }}>
                {u.display}
              </button>
            </li>
          )
        })}
        </ul>
      </div>
      : <></>}
    </div>
    {/** approver selector */}
    <div className='relative m-2 p-2'>
      <div className='flex flex-row'>
        <input type='text' 
          className='p-1 m-1 border-2'
          value={approverSearchKey}
          onChange={e => { 
            setApproverSearchKey(e.target.value)
            searchUser(e.target.value, 'approver')
          }}
          placeholder={t('task.approver.placeholder')} />
        {approver ? <>
          <span className='m-1 p-1'>{approver.display}</span>
          <button className='m-1 px-3 bg-red-600 rounded-sm text-gray-50' 
            onClick={() => setApprover(null)}>-</button>
          </>
          : <></>}
      </div>
      {approverCandidates.length ?
      <div className='absolute border-2 p-2 bg-gray-100 z-10'>
        <ul>
        {approverCandidates.map((u, i) => {
          return (
            <li key={i}>
              <button className='hover:bg-blue-200' 
                onClick={() => {
                  setApprover(u)
                  setApproverCandidates([])
                  setApproverSearchKey('')
                  }}>
                {u.display}
              </button>
            </li>
          )
        })}
        </ul>
      </div>
      : <></>}
    </div>
    </div>
    {error ? <span className='text-red-500 text-lg font-bold'>{error}</span> : <></>}
    <div className='p-4'>
      <button className="mx-4 px-4 py-2 bg-blue-500 hover:bg-blue-200 rounded-md"
        onClick={() => {submitForm('approved')}}>
          {t('taskform.button.submit')}
      </button>
      <button className="mx-4 px-4 py-2 bg-red-500 hover:bg-red-200 rounded-md"
        onClick={() => {submitForm('rejected')}}>
          {t('taskform.button.reject')}
      </button>
    </div>
    </>
  )
}

export default Init
