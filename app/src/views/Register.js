import React, { useState } from 'react'
import './Register.css';

const Register = () => { 

    const [inputs] = useState({
        username:'',
        email:'',
        password:'',
        description: ''
    });


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
                                required />
                        </div>
                        <div>
                            <label htmlFor="email"></label>
                            <input type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={inputs.email}
                                required />

                        </div>
                        <div>
                            <label htmlFor="password"></label>
                            <input type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={inputs.password}
                                required />
                           
                            <input type="password"
                                name="password"
                                placeholder="Repeat Password"
                                value={inputs.password}
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
