import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div>
        App Page
        <div>
            <Link to="/">Home</Link> |
            <Link to="/about">About</Link>
        </div>
        <Outlet />
    </div>
  )
}
