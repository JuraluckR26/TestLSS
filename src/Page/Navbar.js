// src/components/Navbar.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
const Navbar = () => {
  return (
    <nav className="main">
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
             Log out <DirectionsRunIcon/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
