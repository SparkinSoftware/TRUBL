import { useState } from 'react'
import UnassignedData from './UnassignedData'
import '../../Nightmode/NightModeToggle.css';
import { useNightMode } from '../../Nightmode/NightModeContext.jsx';

const UnassignedTickets = ({ ticketData, setTicketData, refreshUpdate }) => {
    const [ sortConfig, setSortConfig ] = useState(null);
    const { isNightMode } = useNightMode();
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
            <table className={'table-ticket'}>
                <thead className={'table-ticket'}>
                    <tr className={'table-ticket-data' + (isNightMode ? '-nm' : '')}>
                        <th id='customer-header' className='header' style={{width: '8%'}} onClick={() => sortData('customer')}>{'Customer'}</th>
                        <th id='location-header' className='header' onClick={() => sortData('location')}>{'Location'}</th>
                        <th id='remote-header' className='header' onClick={() => sortData('remote')}>{'Remote'}</th>
                        <th id='category-header' className='header' onClick={() => sortData('category')}>{'Category'}</th>
                        <th id='description-header' className='header' onClick={() => sortData('description')}>{'Description'}</th>
                        <th id='assign-header' className='header'>{'Assign'}</th>
                    </tr>
                </thead>
                <tbody>
                    <UnassignedData 
                        ticketData={ticketData}
                        setTicketData={setTicketData}
                        refreshUpdate={refreshUpdate} />
                </tbody>
            </table>
        </>
    )
}

export default UnassignedTickets