import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AccountNav from "../components/AccountNav";
import Loader from "../components/Loader";

function Account(){
    const {id}=useParams();

    let {userInfo, setUserInfo, ready}=useContext(UserContext);

    const [redirect, setRedirect]=useState(false);

    // if(!ready){
    //     setTimeout(()=>{
    //     }, 1000);
    // }

    if(!userInfo && !redirect){
        return <Loader />;
    }

    const handleClick=async()=>{
        const response=await fetch("http://localhost:5000/logout", {
            method: 'GET',
            credentials: 'include'
        });

        const res=await response.json();

        alert(res.success);
        setUserInfo(null);
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/"}/>
    }

    if(id==='admin'){
        return(
            <div>
                <AccountNav role={id} />
    
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {userInfo.name} ({userInfo.username})
                    <br />
                    <button onClick={handleClick} className="bg-red-500 text-white max-w-sm w-full py-2 mt-2 rounded-2xl">Logout</button>
                </div>
            </div>
        );
    }
    if(id==='student'){
        return(
            <div>
                <AccountNav role={id} />
    
                {/* student details */}
                
            </div>
        );       
    }
}

export default Account;