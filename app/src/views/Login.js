import React, { useState } from 'react';
import './Register.css';


const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    function setPassword(event) {
        event.preventDefault()
     
        setInputs({ email: inputs.email, password: event.target.value })
    }

    function setEmail(event) {
        console.log(event)
        event.preventDefault()
     
        setInputs({ email: event.target.value, password: inputs.password })

    }


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
                                value={inputs.email}
                                required
                                onChange={setEmail} />
                        </div>
                        <div>
                            <label htmlFor="password"></label>
                            <input type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={inputs.password}
                                onChange={setPassword}
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
