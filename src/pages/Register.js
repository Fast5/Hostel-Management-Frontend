import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";

function Register(){
    const {id}=useParams();
    
    const [user, setUser]=useState({name: "", username: "", password: ""});

    const [redirect, setRedirect]=useState(false);

    const handleChange=(event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        
        if(id==='admin'){
            const response=await fetch(`${process.env.REACT_APP_URL}/api/admin/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            const res=await response.json();
            
            if(response.ok){
                alert(res.success);
                setUser({name: "", username: "", password: ""});
            }
            else{
                alert(res.error);
            }
        }
        else{
            return <PageNotFound />
        }
    }

    if(redirect){
        <Navigate to={"/login"}/>
    }

    return(
        <div className="mt-20 flex items-center justify-around">
        <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Sign Up</h1>
            <form method="post" onSubmit={handleSubmit} className="max-w-md mx-auto my-2">
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="full name" required autoComplete="off"/>
                
                {/* {id==='student' ? 
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="full name" required autoComplete="off"/>: } */}

                <input type="email" name="username" value={user.username} onChange={handleChange} placeholder="username@email.com" required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id"/>
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Eight or more characters"/>
                <button type="submit" className="mt-2 w-full bg-red-500 text-white p-2 rounded-2xl">Register</button>
            </form>
            <div className="text-center py-2">
              Already a user?   
              <span> <Link to={"/login/"+id} className='underline text-blue-600'>Login</Link></span>
            </div>
        </div>
      </div>
    );
}

export default Register;