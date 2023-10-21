import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function Login() {
  const {id}=useParams();
  
  let role=null;

  if(id==='student'){
    role='Student';
  }
  else if(id==='hostelStaff'){
    role='Hostel Staff';
  }
  else{
    role='Admin';
  }

  const {setUserInfo}=useContext(UserContext);

  const [user, setUser]=useState({username: "", password: ""});

  const [redirect, setRedirect]=useState(false);

  const handleChange=(event)=>{
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSubmit=async(event)=>{
    event.preventDefault();
    
    const response=await fetch("http://localhost:5000/api/admin/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    
    const res=await response.json();

    if(response.ok){
      alert(res.success);
      setUser({username: "", password: ""});
      res.user.role=id;  //otherwise we need to reload the page to get role info
      setUserInfo(res.user);
      setRedirect(true);
    }
    else{
      alert(res.error);
    }
  }

  if(redirect){
    return <Navigate to={`/${id}/account`}/>
  }

  return (
    <div className="mt-20 flex items-center justify-around">
      <div className="mb-24">
          <h1 className="text-4xl text-center mb-4">Login as {role}</h1>
          <form method="post" onSubmit={handleSubmit} className="max-w-md mx-auto my-2">
              <input type="email" name="username" value={user.username} onChange={handleChange} placeholder="username@email.com" required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id"/>
              <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" required pattern=".{8,}" title="Eight or more characters"/>
              <button type="submit" className="mt-2 w-full bg-red-500 text-white p-2 rounded-2xl">Login</button>
          </form>
          <div className="text-center py-2">
            Don't have an account yet?   
            {id==='admin'?<span> <Link to={"/register/admin"} className='underline text-blue-600'>Register</Link></span>:<span> <Link to={"/contact"} className='underline text-blue-600'>Contact Administration</Link></span>}
          </div>
      </div>
    </div>
  )
}

export default Login;
