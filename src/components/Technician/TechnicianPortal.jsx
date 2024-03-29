import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './technician.css'
import UnassignedTickets from './Subcomponents/UnassignedTickets'
import AssignedTickets from './Subcomponents/AssignedTickets'
import { useSupabase } from '../../SupabaseContext'
import '../Nightmode/NightModeToggle.css';
import { useNightMode } from '../Nightmode/NightModeContext.jsx';

const TechnicianPortal =({}) => {
    const supabase = useSupabase();
    const { isNightMode } = useNightMode();
    const [ ticketData, setTicketData ] = useState([]);
    const [ assignedData, setAssignedData ] = useState([]);
    const [ currentUser, setCurrentUser ] = useState('Guest');
    const [ userId, setUserId ] = useState(null);
    const [ employeeLocation, setEmployeeLocation ] = useState(null);
    const [ submitRefresh, setSubmitRefresh ] = useState(0)

    useEffect(() => {
        supabase.auth.getUser().then(user => {
            setCurrentUser(user.data.user.user_metadata.display_name);
            setUserId(user.data.user.id);
            // Fetch employee location
            supabase
                .from('employee')
                .select('location')
                .eq('id', user.data.user.id)
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching employee location:', error.message);
                    } else {
                        setEmployeeLocation(data.location);
                    }
                });
        });
    }, [supabase]);

    // Fetch unassigned ticket data
    useEffect(() => {
        const fetchTicketData = async () => {
            const { data, error } = await supabase
            .from('taskissue')
            .select('*');

            if (error) {
                console.error('Error fetching ticket data:', error.message);
            } else {
                setTicketData(data);
            }
        };
        fetchTicketData();
    }, [submitRefresh]);

    // Fetch unassigned ticket data
    useEffect(() => {
        const fetchAssignedData = async () => {
            // Ensure employeeLocation is available
            if (employeeLocation) {
                console.log(`The employee location is ${employeeLocation}`);
                const { data, error } = await supabase
                    .from('taskissue')
                    .select('*');

                if (error) {
                    console.error('Error fetching ticket data:', error.message);
                } else {
                    const filteredData = data.filter(ticket => ticket.location === employeeLocation);
                    setAssignedData(filteredData);
                }

            }
            
        };
        fetchAssignedData();
    }, [employeeLocation, submitRefresh]);

    const refreshUpdate = () => setSubmitRefresh(prev => prev + 1);

    return (
        <>
            <div className='technician-container'>
                <div className={'technician-unassignedTickets' + (isNightMode ? '-nm' : '')}>
                    <div className='technician-title'>{`Unassigned Tickets`}</div>
                    <div className={'technician-ticketContainer' + (isNightMode ? '-nm' : '')}>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                        <UnassignedTickets
                            ticketData={ticketData}
                            setTicketData={setTicketData}
                            submitRefresh={submitRefresh} />
                    </div>
                </div>
                <div className={'technician-assignedTickets' + (isNightMode ? '-nm' : '')}>
                    <div className='technician-title'>{`Assigned Tickets`}</div>
                    <div className={'technician-ticketContainer' + (isNightMode ? '-nm' : '')}>
                        {/* FIXME: Tickets Component goes here (filtered by location matching the current user)*/}
                        <AssignedTickets
                            assignedData={assignedData}
                            setAssignedData={setAssignedData}
                            refreshUpdate={refreshUpdate} />
                    </div>
                </div>
            </div>
            {/* <Link to='/'>Back Home</Link> */}
        </>
    )
}

export default TechnicianPortal