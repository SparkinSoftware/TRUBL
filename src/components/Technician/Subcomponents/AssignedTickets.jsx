import { useState } from 'react'
import AssignedData from './AssignedData'
import { useSupabase } from '../../../SupabaseContext';
import '../../Nightmode/NightModeToggle.css';
import { useNightMode } from '../../Nightmode/NightModeContext.jsx';

const AssignedTickets = ({ assignedData, setAssignedData }) => {
    const [ sortConfig, setSortConfig ] = useState(null);
    const supabase = useSupabase();

    const { isNightMode } = useNightMode();

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        console.log(`${key} and ${direction} is clicked`);

        const sortedData = [...assignedData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setAssignedData(sortedData);
    }

    return (
        <>
            <table className='table-ticket'>
                <thead className='table-ticket'>
                    <tr className={'table-ticket-data' + (isNightMode ? '-nm' : '')}>
                        <th id='status-header' className='header' onClick={() => sortData('status')}>{'Status'}</th>
                        <th id='customer-header' className='header' onClick={() => sortData('customer')}>{'Customer'}</th>
                        <th id='location-header' className='header' onClick={() => sortData('location')}>{'Location'}</th>
                        <th id='remote-header' className='header' onClick={() => sortData('remote')}>{'Remote'}</th>
                        <th id='category-header' className='header' onClick={() => sortData('category')}>{'Category'}</th>
                        <th id='description-header' className='header' onClick={() => sortData('description')}>{'Description'}</th>
                        <th id='assign-header' className='header'>{'Update'}</th>
                    </tr>
                </thead>
                <tbody>
                    <AssignedData 
                        assignedData={assignedData}
                        setAssignedData={setAssignedData}
                         />
                </tbody>
            </table>
        </>
    )
}

export default AssignedTickets