import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarLink = () => {
    return (
        <>
            <li className='nav-item'>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link fw-semibold'} style={{ color: 'white' }}
                    end
                >
                    Home
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink
                    to="/products" style={{ color: 'white' }}
                    className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link fw-semibold'}
                >
                    Products
                </NavLink>
            </li>

            {/* Add more navigation links here, without Login/Register */}
        </>
    );
};

export default NavBarLink;
