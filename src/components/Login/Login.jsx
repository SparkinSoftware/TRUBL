import React, {useState} from 'react';
import { useSupabase } from '../../SupabaseContext';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const supabase = useSupabase();
    console.log(supabase)
    const [isRegistrationMode, setRegistrationMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Error logging in:', error.message);
            setLoginError('Invalid email or password');
        } else {
            console.log('User logged in');
            navigate('/landing');
        }
    };

    const handleRegister = async (e) => {

        const name = document.getElementById('fname').value + ' ' + document.getElementById('lname').value
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Error in registration: Passwords do not match');
            setRegistrationError('Passwords do not match');
            return;
        }
        // Attempt to sign up the user using Supabase Auth.
        const { user, error } = await supabase.auth.signUp({ email, password, options: {
            data: {display_name: name }
        } });
        if (error) {
            console.error('Error in registration:', error.message);
            setRegistrationError(error.message)
            //put password popup length thing here
        } else {
            console.log('User registered',user);
            const authData = JSON.parse(localStorage.getItem('sb-ktngdikunrifjvpwaljj-auth-token'));
            const { data, insertError } = await supabase.from('employee').insert([{
                id: authData.user.id,
                name: name,
                email: email
            }]);
            if (insertError) {
                console.error('Error inserting user details:', insertError.message);
            } else {
                console.log('User details inserted');
            }
        }
    };
    const handleRegisterClick = () => {
        console.log("Registration Mode Toggled On")
        setRegistrationMode(true);
    }
    const handleRegisterBackClick = () => {
        console.log("Registration Mode Toggled Off")
        setRegistrationMode(false);
    }
    return (
        <>
            <div className="loginBody">
                <div className="loginContainer">
                    <div className="loginLogo">
                        <h1>TRUBL</h1>
                    </div>
                    {/* Conditional rendering for RegistrationMode */}
                    {isRegistrationMode ? (
                        <div className="loginRegFields">
                            <div className="loginRegLabel">NEW USER REGISTRATION</div>
                            {registrationError && <div className="loginErrorContainer">{registrationError}</div>}
                            <form className="loginRegForm" autoComplete="off" onSubmit={handleRegister}>
                                <input placeholder="First Name" type="text" id="fname" name="fname" autoComplete="off" required/>
                                <input placeholder="Last Name" type="text" id="lname" name="lname" autoComplete="off" required/>
                                <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                                <input placeholder="Re-Enter Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                                <button className="loginRegSubmit" type="submit">Register</button>
                            </form>
                            <div className="loginRegBackContainer">
                                    <div className="loginRegBack" onClick={handleRegisterBackClick}><u>Back to Login</u></div>
                                </div>
                        </div>
                    ) : (
                        <div className="loginFieldContainer">
                            <div className="loginFields">
                                <div className="loginLabel">EMPLOYEE LOGIN</div>
                                <form className="loginForm" autoComplete="off" onSubmit={handleLogin}>
                                    <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                                    <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                                    {loginError && <div className="loginErrorContainer">{loginError}</div>}
                                    <button className="loginSubmit" type="submit">Login</button>
                                </form>
                                <div className="loginRegisterContainer">
                                    <div className="loginRegisterLink" onClick={handleRegisterClick}>New Employee? <u>Register Here</u></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Login