import { useState } from 'react'

const TicketData =({ customer, location, remote, assignedTech, description }) => {
    const handleInputChange = (e) => {
        const { name } = e.target
        console.log(`${e.target.name} and ${e.target.value} inside inputChange function`)
    }
    
    return (
        <>
            <tr className='table-ticket-data'>
                <td className='customer'>{customer}</td>
                <td className='location'>{location}</td>
                <td className='remote'>{remote}
                    <select
                        name='remote'
                        value={remote === null ? 'Y/N' : remote}
                        onChange={handleInputChange}
                        required>

                        <option value={null}>{'Y/N'}</option>
                        <option value={true}>{'Y'}</option>
                        <option value={false}>{'N'}</option>
                    </select>
                
                </td>
                <td className='assignedTech'>{assignedTech}</td>
                <td className='description'>{description}</td>
                <td className='assign'>
                    <input type='button' value='Submit'></input>
                </td>
            </tr>
        </>
    )
}

export default TicketData