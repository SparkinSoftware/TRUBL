import { useState } from 'react'
//import './administrator.css'

const EmployeeData =({ name, location, role, skill }) => {
    return (
        <>
            <tr>
                <td className='name'>{name}</td>
                <td className='location'>{location}</td>
                {role === 1 ? 
                    <td>{'Employee'}</td> :
                    (role === 2 ?
                    <td>{'Technician'}</td> :
                    <td>{'Administrator'}</td>)}
                <td className='skill'>{skill}</td>
            </tr>
        </>
    )
}

export default EmployeeData