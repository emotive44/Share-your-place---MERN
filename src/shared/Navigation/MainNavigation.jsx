import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import BackDrop from '../UIElements/BackDrop'
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLink';
import './MainNavigation.css';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { userId, isLoggedIn } = useContext(AuthContext);
  
  const openDrawer = () => {
    setDrawerIsOpen(true);
  }

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  return (
    <Fragment>
      {/* This is for responsive hamburger button */}
      {drawerIsOpen && <BackDrop onClick={closeDrawer} />}
      <SideDrawer show={drawerIsOpen} hide={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
      </SideDrawer>
      {/* end */}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span /> 
          <span /> 
          <span /> 
        </button>
        <h1 className="main-navigation__title">
          {isLoggedIn ? <Link to={`/${userId}/places`}>Your Places</Link> : <Link to="/">All Users</Link>}
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );  
}

export default MainNavigation;
