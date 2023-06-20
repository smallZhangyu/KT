import React from 'react'
import { useLocation, matchRoutes, Navigate } from 'react-router-dom'
import { routes } from '../router';

const BeforeEach = (props) => {
    const location = useLocation();
    console.log('before each')
    const match =  matchRoutes(routes, location);

    const meta = match[match.length - 1].route.meta;

    if(meta.auth) {
        return <Navigate to="/login" />
    }

  return (
    <div>{props.children}</div>
  )
}

export default BeforeEach