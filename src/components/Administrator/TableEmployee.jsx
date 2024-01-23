import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeData from './EmployeeData'

const TableEmployee =({}) => {
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
                <EmployeeData />
            </table>
        </>
    )
}

export default TableEmployee