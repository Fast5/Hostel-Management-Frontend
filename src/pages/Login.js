import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import PageNotFound from '../components/PageNotFound';
import { toast } from 'react-toastify';

function Login() {
  const {id}=useParams();

  const {userInfo, setUserInfo}=useContext(UserContext);
  const [user, setUser]=useState({username: "", password: ""});

  const [redirect, setRedirect]=useState(false);

  const handleChange=(event)=>{
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSubmit=async(event)=>{
    event.preventDefault();
    
    const response=await fetch(`${process.env.REACT_APP_URL}/api/${id}/login`, {  //for different login users
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    
    const res=await response.json();
      
    if(response.ok){
      toast.success(res.success, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      res.user.role=id;  //otherwise we need to reload the page to get role info
      setUserInfo(res.user);
      setRedirect(true);
    }
    else{
      toast.error(res.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  if(redirect || userInfo){
    return <Navigate to={`/${id}/account`}/>
  }

    // pattern="[A-Za-z]" must be added to name

  let role=null;

  if(id==='student'){
    role='Student';
  }
  else if(id==='hostelStaff'){
    role='Hostel Staff';
  }
  else if(id==='admin'){
    role='Admin';
  }
  else{
    return <PageNotFound />
  }

  return (
    <div className="mt-20 flex items-center justify-around">
      <div className="mb-24">
          <h1 className="text-4xl text-center mb-4">Login as {role}</h1>
          <form method="post" onSubmit={handleSubmit} className="max-w-md mx-auto my-2">
              <input type="email" name="username" value={user.username} onChange={handleChange} placeholder="username@email.com" required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id"/>
              <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="must contain 8 or more characters consisting of atleast one cap, one small and one number."/>
              <button type="submit" className="mt-2 w-full bg-red-500 text-white p-2 rounded-2xl">Login</button>
          </form>
          <div className="text-center py-2">
            Don't have an account yet?   
            <span> <Link to={"/contact"} className='underline text-blue-600'>Contact Administration</Link></span>
          </div> 
      </div>
    </div>
  )
}

export default Login;
