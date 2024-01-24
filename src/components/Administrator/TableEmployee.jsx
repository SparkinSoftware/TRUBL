import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeData from './EmployeeData'

const TableEmployee =({ employeeData }) => {
    return (
        <>
            <table className='table-employee'>
                <thead>
                    <tr>
                        <th>{`EMPLOYEE`}</th>
                        <th>{`LOCATION`}</th>
                        <th>{`ROLE`}</th>
                        <th>{`SKILLSET`}</th>
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