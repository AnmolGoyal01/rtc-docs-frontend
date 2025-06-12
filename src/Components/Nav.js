import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoImg from './Assets.js/logo.png'

const Nav = () => {
    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        Navigate('/signup');
    }
    return (
        <div>
            <img className="logo-ul" alt="logo" src={LogoImg}></img>
            {auth ? <ul className='nav-ul'>
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add-product">Add Product</Link></li>
                <li><Link to="/update">Update</Link></li>
                {/* <li><Link to="/profile">Profile</Link></li> */}
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                : <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>

                </ul>

            }
        </div>
    )
}

export default Nav;