import React, { useState } from 'react';
import './NightModeToggle.css';
import {useNightMode} from './NightModeContext.jsx';
import { Link, useLocation } from 'react-router-dom'

const NightModeToggle = () => {
  const { toggleNightMode } = useNightMode();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login'
  const isHomePage = location.pathname === '/landing'
  return (
    <div className="siteTopbar">
      <label className="toggle-label">
        <input type="checkbox" onChange={toggleNightMode} className="toggle-input" />
        <span className="toggle-slider"></span>
      </label>
      {!isLoginPage && (
      <>
        <label className="backButtonContainer">
          <div className="backButtonBG">
            <Link to="/login">
              <button className="backButton">Logout</button>
            </Link>
          </div>
        </label>
        {!isHomePage && (
          <label className="homeButtonContainer">
            <div className="homeButtonBG">
              <Link to="/landing">
                <button className="homeButton">Home</button>
              </Link>
            </div>
          </label>
      )}
      </>
      )}
    </div>
  );
};

export default NightModeToggle;
