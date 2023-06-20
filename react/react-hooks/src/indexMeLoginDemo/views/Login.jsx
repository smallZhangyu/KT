import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import {changeInfo} from '../store/me';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const eleRef = useRef(null);
    const dispatch = useDispatch();
    const handleClick = () => {
        const username = eleRef.current.value;
        console.log(username);
        // dispatch(changeInfo(username));
        dispatch({
          type: 'myInfo/changeInfo',
          payload: username
        })
        setTimeout(() => {
          navigate('/user');
        }, 1000);
    }

  return (
    <div>
        <h1>Login page</h1>
        <input type='text' ref={eleRef} />
        <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login