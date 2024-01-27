import { Link } from 'react-router-dom'
import './home.css'

  const Home = () => {
    return (
      <div className="homepageBody">
        <div className="homeContainer" >
          <div className="homeLogo">
            <h1>Welcome to the In Progress TRUBL app</h1>
          </div>
          <div className="homeBody">
            <div className="homeBodyTitle">
              <p>This is a work-in-progress landing page to allow for easy navigation during development.
                The final design will open directly to the login page.</p> 
            </div>
            <div className="homeBodySub">
              <div className="homeTechLink"> <Link to='technician'>{`Technician`}</Link> </div>
              <div className="homeAdminLink"> <Link to='administrator'>{`Administrator`}</Link> </div>
              <div className="homeLoginLink"> <Link to='login'>Login</Link> </div>
              <div className="homeTicketLink"> <Link to='ticketCreate'>Tickets</Link> </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;

  // const Home = () => {
//     return (
//       <div>
//         <h1>Welcome to TRUBL.</h1>
//         <Link to='about'>About Page</Link>
//         <br/>
//         <Link to='contact'>Contact Page</Link>
//         <br/>
//         <Link to='technician'>{`Technician`}</Link>
//         <br/>
//         <Link to='administrator'>{`Administrator`}</Link>
//         <br />
//         <Link to='login'>Login</Link>
//         <br />
//         <Link to='ticketCreate'>Tickets</Link>
//       </div>
//     );
//   }
  
//   export default Home;
  