import React, { useState } from 'react';
import './App.css';
import { withCancelTokenRequest } from './http/request';
import { queryQQUser } from './service/qq';
import { CommonRegs } from './utils/reg';

export interface IQQUser {
  name: string
  qlogo: string
  qq: string
}

const Profile = ({ isLoading, errorResMessage, qqUser }: { isLoading: boolean, errorResMessage: string, qqUser?: IQQUser }) => {
  return (
    <div className='profile'>
      {

        isLoading ? <div className='loading-mask'>Loading....</div> : ''
      }
      {
        errorResMessage ? <div className='error-mask'>{errorResMessage}</div> : ''
      }
      {
        qqUser &&
        <div className='box'>
          <img alt='' src={qqUser.qlogo} className='avatar' />
          <div className='message'>
            <div>
              {qqUser.name}
            </div>
            <div className='number'>{qqUser.qq}</div>
          </div>
        </div>
      }
    </div>
  )
}

function App() {

  const [qqUser, setQQUser] = useState<IQQUser>()

  const [warning, setWarning] = useState('')

  const [errorResMessage, setErrorResMessage] = useState('')

  const [isLoading, setLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setErrorResMessage('')

    const value = e.target.value

    const {
      run: getUser,
      cancel: cancelUser
    } = withCancelTokenRequest(queryQQUser)

    if (CommonRegs.isQqNumber(value)) {

      setWarning('')

      setLoading(true)

      getUser(value).then((res) => {

        setLoading(false)

        if (res && res.code === 1) {

          setQQUser(res)

        } else {
          setErrorResMessage(res.msg ? res.msg : '')
        }
      })
    } else {
      cancelUser();
      initQQUser()
      setWarning('请输入合法的QQ号(5-15位数字)')

    }

  }

  const initQQUser = () => {
    setQQUser(undefined)
    setLoading(false)
  }

  return (
    <div className="App">
      <div className='search'>
        <label htmlFor="qq">QQ </label>
        <input onChange={onChange} name='qq' autoFocus className={warning ? 'search-input-warning' : ''} />
      </div>
      <div className='warning'>{warning}</div>
      <Profile isLoading={isLoading} errorResMessage={errorResMessage} qqUser={qqUser} />
    </div>
  );
}

export default App;
