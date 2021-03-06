import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import './NavLink.css';

const NavLinks = props => {
  const value = useContext(AuthContext);
  return (
    <ul className="nav-links"> 
      <li>
        <NavLink to='/' exact>All Users</NavLink>
      </li>
      {value.isLoggedIn && (
        <li>
          <NavLink to={`/${value.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {value.isLoggedIn && (
        <li>
          <NavLink to='/places/new'>ADD Place</NavLink>
        </li>
      )}
      {!value.isLoggedIn && (
        <li>
          <NavLink to='/auth'>Authenticate</NavLink>
        </li>
      )}
      {value.isLoggedIn && (
        <li>
          <Link to='/'>
            <button onClick={value.logout} className="logout">Logout</button>
          </Link>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
