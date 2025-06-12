import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateComponent = ()=>{
    const auth = localStorage.getItem('user')
    const Navigate = useNavigate();
    
    return auth ? <Outlet /> : Navigate("/signup");
    
};

export default PrivateComponent;