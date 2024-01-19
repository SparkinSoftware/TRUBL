import { Link } from 'react-router-dom'

const Technician =() => {
    return (
        <>
            <div className='technicianContainer'>
                <div className='unassignedTickets'>{`Unassigned Tickets`}
                    <div className='ticketContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                    </div>
                </div>
                <div className='assignedTickets'>{`Assigned Tickets`}
                    <div className='ticketContainer'>
                        {/* FIXME: Tickets Component goes here (filtered)*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Technician