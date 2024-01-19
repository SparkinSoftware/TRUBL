import React, {useState} from 'react';
import './login.css';

function Login(){
    const [isRegistrationMode, setRegistrationMode] = useState(false);
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
                        <h1>LOGO</h1>
                    </div>
                    {/* Conditional rendering for RegistrationMode */}
                    {isRegistrationMode ? (
                        <div className="loginRegFields">
                            <div className="loginRegLabel">NEW USER REGISTRATION</div>
                            <form className="loginRegForm" autoComplete="off">
                                <input placeholder="First Name" type="text" id="fname" name="fname" autoComplete="off" required/>
                                <input placeholder="Last Name" type="text" id="lname" name="lname" autoComplete="off" required/>
                                <input placeholder="Email" type="text" id="email" name="email" autoComplete="off" required />
                                <input placeholder="Password" type="text" id="regpassword" name="regpassword" required />
                                <input placeholder="Re-Enter Password" type="text" id="repassword" name="repassword" required />
                                <button className="loginRegSubmit"type="submit">Register</button>
                            </form>
                            <div className="loginRegBackContainer">
                                    <div className="loginRegBack" onClick={handleRegisterBackClick}><u>Back to Login</u></div>
                                </div>
                        </div>
                    ) : (
                        <div className="loginFieldContainer">
                            <div className="loginFields">
                                <div className="loginLabel">EMPLOYEE LOGIN</div>
                                <form className="loginForm" autoComplete="off">
                                    <input placeholder="Username" type="text" id="username" name="username" autoComplete="off" required/>
                                    <input placeholder="Password" type="text" id="password" name="password" autoComplete="off" required/>

                                    <button className="loginSubmit"type="submit">Login</button>
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