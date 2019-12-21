import React, { useState } from 'react'
import './Register.css';

const Register = () => {

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    });

    const setUsername = (event) => {

        event.preventDefault();

        setInputs({
            username: event.target.value,
            email: inputs.email,
            password: inputs.password
        })
    }

    const setEmail = (event) => {

        event.preventDefault();

        setInputs({
            username: inputs.username,
            email: event.target.value,
            password: inputs.password
        })
    }
    const setPass = (event) => {

        event.preventDefault();

        setInputs({
            username: inputs.username,
            email: inputs.email,
            password: event.target.value
        })
    }

    const submit = (event) =>{

        //create User
        
    }
    
return (
    <div className="container">
        <div className="row">
            <div className="corfundo">
                <form>
                    <h1>Register</h1>
                    <div>
                        <label htmlFor="username"></label>
                        <input type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={inputs.username}
                            required
                            onChange={setUsername} />
                    </div>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={setEmail} 
                            required />

                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input type="password"
                            name="password"
                            value={inputs.password}
                            onChange={setPass} 
                            placeholder="Enter Password"
                            required />

                    </div>
                    <button type="submit">
                        Register
                        </button>
                </form>
            </div>
        </div>
    </div>
)
}

export default Register;
