import React from 'react'
import { Link } from 'react-router-dom';

const NavBarLink = () => {
  return (
    <ul className='navbar-nav ms-auto mb-2 mg-lg-0'>
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href='#!'>Home</a>
        </li>
        <li className='nav-item'>
            <Link to="/profile" className='nav-link active fw-semibold' href='#!'>Shop</Link>
        </li>
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href='#!'>About</a>
        </li>
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href='#!'></a>
        </li>
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href='#!'>Contact</a>
        </li>
    </ul>
  )
}

export default NavBarLink