import React, { useState } from 'react';
import './NightModeToggle.css';
import {useNightMode} from './NightModeContext.jsx';

const NightModeToggle = () => {
  const { toggleNightMode } = useNightMode();

  return (
    <div>
      <label className="toggle-label">
        <input type="checkbox" onChange={toggleNightMode} className="toggle-input" />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export default NightModeToggle;