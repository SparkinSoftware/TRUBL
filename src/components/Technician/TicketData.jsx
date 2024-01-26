import { useState } from 'react'

const TicketData =({ ticketData, setTicketData }) => {

    const handleInputChange = (e, ticketID) => {
        const { name, value } = e.target;
        console.log(`${e.target.name} and ${e.target.value} inside inputChange function`)
        const updatedTickets = ticketData.map(ticket => {
            if (ticket.id === ticketID) {
                return { ...ticket, [name]: value === 'true'};
            }
            return ticket;
        });
        setTicketData(updatedTickets);
    }
    
    return (
        <>
            {ticketData.map((ticket) => (                
                <tr id={ticket.id} className='table-ticket-data'>
                    <td className='customer'>{ticket.customer}</td>
                    <td className='location'>{ticket.location}</td>
                    <td className='remote'>
                        <select
                            name='remote'
                            value={ticket.remote === null ? '' : ticket.remote}
                            onChange={(e) => handleInputChange(e, ticket.id)}
                            required
                        >
                            <option value={null}>{''}</option>
                            <option value={true}>{'Y'}</option>
                            <option value={false}>{'N'}</option>
                        </select>
                    </td>
                    <td className='assignedTech'>{ticket.assigned_tech}</td>
                    <td className='description'>{ticket.description}</td>
                    <td className='assign'>
                        <input type='button' value='Submit'></input>
                    </td>
                </tr>))}
        </>
    )
}

export default TicketData