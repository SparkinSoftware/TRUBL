import { Link } from 'react-router-dom'

const Home = () => {
    return (
      <div>
        <h1>This is the home page</h1>
        <Link to='about'>About Page</Link>
        <br/>
        <Link to='contact'>Contact Page</Link>
        <br/>
        <Link to='technician'>{`Technician`}</Link>
        <br/>
        <Link to='administrator'>{`Administrator`}</Link>
        <br/>
        <Link to='login'>Login</Link>
      </div>
    );
  }
  
  export default Home;
  