import React, { useRef } from 'react'
import { useAppDispatch } from '../store';
import {changeInfo} from '../store/me';
import { useNavigate } from 'react-router-dom';

const Login: React.FC  = () => {
    const navigate = useNavigate();
    const eleRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const handleClick = () => {
        const username = eleRef.current?.value as string;
        console.log(username);
        dispatch(changeInfo(username));

        // 这种对类型检测不了
        // dispatch({
        //   type: 'myInfo/changeInfo',
        //   payload: username
        // });
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