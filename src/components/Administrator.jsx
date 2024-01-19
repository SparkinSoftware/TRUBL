import { useState } from 'react'
import { Link } from 'react-router-dom'

const Administrator =({}) => {
    return (
        <>
            <div className='administrator-container'>
                <div className='administrator-employees-view'>
                    <div className='administrator-title'>{`Administrator Portal`}</div>
                    <div className='administrator-employeesContainer'>
                        {/* FIXME: EmployeesView Component goes here */}
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default Administrator