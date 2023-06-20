import React from 'react'
import { useSelector } from 'react-redux'

const Me = () => {
  const username = useSelector((state) => state.myInfo.username);  
  const upperName = useSelector((state) => state.myInfo.upperName);  
  return (
    <div>
        <h1>Me page</h1>
        <p>My name is {username}, {upperName}</p>
    </div>
  )
}

export default Me