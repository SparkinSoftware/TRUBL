import React, {useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './landing.css';
import '../Nightmode/NightModeToggle.css';
import { useNightMode } from '../Nightmode/NightModeContext.jsx';
import { useSupabase } from '../../SupabaseContext';


function Landing(){
    const [currentUser, setCurrentUser] = useState('Guest')
    const [role, setRole] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const supabase = useSupabase();
    const { isNightMode } = useNightMode();
    
    supabase.auth.getUser().then(user => {
        setCurrentUser(user.data.user.id)
    })

    useEffect(() => {
        const fetchUserRole = async () => {
            if (currentUser !== 'Guest') {
                const { data, error } = await supabase
                    .from('employee')
                    .select('role')
                    .eq('id', currentUser)
                    .single();
    
                if (error) {
                    console.error('Error fetching role:', error);
                } else if (data) {
                    setRole(data.role);
                }
            }
        };
    
        fetchUserRole();
    }, [currentUser, supabase]);
    
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

      useEffect(() => {
        let timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
      })

      if (isLoading) {
        return <div className={'loading' + (isNightMode ? '-nm' : '')}>Loading...</div>;
    }

    if (role == null) {
        return <div className={'loading' + (isNightMode ? '-nm' : '')}>Please Log In</div>;
    }

    return(
        <>
            <div className="landingBody">
                <div className="landingContainer">
                    <div className="loginLogo">
                        <h1>TRUBL</h1>
                    </div>
                {/* Always show employee view */}
                {(role == '1' || role == '2' || role =='3') && (
                    <div className={"landingEmployeeButton" + (isNightMode ? '-nm' : '')}>
                        <div className={"landingButtonLogo" + (isNightMode ? '-nm' : '')}>Employee Portal</div>
                        
                        <div className={"landingSubmit" + (isNightMode ? '-nm' : '')} onClick={handleEmployeeSubmit}>Enter</div>
                    </div>
                )}
                {/* Conditional Rendering per roles */}
                {/* If user is Technician */}
                    {role == '2' && (
                    <div className={"landingTechButton" + (isNightMode ? '-nm' : '')}>
                        <div className={"landingButtonLogo" + (isNightMode ? '-nm' : '')}>Technician Portal</div>
                        <div className={"landingSubmit" + (isNightMode ? '-nm' : '')} onClick={handleTechSubmit}>Enter</div>
                    </div>
                    )}
                {/* If user is Admin */}
                    {role == '3' && (
                    <div className={"landingAdminButton" + (isNightMode ? '-nm' : '')}>
                        <div className={"landingButtonLogo" + (isNightMode ? '-nm' : '')}>Administrator Portal</div>
                        <div className={"landingSubmit" + (isNightMode ? '-nm' : '')} onClick={handleAdminSubmit}>Enter</div>
                    </div>
                    )}
                </div>
            </div>   
        </>
    )
}
export default Landing;