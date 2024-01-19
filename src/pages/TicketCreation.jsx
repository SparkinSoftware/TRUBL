import { Link } from "react-router-dom";

const TicketCreation = () => {
    

    return (
        <div className="ticketPageContainer">
            <div className="ticketStatusContainer">
                <h1>Outstanding Ticket Status</h1>
                {/* Progress Bar */}
            </div>
            <div className="ticketFormContainer">

                <h1>Please Enter Ticket Information</h1>
                <form className="ticketForm">
                    {/* Dropdown for Category */}
                    <select type="text" name="ticketCategory" id="" placeholder="Ticket Category" required>
                        <option value="">Issue Category</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Security">Security</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                     {/* Dropdown for City */}
                    <select name="dropdownOption" required>
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
                    <textarea name="descriptionOfIssue" id="" cols="30" rows="10" placeholder="Description of Issue" required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TicketCreation