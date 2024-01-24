import { useState } from 'react'
import { Link } from 'react-router-dom'
//import './administrator.css'

const EmployeeData =({ name, location, role, skill }) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{location}</td>
                {role === 1 ? 
                    <td>{'Employee'}</td> :
                    (role === 2 ?
                    <td>{'Technician'}</td> :
                    <td>{'Administrator'}</td>)}
                <td>{skill}</td>
            </tr>
        </>
    )
}

export default EmployeeData