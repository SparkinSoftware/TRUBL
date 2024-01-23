import { useState } from 'react'
import { Link } from 'react-router-dom'

const Technician =({}) => {
    return (
        <>
            <div className='technician-container'>
                <div className='technician-unassignedTickets'>
                    <div className='technician-title'>{`Unassigned Tickets`}</div>
                    <div className='technician-ticketContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                    </div>
                </div>
                <div className='technician-assignedTickets'>
                    <div className='technician-title'>{`Assigned Tickets`}</div>
                    <div className='technician-ticketContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default Technician