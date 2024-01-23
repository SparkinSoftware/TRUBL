// import React, { useState, useEffect  } from "react";
// import { Link } from "react-router-dom";
// import { useSupabase } from '../../SupabaseContext';
// import './ticket.css';

// const TicketCreation = () => {
//     const supabase = useSupabase();
//     const [submittedTicket, setSubmittedTicket] = useState({
//         ticketCategory: "",
//         ticketLocation: "",
//         descriptionOfIssue: ""
//     })
    
//     const [showForm, setShowForm] = useState(false)
//     const [pendingTickets, setPendingTickets] = useState([])

//     const handleNewIssueClick = () => { setShowForm(true); }
//     const handleCloseForm = () => { setShowForm(false); }

//     useEffect(() => {
//         const fetchTickets = async () => {
//             const { data, error } = await supabase
//                 .from('taskissue')
//                 .select('*');

//             if (error) {
//                 console.error('Error fetching tickets:', error.message);
//             } else {
//                 setPendingTickets(data);
//                 console.log(pendingTickets);
//             }
//         };

//         fetchTickets();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(supabase.auth.getUser())
    
//         setPendingTickets([...pendingTickets, submittedTicket]);
    
//         const { data, error } = await supabase
//             .from('taskissue')
//             .insert([
//                 {
//                     location: submittedTicket.ticketLocation,
//                     description: submittedTicket.descriptionOfIssue,
//                     status: 'Pending',
//                     category: submittedTicket.ticketCategory,
//                 }
//             ]);
    
//         if (error) {
//             console.error('Error inserting data:', error.message);
//         } else {
//             console.log('Data inserted:', data);
//         }
    
//         setSubmittedTicket({
//             category: "",
//             location: "",
//             description: ""
//         });
    
//         setShowForm(false);
//     };

//     const handleInputChange = (e) => {
//         const {name, value} = e.target
//         setSubmittedTicket({
//             ...submittedTicket,
//             [name]: value
//         })
//     }


//     const handleDeleteTicket = (index) => {
//         // Remove the ticket at the specified index from pending tickets
//         const updatedTickets = [...pendingTickets];
//         updatedTickets.splice(index, 1);
//         setPendingTickets(updatedTickets);

//         // Add logic to delete the ticket from the database if needed
//         // Example: Call an API endpoint to delete the ticket from the database
//         // deleteTicketFromDatabase(pendingTickets[index].id);
//     }

//     return (
//         <div className="ticketPageContainer">
//             <div className="ticketStatusContainer">
//                 <h1>Outstanding Ticket Status</h1>
//                 {/* Tickets area */}
//                 {pendingTickets.length > 0 && pendingTickets.map((ticket, index) => (
            
//                     <div key={index} className="submittedTicket">
//                         <p>Category: {ticket.category} Location: {ticket.location} Description: {ticket.description}</p>
//                         <button id="submittedTicketDelete"onClick={() => handleDeleteTicket(index) }>delete</button>
//                         <div>
//                             {/* Progress Bar */}
//                         </div>
//                     </div>
//                 ))}
                
//             </div>
//             {/* Show Form or new Issue button */}
//             {showForm ? (
//                 <div className="ticketFormContainer">
//                     <div id='ticketFormClose' onClick={handleCloseForm}>x</div>
//                     <form className="ticketForm" onSubmit={handleSubmit}>
//                         <h3>Please Enter Ticket Information</h3>
//                         {/* Dropdown for Category */}
//                         <select name="category" id="ticketCat" onChange={handleInputChange} required>
//                             <option value="">Issue Category</option>
//                             <option value="Hardware">Hardware</option>
//                             <option value="IT">IT</option>
//                             <option value="Security">Security</option>
//                             <option value="Software">Software</option>
//                             <option value="Miscellaneous">Miscellaneous</option>
//                         </select>
//                         {/* Dropdown for City */}
//                         <select name="location" id="ticketLocation" onChange={handleInputChange} required>
//                             <option value="">Select a City</option>
//                             <option value="Austin">Austin, TX</option>
//                             <option value="Dallas">Dallas, TX</option>
//                             <option value="Houston">Houston, TX</option>
//                             <option value="SanAntonio">San Antonio, TX</option>
//                             <option value="LasVegas">Las Vegas, NV</option>
//                             <option value="Carlsbad">Carlsbad, NM</option>
//                             {/* Add more options as needed */}
//                         </select>
//                         {/* Description of Issue */}
//                         <textarea name="description" id="ticketDescipt" rows="5" placeholder="Description of Issue..."  onChange={handleInputChange} required />
//                         <input type="submit" className="createSubmit"/>
//                     </form>
//                 </div>
//             ) : (
//                 <button onClick={handleNewIssueClick} id="newIssueButton">New Issue</button>
//             )}
//             <div id="ticketLinkContainer">
//                 <Link to='/'>Back Home</Link>
//             </div>
//         </div>
//     )
// }

// export default TicketCreation;

import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { useSupabase } from '../../SupabaseContext';
import './ticket.css';


const TicketCreation = () => {
    const supabase = useSupabase()
    const [submittedTicket, setSubmittedTicket] = useState({
        ticketCategory: "",
        ticketLocation: "",
        descriptionOfIssue: ""
    });

    const [showForm, setShowForm] = useState(false);
    const [pendingTickets, setPendingTickets] = useState([]);

    const handleNewIssueClick = () => { setShowForm(true); }
    const handleCloseForm = () => { setShowForm(false); }

    useEffect(() => {
        const fetchTickets = async () => {
            const { data, error } = await supabase
                .from('taskissue')
                .select('*');

            if (error) {
                console.error('Error fetching tickets:', error.message);
            } else {
                setPendingTickets(data);
                console.log(pendingTickets);
            }
        };

        fetchTickets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supabase.auth.getUser())
    
        setPendingTickets([...pendingTickets, submittedTicket]);
    
        const { data, error } = await supabase
            .from('taskissue')
            .insert([
                {
                    location: submittedTicket.ticketLocation,
                    description: submittedTicket.descriptionOfIssue,
                    status: 'Pending',
                    category: submittedTicket.ticketCategory,
                }
            ]);
    
        if (error) {
            console.error('Error inserting data:', error.message)
        } else {
            console.log('Data inserted:', data)
        }
    
        setSubmittedTicket({
            category: "",
            location: "",
            description: ""
        })
    
        setShowForm(false);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSubmittedTicket({
            ...submittedTicket,
            [name]: value
        })
    }

    const handleDeleteTicket = (index) => {
        // Remove the ticket at the specified index from pending tickets
        const updatedTickets = [...pendingTickets];
        updatedTickets.splice(index, 1);
        setPendingTickets(updatedTickets);

        // Add logic to delete the ticket from the database if needed
        // Example: Call an API endpoint to delete the ticket from the database
        // deleteTicketFromDatabase(pendingTickets[index].id);
    }

    return (
        <div className="ticketPageContainer">
            <div className="ticketStatusContainer">
                <h1>Outstanding Ticket Status</h1>
                {/* Tickets table */}
                {pendingTickets.length > 0 && (
                    <table className="ticketsTable">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingTickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td>{ticket.ticketCategory}</td>
                                    <td>{ticket.ticketLocation}</td>
                                    <td>{ticket.descriptionOfIssue}</td>
                                    <td>
                                        <button onClick={() => handleDeleteTicket(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/* Show Form or new Issue button */}
            {showForm ? (
                <div className="ticketFormContainer">
                    <div id='ticketFormClose' onClick={handleCloseForm}>x</div>
                    <form className="ticketForm" onSubmit={handleSubmit}>
                        <h3>Please Enter Ticket Information</h3>
                        {/* Dropdown for Category */}
                        <select
                            name="ticketCategory"
                            id="ticketCat"
                            value={submittedTicket.ticketCategory}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Issue Category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="IT">IT</option>
                            <option value="Security">Security</option>
                            <option value="Software">Software</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                        {/* Dropdown for City */}
                        <select
                            name="ticketLocation"
                            id="ticketLocation"
                            value={submittedTicket.ticketLocation}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a City</option>
                            <option value="Austin">Austin, TX</option>
                            <option value="Dallas">Dallas, TX</option>
                            <option value="Houston">Houston, TX</option>
                            <option value="SanAntonio">San Antonio, TX</option>
                            <option value="LasVegas">Las Vegas, NV</option>
                            <option value="Carlsbad">Carlsbad, NM</option>
                            {/* Add more options as needed */}
                        </select>
                        {/* Description of Issue */}
                        <textarea
                            name="descriptionOfIssue"
                            id="ticketDescipt"
                            rows="5"
                            placeholder="Description of Issue..."
                            value={submittedTicket.descriptionOfIssue}
                            onChange={handleInputChange}
                            required
                        />
                        <input type="submit" className="createSubmit" />
                    </form>
                </div>
            ) : (
                <button onClick={handleNewIssueClick} id="newIssueButton">New Issue</button>
            )}
        </div>
    )
}

export default TicketCreation;
