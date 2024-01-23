import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

function Landing(){
    // Hardcoded testuser to test different user permissions/roles
    let testuser={role: 'admin'}
    const navigate = useNavigate()

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
                    <div className="landingEmployeeButton">
                        <div className="landingButtonLogo">Employee Portal</div>
                        
                        <div className="landingSubmit" onClick={handleEmployeeSubmit}>Submit</div>
                    </div>
                {/* Conditional Rendering per roles */}
                {/* If user is Technician */}
                    {testuser.role === 'technician' && (
                    <div className="landingTechButton">
                        <div className="landingButtonLogo">Technician Portal</div>
                        <div className="landingSubmit" onClick={handleTechSubmit}>Submit</div>
                    </div>
                    )}
                {/* If user is Admin */}
                    {testuser.role === 'admin' && (
                    <div className="landingAdminButton">
                        <div className="landingButtonLogo">Administrator Portal</div>
                        <div className="landingSubmit" onClick={handleAdminSubmit}>Submit</div>
                    </div>
                    )}
                </div>
            </div>        
        </>
    )
}
export default Landing;