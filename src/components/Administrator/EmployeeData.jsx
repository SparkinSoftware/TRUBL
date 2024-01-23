import { useState } from 'react'
import { Link } from 'react-router-dom'
//import './administrator.css'

const EmployeeData =({}) => {
    return (
        <>
            <tbody>
                <tr>
                    <td>{`JOHN DOE`}</td>
                    <td>{`LAS VEGAS, NV`}</td>
                    <td>{`EMPLOYEE`}</td>
                    <td>{``}</td>
                </tr>
                <tr>
                    <td>{`JANE DOE`}</td>
                    <td>{`DALLAS, TX`}</td>
                    <td>{`TECHNICIAN`}</td>
                    <td>{`IT`}</td>
                </tr>
            </tbody>
        </>
    )
}

export default EmployeeData