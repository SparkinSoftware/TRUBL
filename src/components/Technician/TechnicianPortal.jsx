import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './technician.css'
import TableTickets from './TableTickets'
import AssignedTickets from './AssignedTickets'
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
        console.log(`The employee location is ${employeeLocation}`);
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
    }, []);

    // Fetch unassigned ticket data
    useEffect(() => {
        const fetchAssignedData = async () => {
            const { data, error } = await supabase
            .from('taskissue')
            .select('*');

            if (error) {
                console.error('Error fetching ticket data:', error.message);
            } else {
                const filteredData = data.filter(ticket => ticket.location === 'Austin');
                setAssignedData(filteredData);
            }
        };
        fetchAssignedData();
        console.log(assignedData);
    }, []);

    //console.log(assignedData);

    // Filter ticket data for assigned tickets
    //const assignedTicketData = ticketData.filter(ticket => ticket.location === 'Austin');

    return (
        <>
            <div className='technician-container'>
                <div className={'technician-unassignedTickets' + (isNightMode ? '-nm' : '')}>
                    <div className='technician-title'>{`Unassigned Tickets`}</div>
                    <div className={'technician-ticketContainer' + (isNightMode ? '-nm' : '')}>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                        <TableTickets 
                            ticketData={ticketData}
                            setTicketData={setTicketData} />
                    </div>
                </div>
                <div className={'technician-assignedTickets' + (isNightMode ? '-nm' : '')}>
                    <div className='technician-title'>{`Assigned Tickets`}</div>
                    <div className={'technician-ticketContainer' + (isNightMode ? '-nm' : '')}>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                        {/* <TableTickets /> */}
                        <AssignedTickets
                            assignedData={assignedData}
                            setAssignedData={setAssignedData} />
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default TechnicianPortal