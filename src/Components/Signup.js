import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth){
            navigate('/');
        }
    }, [navigate]);

    const collectData = async () => {
        console.log(username, email, password);
        let result = await fetch('http://localhost:4000/api/v1/users/register', {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        result = await result.json();
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result?.data?.username || ""));
        // localStorage.setItem('token', JSON.stringify(result?.data?.username || ""));
        navigate('/');
        console.log(result);
    }

    return (
        <div className='register-ul'>
            <h1>Register</h1>
            <input className="inputBox" type="text"
                value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Name' />

            <input className="inputBox" type='text'
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

            <input className="inputBox" type='password'
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />

            <button onClick={collectData} className="button-ul" type='button'>SignUp</button>
        </div>
    )
}

export default Signup;