import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth){
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.log("email,password", email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        result = await result.json();
        console.log(result);
        // console.log(result.name);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        }
        else {
            alert("Please Enter Correct Details");
        }
    }
    return (
        <div className='login-ul'>
            <h3>Login</h3>
            <input className='inputBox' text="text"
                value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email'></input>

            <input className='inputBox' text="password"
                value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password'></input>

            <button onClick={handleLogin} className='button-ul' >Login</button>
        </div>
    )
}
export default Login;