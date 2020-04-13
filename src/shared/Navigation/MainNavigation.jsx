import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import BackDrop from '../UIElements/BackDrop'
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLink';
import './MainNavigation.css';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  
  const openDrawer = () => {
    setDrawerIsOpen(true);
  }

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  return (
    <Fragment>
      {drawerIsOpen && <BackDrop onClick={closeDrawer} />}
      {drawerIsOpen
        ? <SideDrawer>
            <nav className="main-navigation__drawer-nav">
              <NavLinks />
            </nav>
          </SideDrawer>
        : null
      }
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span /> 
          <span /> 
          <span /> 
        </button>
        <h1 className="main-navigation__title">
          <Link to='/'>Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );  
}

export default MainNavigation;
