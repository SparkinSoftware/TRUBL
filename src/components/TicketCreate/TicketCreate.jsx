import React, { useState, useEffect  } from "react";
import { Link, createRoutesFromElements } from "react-router-dom";
import { useSupabase } from '../../SupabaseContext';
import './ticket.css';
import Chat from '../Chat/Chat.jsx';


const TicketCreation = () => {
    const supabase = useSupabase()
    // state for form data
    const [submittedTicket, setSubmittedTicket] = useState({
        category: "",
        location: "",
        description: ""
    });

    // currentUser data
    const [currentUser, setCurrentUser] = useState('Guest')
    

    const [userId, setUserId] = useState(supabase.auth.getUser().then(user => {
        setUserId(user.data.user.id)
    }))

    const [showForm, setShowForm] = useState(false);
    // tickets in the Outstanding Ticket Status area
    const [pendingTickets, setPendingTickets] = useState([]);
    // state to select ticket by click
    const [selectedTicketIndex, setSelectedTicketIndex] = useState()
    // function to change state of form to show form or new issue button
    const handleNewIssue = () => { setShowForm(true); }
    const handleCloseForm = () => { setShowForm(false); }

    // fetch all tickets from data base on inital load
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const user = await supabase.auth.getUser()
                const userId = user.data.user.id
            
                const { data, error } = await supabase
                    .from('taskissue')
                    .select('*')
                    .eq('customer', userId)
    
                if (error) {
                    console.error('Error fetching tickets:', error.message);
                } else {
                    setPendingTickets(data);
                    console.log(pendingTickets);
                } 
            } catch (error) {
                console.error('Error fetching tickets:', error.message)
            }
        };
    
        fetchTickets();
    }, [supabase, currentUser]);
    

    // add a issue to database and append to table 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setPendingTickets([...pendingTickets, submittedTicket]);
        
        const { data, error } = await supabase
            .from('taskissue')
            .insert([
                {
                    location: submittedTicket.location,
                    description: submittedTicket.description,
                    status: 'Pending',
                    category: submittedTicket.category,
                    customer: userId, 
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

    // captures value of inputs 
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSubmittedTicket({
            ...submittedTicket,
            [name]: value
        })
    }

    const handleDeleteTicket = async (index) => {

        const ticketIdToDelete = pendingTickets[index].id;
    
        try {

            const { error: messageDeleteError } = await supabase
                .from('messages')
                .delete()
                .eq('ticket_id', ticketIdToDelete);
    
            if (messageDeleteError) {
                console.error('Error deleting messages:', messageDeleteError.message);
                return;
            }
    
            const { error: ticketDeleteError } = await supabase
                .from('taskissue')
                .delete()
                .eq('id', ticketIdToDelete);
    
            if (ticketDeleteError) {
                console.error('Error deleting ticket:', ticketDeleteError.message);
                return;
            }
    
            setPendingTickets((prevTickets) =>
                prevTickets.filter((ticket) => ticket.id !== ticketIdToDelete)
            );
        } catch (error) {
            console.error('Error during deletion process:', error.message);
        }
    };
    

    return (
        <div className="ticketPageContainer">    
            <div id="currentUserContainer">
                <p>Welcome, {currentUser}</p>
            </div>
            {/* Show Form or Outstanding Tickets Status */}
            {showForm ? (
                <div className="ticketFormContainer">
                    <div id='ticketFormClose' onClick={handleCloseForm}>x</div>
                    <form className="ticketForm" onSubmit={handleSubmit}>
                        <h5>Please Enter Ticket Information</h5>
                        {/* Dropdown for Category */}
                        <select
                            name="category"
                            id="ticketCat"
                            value={submittedTicket.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Issue Category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="IT">IT</option>
                            <option value="Security">Security</option>
                            <option value="Software">Software</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                            {/* Add more options as needed */}
                        </select>
                        {/* Dropdown for City */}
                        <select
                            name="location"
                            id="ticketLocation"
                            value={submittedTicket.location}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a City</option>
                            <option value="Austin">Austin, TX</option>
                            <option value="Dallas">Dallas, TX</option>
                            <option value="Houston">Houston, TX</option>
                            <option value="San Antonio">San Antonio, TX</option>
                            <option value="Las Vegas">Las Vegas, NV</option>
                            <option value="Carlsbad">Carlsbad, NM</option>
                            {/* Add more options as needed */}
                        </select>
                        {/* Description of Issue */}
                        <textarea
                            name="description"
                            id="ticketDescipt"
                            rows="5"
                            placeholder="Description of Issue..."
                            value={submittedTicket.description}
                            onChange={handleInputChange}
                            required
                        />
                        <input type="submit" className="createSubmit" />
                    </form>
                </div>
            ) : (
                <>
                    <div className="ticketStatusContainer">
                    <h2>Outstanding Ticket Status</h2>
                    {/* Tickets table */}
                    {pendingTickets.length > 0 && (
                        <table className="ticketsTable">
                            <thead>
                                <tr className="ticketHeaderContainer">
                                    <th className="headerCell">Category</th>
                                    <th className="locationCell">Location</th>
                                    <th className="descriptionCell">Description</th>
                                    <th className="actionCell">Action</th>
                                </tr>
                            </thead>
                            <tbody className="ticketTableBody">
                                {pendingTickets.map((ticket, index) => (
                                    <React.Fragment key={index}>
                                        <tr key={index} onClick={() => setSelectedTicketIndex(index)}>
                                            <td className="categoryCell">{ticket.category}</td>
                                            <td className="locationCell">{ticket.location}</td>
                                            <td className="descriptionCell, descriptionText">{ticket.description}</td>
                                            <td className="actionCell">
                                                <button onClick={() => handleDeleteTicket(index)}>Delete</button>
                                            </td>
                                        </tr>
                                        {selectedTicketIndex === index && (
                                            <tr key={index} className="expandedRowContainer">
                                                <td colSpan="4">
                                                    <div className="expandedRow">
                                                        <div className="fullDescription">&nbsp;<span className="ticketDescClose" onClick={() => setSelectedTicketIndex(null)}>X</span>  &nbsp;<span className="ticketDownArrow">↳</span>&nbsp; {ticket.description}</div>
                                                    </div>
                                                </td>
                                                <Chat ticketId={ticket.id} />
                                            </tr>
                                        )}

                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <button onClick={handleNewIssue} id="newIssueButton">New Issue</button>
                </>
            )}
            <div id="ticketLinkContainer">
                <Link to='/'>Back Home</Link>
            </div>
        </div>
    )
}

export default TicketCreation;
