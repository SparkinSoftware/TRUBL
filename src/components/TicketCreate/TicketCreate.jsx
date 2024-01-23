import React, { useState } from "react";
import { Link } from "react-router-dom";
import './ticket.css';

const TicketCreation = () => {

    const [submittedTicket, setSubmittedTicket] = useState({
        ticketCategory: "",
        ticketLocation: "",
        descriptionOfIssue: ""
    })
    
    const [showForm, setShowForm] = useState(false)
    const [pendingTickets, setPendingTickets] = useState([])

    const handleNewIssueClick = () => { setShowForm(true); }
    const handleCloseForm = () => { setShowForm(false); }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add ticket to the back of pending tickets array
        setPendingTickets([...pendingTickets, submittedTicket])

        // clear the form once submitted
        setSubmittedTicket({
            ticketCategory: "",
            ticketLocation: "",
            descriptionOfIssue: ""
        })

        setShowForm(false)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSubmittedTicket({
            ...submittedTicket,
            [name]: value
        })
    }

    return (
        <div className="ticketPageContainer">
            <div className="ticketStatusContainer">
                <h1>Outstanding Ticket Status</h1>
                {/* Tickets area */}
                {pendingTickets.length > 0 && pendingTickets.map((ticket, index) => (
            
                    <div key={index} className="submittedTicket">
                        <p>Category: {ticket.ticketCategory} Location: {ticket.ticketLocation} Description: {ticket.descriptionOfIssue}</p>
                        <div></div>
                        {console.log(ticket.ticketCategory, ticket.ticketLocation, ticket.descriptionOfIssue)}
                    </div>
                    // Progress Bar
    
                ))}
                
            </div>
            {/* Show Form or new Issue button */}
            {showForm ? (
                <div className="ticketFormContainer">
                    <div id='ticketFormClose' onClick={handleCloseForm}>x</div>
                    <form className="ticketForm" onSubmit={handleSubmit}>
                        <h3>Please Enter Ticket Information</h3>
                        {/* Dropdown for Category */}
                        <select name="ticketCategory" id="ticketCat" required>
                            <option value="">Issue Category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                            <option value="Security">Security</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                        {/* Dropdown for City */}
                        <select name="ticketLocation" id="ticketLocation" required>
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
                        <textarea name="descriptionOfIssue" id="ticketDescipt" rows="5" placeholder="Description of Issue..." required />
                        <input type="submit" className="createSubmit"/>
                    </form>
                </div>
            ) : (
                <button onClick={handleNewIssueClick} id="newIssueButton">New Issue</button>
            )}
        </div>
    )
}

export default TicketCreation;
