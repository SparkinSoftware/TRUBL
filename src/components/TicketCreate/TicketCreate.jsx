
import React, { useState, useEffect  } from "react";
import { Link, createRoutesFromElements } from "react-router-dom";
import { useSupabase } from '../../SupabaseContext';
import './ticket.css';
import Chat from '../Chat/Chat.jsx';
import '../Nightmode/NightModeToggle.css';
import { useNightMode } from '../Nightmode/NightModeContext.jsx';

// { + (isNightMode ? '-nm' : '')}

const TicketCreation = () => {
    const { isNightMode } = useNightMode();
    const supabase = useSupabase()
    // state for form data
    const [submittedTicket, setSubmittedTicket] = useState({
        category: "",
        location: "",
        description: ""
    });

    // currentUser data
    const [currentUser, setCurrentUser] = useState('Guest')
    supabase.auth.getUser().then(user => {
        setCurrentUser(user.data.user.user_metadata.display_name)
        
    })

    const [userId, setUserId] = useState(supabase.auth.getUser().then(user => {
        setUserId(user.data.user.id)
    }))

    const [showForm, setShowForm] = useState(false);
    
    // tickets in the Outstanding Ticket Status area
    const [pendingTickets, setPendingTickets] = useState([]);

    // state to select ticket by click
    const [selectedTicketIndex, setSelectedTicketIndex] = useState(false)

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
                    // console.log(pendingTickets);
                } 
            } catch (error) {
                console.error('Error fetching tickets:', error.message)
            }
        };
    

        fetchTickets();
    }, [supabase, userId]);
    

    // add a issue to database and append to table 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // determine if ticket is remote
        const isRemote = submittedTicket.category === "Software" || submittedTicket.category === "IT" || submittedTicket.categegory === 'Security'
    
        setPendingTickets([...pendingTickets, submittedTicket]);
        
        const { data, error } = await supabase
            .from('taskissue')
            .insert([
                {
                    location: submittedTicket.location,
                    description: submittedTicket.description,
                    status: 'Pending',
                    category: submittedTicket.category,
                    remote: isRemote,
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

    // Delete Ticket from table and database when delete button is clicked
    const handleDeleteTicket = async (index) => {
        if(index < 0 || index >= pendingTickets.length){
            console.error('Invailid index for deleting ticket.')
            return
        }

        const ticketIdToDelete = pendingTickets[index].id

        if (!ticketIdToDelete) {
            console.error('Invalid ticket ID for deleting ticket.')
            return
        }
    
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
            <div id={"currentUserContainer" + (isNightMode ? '-nm' : '')}>
                <p>Welcome, {currentUser}</p>
            </div>
            {/* Show Form or Outstanding Tickets Status */}
            {showForm ? (
                <>
                    <div className={"ticketFormContainer" + (isNightMode ? '-nm' : '')}>
                        <form className={"ticketForm" + (isNightMode ? '-nm' : '')} onSubmit={handleSubmit}>
                            <h5>Please Enter Ticket Information</h5>
                            {/* Dropdown for Category */}
                            <select
                                name="category"
                                id={"ticketCat" + (isNightMode ? '-nm' : '')}
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
                                id={"ticketLocation" + (isNightMode ? '-nm' : '')}
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
                                id={"ticketDescript" + (isNightMode ? '-nm' : '')}
                                rows="5"
                                placeholder="Description of Issue..."
                                value={submittedTicket.description}
                                onChange={handleInputChange}
                                required
                            />
                            <input type="submit" className={"createSubmit" + (isNightMode ? '-nm' : '')} />
                        </form>
                        
                    </div>
                    <button className={'ticketBtn' + (isNightMode ? '-nm' : '')} onClick={handleCloseForm}>Back</button>
                </>
            ) : (
                <>
                    <div className={"ticketStatusContainer" + (isNightMode ? '-nm' : '')}>
                    <h2>Outstanding Ticket Status</h2>
                    {/* Tickets table or No Outstanding Tickets Displayed */}
                    {pendingTickets.length > 0 ? (
                        <table className={"ticketsTable" + (isNightMode ? '-nm' : '')}>
                            <thead>
                                <tr className={"ticketHeaderContainer" + (isNightMode ? '-nm' : '')}>
                                    <th className={"headerCell" + (isNightMode ? '-nm' : '')}>Category</th>
                                    <th className={"locationCell" + (isNightMode ? '-nm' : '')}>Location</th>
                                    <th className={"descriptionCell" + (isNightMode ? '-nm' : '')}>Description</th>
                                    <th className={"actionCell" + (isNightMode ? '-nm' : '')}>Action</th>
                                </tr>
                            </thead>
                            <tbody className={"ticketTableBody" + (isNightMode ? '-nm' : '')}>
                                {pendingTickets.map((ticket, index) => (
                                    <React.Fragment key={index}>
                                        <tr onClick={() => setSelectedTicketIndex(index)}>
                                            <td className={"categoryCell" + (isNightMode ? '-nm' : '')}>{ticket.category}</td>
                                            <td className={"locationCell" + (isNightMode ? '-nm' : '')}>{ticket.location}</td>
                                            <td className={"descriptionCell, descriptionText" + (isNightMode ? '-nm' : '')}>{ticket.description}</td>
                                            <td className={"actionCell" + (isNightMode ? '-nm' : '')}>
                                                <button onClick={() => handleDeleteTicket(index)}>Delete</button>
                                            </td>
                                        </tr>
                                        {selectedTicketIndex === index && (
                                            <tr key={index} className={"expandedRowContainer" + (isNightMode ? '-nm' : '')}>
                                                <td colSpan="4">
                                                    <div className={"expandedRow" + (isNightMode ? '-nm' : '')}>
                                                        <div className={"fullDescription" + (isNightMode ? '-nm' : '')}>&nbsp;<span className="ticketDescClose" onClick={() => setSelectedTicketIndex(null)}>X</span>  &nbsp;<span className="ticketDownArrow">↳</span>&nbsp; {ticket.description}</div>
                                                    </div>
                                                </td>
                                                <Chat ticketId={ticket.id} />
                                            </tr>
                                        )}

                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <>
                            <h3 >No Outstanding Tickets</h3>
                        </>
                        )}
                </div>
                <button onClick={handleNewIssue} className={"ticketBtn" + (isNightMode ? '-nm' : '')}>New Issue</button>
                </>
            )}
            <div id={"ticketLinkContainer" + (isNightMode ? '-nm' : '')}>
                <Link to='/landing'>Back</Link>
                <br />
                <Link to='/login'>Logout</Link>
                { userId === 3 && (
                    <>
                        <br/>
                        <Link to='/administrator'>Administrator</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default TicketCreation;
