import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { useSupabase } from '../../SupabaseContext';
import './ticket.css';


const TicketCreation = () => {
    const supabase = useSupabase()
    // state for form data
    const [submittedTicket, setSubmittedTicket] = useState({
        category: "",
        location: "",
        description: ""
    });

    const [showForm, setShowForm] = useState(false);
    // tickets in the Outstanding Ticket Status area
    const [pendingTickets, setPendingTickets] = useState([]);

    // function to change state of form to show form or new issue button
    const handleNewIssueClick = () => { setShowForm(true); }
    const handleCloseForm = () => { setShowForm(false); }

    // fetch all tickets from data base on inital load
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

    // add a issue to database and append to table 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supabase.auth.getUser())
    
        setPendingTickets([...pendingTickets, submittedTicket]);
    
        const { data, error } = await supabase
            .from('taskissue')
            .insert([
                {
                    location: submittedTicket.location,
                    description: submittedTicket.description,
                    status: 'Pending',
                    category: submittedTicket.category,
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
        // Retrieve the ticket ID from the local state
        const ticketIdToDelete = pendingTickets[index].id;
    
        try {
            // Make an API call to delete the record from the Supabase table
            const { data, error } = await supabase
                .from('taskissue')
                .delete()
                .eq('id', ticketIdToDelete);
    
            if (error) {
                console.error('Error deleting ticket:', error.message);
                return;
            }
    
            // Update the local state to reflect the deletion
            setPendingTickets((prevTickets) =>
                prevTickets.filter((ticket) => ticket.id !== ticketIdToDelete)
            );
        } catch (error) {
            console.error('Error deleting ticket:', error.message);
        }
    };
    

    return (
        <div className="ticketPageContainer">
            <div className="ticketStatusContainer">
                <h2>Outstanding Ticket Status</h2>
                {/* Tickets table */}
                {pendingTickets.length > 0 && (
                    <table className="ticketsTable">
                        <thead>
                            <tr >
                                <th>Category</th>
                                <th className="locationCell">Location</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingTickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td className="categoryCell">{ticket.category}</td>
                                    <td className="locationCell">{ticket.location}</td>
                                    <td className="descriptionCell">{ticket.description}</td>
                                    <td className="actionCell">
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
                            <option value="SanAntonio">San Antonio, TX</option>
                            <option value="LasVegas">Las Vegas, NV</option>
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
                <button onClick={handleNewIssueClick} id="newIssueButton">New Issue</button>
            )}
            <div id="ticketLinkContainer">
                <Link to='/'>Back Home</Link>
            </div>
        </div>
    )
}

export default TicketCreation;
