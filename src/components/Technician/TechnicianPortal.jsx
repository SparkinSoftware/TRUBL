import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './technician.css'
import TableTickets from './TableTickets'
import { useSupabase } from '../../SupabaseContext'

const TechnicianPortal =({}) => {
    const supabase = useSupabase();
    const [ ticketData, setTicketData ] = useState([]);

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

    console.log(ticketData);

    return (
        <>
            <div className='technician-container'>
                <div className='technician-unassignedTickets'>
                    <div className='technician-title'>{`Unassigned Tickets`}</div>
                    <div className='technician-ticketContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                        <TableTickets 
                            ticketData={ticketData}
                            setTicketData={setTicketData}/>
                    </div>
                </div>
                <div className='technician-assignedTickets'>
                    <div className='technician-title'>{`Assigned Tickets`}</div>
                    <div className='technician-ticketContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                        {/* <TableTickets /> */}
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default TechnicianPortal