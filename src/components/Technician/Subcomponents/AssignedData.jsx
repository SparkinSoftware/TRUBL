import React, { useState, useEffect } from 'react'
import { useSupabase } from '../../../SupabaseContext';
import '../../Nightmode/NightModeToggle.css';
import { useNightMode } from '../../Nightmode/NightModeContext.jsx';
import Chat from '../../Chat/Chat.jsx';

const AssignedData =({ assignedData, setAssignedData, refreshUpdate }) => {
    const { isNightMode } = useNightMode();
    const supabase = useSupabase();
    const [ employees, setEmployees ] = useState([]);
    const [ expandedTicket, setExpandedTicket ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: employeeData, error: employeeError } = await supabase
                    .from('employee')
                    .select('*');
                if (employeeError) throw employeeError;

                const { data: taskIssueData, error: taskIssueError } = await supabase
                    .from('taskissue')
                    .select('*');
                if (taskIssueError) throw taskIssueError;

                setEmployees(employeeData);
                const combineData = taskIssueData.map(issue => ({
                    ...issue,
                    customerName: employeeData.find(emp => emp.id === issue.customer)?.name || 'Unknown'
                }));

                setAssignedData(combineData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [supabase]);

    const handleInputChange = (e, ticketID) => {
        const { name, value } = e.target;
        console.log(`${e.target.name} and ${e.target.value} inside inputChange function`)
        const updatedTickets = assignedData.map(ticket => {
            if (ticket.id === ticketID) {
                return { ...ticket, [name]: value === 'true'};
            }
            return ticket;
        });
        setAssignedData(updatedTickets);
    }

    const handleCategoryChange = (e, ticketID) => {
        const { name, value } = e.target;
        const updatedTickets = assignedData.map(ticket => {
            if (ticket.id === ticketID) {
                return { ...ticket, [name]: value };
            }
            return ticket;
        });
    }

    const handleSubmit = async (ticketID) => {
        const ticketToUpdate = assignedData.find(ticket => ticket.id === ticketID);
        if (ticketToUpdate) {
            try {
                const { error } = await supabase
                    .from('taskissue')
                    .update({
                        status: ticketToUpdate.status,
                        category: ticketToUpdate.category,
                        remote: ticketToUpdate.remote,
                    })
                    .eq('id', ticketID);

                if (error) throw error;

                console.log('Update successful for ticket ID:', ticketID);
            } catch (error) {
                console.error('Error updating ticket:', error.message);
            }
        }
        refreshUpdate();
    };

    const handleTicketClick = (ticketId) => {
        setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
    };
    
    return (
        <>
            {assignedData.filter(ticket => ticket.status === 'Open' && ticket.location === 'Austin').map((ticket) => (
                <React.Fragment key={ticket.id}>
                    <tr id={ticket.id} 
                        className={'table-ticket-data' + (isNightMode ? '-nm' : '')}
                        onClick={() => handleTicketClick(ticket.id)}>
                        <td className='status'>
                            <select
                                name='status'
                                value={ticket.status === null ? 'Pending' : ticket.status}
                                onChange={(e) => handleCategoryChange(e, ticket.id)}
                                required
                            >
                                <option value={'Pending'}>{'Pending'}</option>
                                <option value={'Open'}>{'Open'}</option>
                                <option value={'Closed'}>{'Closed'}</option>
                            </select>
                        </td>
                        <td className='customer'>{ticket.customerName}</td>
                        <td className='location'>{ticket.location}</td>
                        <td className='remote'>
                            <select
                                name='remote'
                                value={ticket.remote === null ? '' : ticket.remote}
                                onChange={(e) => handleInputChange(e, ticket.id)}
                                required
                            >
                                <option value={''}>{''}</option>
                                <option value={true}>{'Y'}</option>
                                <option value={false}>{'N'}</option>
                            </select>
                        </td>
                        <td className='category'>
                            <select
                                name='category'
                                value={ticket.category === null ? '' : ticket.category}
                                onChange={(e) => handleCategoryChange(e, ticket.id)}
                                required
                            >
                                <option value={''}>{''}</option>
                                <option value={'Hardware'}>{'Hardware'}</option>
                                <option value={'Software'}>{'Software'}</option>
                                <option value={'Security'}>{'Security'}</option>
                                <option value={'Miscellaneous'}>{'Miscellaneous'}</option>
                            </select>
                        </td>
                        <td className='description'>{ticket.description}</td>
                        <td className='assign'>
                            <input type='button' value='Submit' onClick={() => handleSubmit(ticket.id)}></input>
                        </td>
                    </tr>
                    {expandedTicket === ticket.id && (
                        <tr id={ticket.id} className='expandedRowContainer'>
                            <td colSpan='6'>
                                <div className={"fullDescription" + (isNightMode ? '-nm' : '')}>&nbsp;<span className="ticketDescClose" onClick={() => setTicketClick(null)}>X</span>  &nbsp;<span className="ticketDownArrow">↳</span>&nbsp; {ticket.description}</div>
                            </td>
                            <Chat ticketId={ticket.id} />
                        </tr>
                    )}
                </React.Fragment>             
                ))}
        </>
    )
}

export default AssignedData