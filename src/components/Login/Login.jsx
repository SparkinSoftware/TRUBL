import React from 'react';
import './login.css';

function Login(){

    return (
        <>
            <div className="loginBody">
                <div className="loginContainer">
                    <div className="loginLogo">
                        <h1>LOGO</h1>
                    </div>
                    <div className="loginFieldContainer">
                        <div className="loginFields">
                            <div className="loginLabel">EMPLOYEE LOGIN</div>
                            <form className="loginForm" autoComplete="off">
                                {/* <label htmlFor="username">Username:</label> */}
                                <input placeholder="Username" type="text" id="username" name="username" required/>

                                {/* <label htmlFor="password">Password:</label> */}
                                <input placeholder="Password" type="text" id="password" name="password" required/>

                                <button className="loginSubmit"type="submit">Login</button>
                            </form>
                            <div className="loginRegisterContainer">
                                <div className="loginRegisterLink">New Employee? <u>Register Here</u></div>
                            </div>
                        </div>
                    </div>
                    <div className="loginRegister">

                    </div>
                </div>
            </div>
        </>
    )
}
export default Login