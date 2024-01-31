import { useState } from 'react'
//import './administrator.css'

const EmployeeData =({ name, location, role, skill }) => {
    return (
        <>
            <tr>
                <td className='name'>{name}</td>
                {location !== null ? 
                    <td className='location'>{location}</td> : 
                    <td className='location'>not specified</td>
                }
                {role === 1 ? 
                    <td>{'Employee'}</td> :
                    (role === 2 ?
                    <td>{'Technician'}</td> :
                    <td>{'Administrator'}</td>)}
                {skill !== null ?
                    <td className='skill'>{skill}</td> : 
                    <td className='skill'>no skills</td>
                }
            </tr>
        </>
    )
}

export default EmployeeData


// const TicketData =({ ticketData, setTicketData }) => {

//     const supabase = useSupabase();
//     const [ employees, setEmployees ] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const { data: employeeData, error: employeeError } = await supabase
//                     .from('employee')
//                     .select('*');
//                 if (employeeError) throw employeeError;

//                 const { data: taskIssueData, error: taskIssueError } = await supabase
//                     .from('taskissue')
//                     .select('*');
//                 if (taskIssueError) throw taskIssueError;

//                 setEmployees(employeeData);
//                 const combineData = taskIssueData.map(issue => ({
//                     ...issue,
//                     customerName: employeeData.find(emp => emp.id === issue.customer)?.name || 'Unknown'
//                 }));

//                 setTicketData(combineData);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//             }
//         };

//         fetchData();
//     }, [supabase]);

//     const handleInputChange = (e, ticketID) => {
//         const { name, value } = e.target;
//         console.log(`${e.target.name} and ${e.target.value} inside inputChange function`)
//         const updatedTickets = ticketData.map(ticket => {
//             if (ticket.id === ticketID) {
//                 return { ...ticket, [name]: value === 'true'};
//             }
//             return ticket;
//         });
//         setTicketData(updatedTickets);
//     }

//     const handleCategoryChange = (e, ticketID) => {
//         const { name, value } = e.target;
//         const updatedTickets = ticketData.map(ticket => {
//             if (ticket.id === ticketID) {
//                 return { ...ticket, [name]: value };
//             }
//             return ticket;
//         });
//         setTicketData(updatedTickets);
//     }

//     const handleSubmit = async (ticketID) => {
//         const ticketToUpdate = ticketData.find(ticket => ticket.id === ticketID);
//         if (ticketToUpdate) {
//             try {
//                 const { error } = await supabase
//                     .from('taskissue')
//                     .update({
//                         category: ticketToUpdate.category,
//                         remote: ticketToUpdate.remote,
//                     })
//                     .eq('id', ticketID);

//                 if (error) throw error;

//                 console.log('Update successful for ticket ID:', ticketID);
//             } catch (error) {
//                 console.error('Error updating ticket:', error.message);
//             }
//         }
//     };
    
//     return (
//         <>
//             {ticketData.map((ticket) => ( 
//                 <React.Fragment key={ticket.id}>
//                     <tr id={ticket.id} className='table-ticket-data'>
//                         <td className='customer'>{ticket.customerName}</td>
//                         <td className='location'>{ticket.location}</td>
//                         <td className='remote'>
//                             <select
//                                 name='remote'
//                                 value={ticket.remote === null ? '' : ticket.remote}
//                                 onChange={(e) => handleInputChange(e, ticket.id)}
//                                 required
//                             >
//                                 <option value={''}>{''}</option>
//                                 <option value={true}>{'Y'}</option>
//                                 <option value={false}>{'N'}</option>
//                             </select>
//                         </td>
//                         <td className='category'>
//                             <select
//                                 name='category'
//                                 value={ticket.category === null ? '' : ticket.category}
//                                 onChange={(e) => handleCategoryChange(e, ticket.id)}
//                                 required
//                             >
//                                 <option value={''}>{''}</option>
//                                 <option value={'Hardware'}>{'Hardware'}</option>
//                                 <option value={'Software'}>{'Software'}</option>
//                                 <option value={'Security'}>{'Security'}</option>
//                                 <option value={'Miscellaneous'}>{'Miscellaneous'}</option>
//                             </select>
//                         </td>
//                         <td className='description'>{ticket.description}</td>
//                         <td className='assign'>
//                             <input type='button' value='Submit' onClick={() => handleSubmit(ticket.id)}></input>
//                         </td>
//                     </tr>
//                 </React.Fragment>               
//                 ))}
//         </>
//     )
// }

// export default TicketData