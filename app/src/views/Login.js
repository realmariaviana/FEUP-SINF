import React, { useState } from 'react';
import './Register.css';


const Login = () => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    return (
        <div className="container">
            <div className="row">
                <div className="corfundo">
                    <form>
                        <h1>Login</h1>
                        <div>
                        <label htmlFor="email"></label>
                            <input type="email"
                                name="email"
                                placeholder="Enter Email"
                                
                                required />
                        </div>
                        <div>
                            <label htmlFor="password"></label>
                            <input type="password"
                                name="password"
                                placeholder="Enter Password"
                               
                                required />
                        </div>
                        <button type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
