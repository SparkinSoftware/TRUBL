import { Link } from 'react-router-dom'

const Home = () => {
    return (
      <div>
        <h1>Welcome to TRUBL.</h1>
        <Link to='about'>About Page</Link>
        <br/>
        <Link to='contact'>Contact Page</Link>
        <br/>
        <Link to='technician'>{`Technician`}</Link>
        <br/>
        <Link to='administrator'>{`Administrator`}</Link>
        <br />
        <Link to='login'>Login</Link>
        <br />
        <Link to='ticketCreate'>Tickets</Link>
      </div>
    );
  }
  
  export default Home;
  