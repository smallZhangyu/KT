import React from 'react'
import { useSelector } from 'react-redux'
import type {RootState} from '../store';

const Me: React.FC  = () => {
  const username = useSelector((state: RootState) => state.myInfo.username);  
  const upperName = useSelector((state: RootState) => state.myInfo.upperName);  
  return (
    <div>
        <h1>Me page</h1>
        <p>My name is {username}, {upperName}</p>
    </div>
  )
}

export default Me