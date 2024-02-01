import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './landing.css';
import '../Nightmode/NightModeToggle.css';
import { useNightMode } from '../Nightmode/NightModeContext.jsx';


function Landing(){
    // Hardcoded testuser to test different user permissions/roles
    let testuser={role: 'admin'}
    const navigate = useNavigate()
    const { isNightMode } = useNightMode();
    const handleEmployeeSubmit = () => {
        console.log('Employee Submit clicked');
        navigate('/ticketCreate');
      };
    
      const handleTechSubmit = () => {
        console.log('Technician Submit clicked');
        navigate('/technician');
      };
    
      const handleAdminSubmit = () => {
        console.log('Admin Submit clicked');
        navigate('/administrator');
      };

    return(
        <>
            <div className="landingBody">
                <div className="landingContainer">
                    <div className="loginLogo">
                        <h1>TRUBL</h1>
                    </div>
                {/* Always show employee view */}
                    <div className={"landingEmployeeButton" + (isNightMode ? '-nm' : '')}>
                        <div className={"landingButtonLogo" + (isNightMode ? '-nm' : '')}>Employee Portal</div>
                        
                        <div className={"landingSubmit" + (isNightMode ? '-nm' : '')} onClick={handleEmployeeSubmit}>Submit</div>
                    </div>
                {/* Conditional Rendering per roles */}
                {/* If user is Technician */}
                    {testuser.role === 'technician' && (
                    <div className={"landingTechButton" + (isNightMode ? '-nm' : '')}>
                        <div className={"landingButtonLogo" + (isNightMode ? '-nm' : '')}>Technician Portal</div>
                        <div className={"landingSubmit" + (isNightMode ? '-nm' : '')} onClick={handleTechSubmit}>Submit</div>
                    </div>
                    )}
                {/* If user is Admin */}
                    {testuser.role === 'admin' && (
                    <div className={"landingAdminButton" + (isNightMode ? '-nm' : '')}>
                        <div className={"landingButtonLogo" + (isNightMode ? '-nm' : '')}>Administrator Portal</div>
                        <div className={"landingSubmit" + (isNightMode ? '-nm' : '')} onClick={handleAdminSubmit}>Submit</div>
                    </div>
                    )}
                </div>
            </div>
            <Link to='/technician'>Technician</Link>        
        </>
    )
}
export default Landing;