import { useState } from 'react'
import { Link } from 'react-router-dom'

const Administrator =({}) => {
    return (
        <>
            <div className='administrator-container'>
                <div className='administrator-employees'>
                    <div className='administrator-title'>{`Administrator Portal`}</div>
                    <div className='administrator-employeesContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default Administrator