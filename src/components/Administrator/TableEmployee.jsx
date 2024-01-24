import { useState } from 'react'
import EmployeeData from './EmployeeData'

const TableEmployee =({ employeeData, setEmployeeData }) => {

    const [ sortConfig, setSortConfig ] = useState(null);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        console.log(`${key} and ${direction} is clicked`);

        const sortedData = [...employeeData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setEmployeeData(sortedData);
    }

    return (
        <>
            <table className='table-employee'>
                <thead>
                    <tr>
                        <th id='employee-header' className='header' onClick={() => sortData('name')}>{`EMPLOYEE`}</th>
                        <th id='location-header' className='header' onClick={() => sortData('location')}>{`LOCATION`}</th>
                        <th id='role-header' className='header' onClick={() => sortData('role')}>{`ROLE`}</th>
                        <th id='skill-header' className='header' onClick={() => sortData('skillset')}>{`SKILLSET`}</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map((employee) => (
                        <EmployeeData 
                            key={employee.id}
                            name={employee.name}
                            location={employee.location}
                            role={employee.role}
                            skill={employee.skillset}
                            />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableEmployee