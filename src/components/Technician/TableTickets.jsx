import { useState } from 'react'
import TicketData from './TicketData'

const TableTickets = ({ ticketData, setTicketData }) => {
    const [ sortConfig, setSortConfig ] = useState(null);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        console.log(`${key} and ${direction} is clicked`);

        const sortedData = [...ticketData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setTicketData(sortedData);
    }

    return (
        <>
            <table className='table-ticket'>
                <thead className='table-ticket'>
                    <tr>
                        <th id='customer-header' className='header' onClick={() => sortData('customer')}>{'Customer'}</th>
                        <th id='location-header' className='header' onClick={() => sortData('location')}>{'Location'}</th>
                        <th id='remote-header' className='header' onClick={() => sortData('remote')}>{'Remote'}</th>
                        <th id='assigned-tech-header' className='header' onClick={() => sortData('assigned_tech')}>{'Technician'}</th>
                        <th id='description-header' className='header' onClick={() => sortData('description')}>{'Description'}</th>
                        <th id='assign-header' className='header'>{'Assign'}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {ticketData.map((ticket) => (
                        <TicketData 
                            key={ticket.id}
                            customer={ticket.customer}
                            location={ticket.location}
                            remote={ticket.remote}
                            assignedTech={ticket.assigned_tech}
                            description={ticket.description} />
                    ))} */}
                    <TicketData 
                        ticketData={ticketData}
                        setTicketData={setTicketData} />
                </tbody>
            </table>
        </>
    )
}

export default TableTickets