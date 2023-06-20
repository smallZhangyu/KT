import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './style.css';

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about/bar');
  }

  return (
    <div>
        <h3>About Page</h3>
        <Link to="/">Home</Link> | 
        <NavLink to="/about/foo/123" className={({isActive}) => (isActive ? 'active': '')}>Foo 123</NavLink> | 
        <NavLink to="/about/foo/456" className={({isActive}) => (isActive ? 'active': '')}>Foo 456</NavLink> | 

        <button onClick={handleClick}>Bar</button>

        <Outlet />
    </div>
  )
}

export default About