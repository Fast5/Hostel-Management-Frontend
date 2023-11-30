import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AccountNav from "../components/AccountNav";
import Loader from "../components/Loader";
import PageNotFound from "../components/PageNotFound";
import RoomsContext from "../contexts/RoomsContext";

function Account(){
    const {id}=useParams();

    const {userInfo, setUserInfo, ready1, setReady1}=useContext(UserContext);
    const {rooms, ready2, setReady2}=useContext(RoomsContext);

    const [redirect, setRedirect]=useState(false);

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
        }
        if(rooms.length===0){
            setReady2(false);
        }
    }, [userInfo, rooms.length])

    if(!userInfo && !redirect){
        return <Loader />
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
                    Logged in as {userInfo?.name} ({userInfo?.username})
                    <br />
                    <button onClick={handleClick} className="bg-red-500 text-white max-w-sm w-full py-2 mt-2 rounded-2xl">Logout</button>
                </div>
            </div>
        );
    }
    else if(id==='student'){
        if(rooms.length===0 && !ready2 && !redirect){
            return <Loader />
        }

        return(
            <div>
                <AccountNav role={id} />

                <div className="text-center max-w-lg mx-auto mb-20">
                    <div className="flex items-center gap-32">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={userInfo?.name} readOnly/>
                    </div>
                    <div className="flex items-center gap-28">
                        <label htmlFor="rollNo" className="whitespace-nowrap">Roll No.</label>
                        <input type="text" id="rollNo" value={userInfo?.rollNo} readOnly/>
                    </div>
                    <div className="flex items-center gap-24">
                        <label htmlFor="phoneNo" className="whitespace-nowrap">Phone No.</label>
                        <input type="text" id="phoneNo" value={userInfo?.phoneNo} readOnly/>
                    </div>
                    <div className="flex items-center gap-14">
                        <label htmlFor="guardianName" className="whitespace-nowrap">Guardian Name</label>
                        <input type="text" id="guardianName" value={userInfo?.guardianName} readOnly/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="guardianPhoneNo" className="whitespace-nowrap">Guardian Phone No.</label>
                        <input type="text" id="guardianPhoneNo" value={userInfo?.guardianPhoneNo} readOnly/>
                    </div>
                    <div className="flex items-center gap-24">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={userInfo?.username} readOnly/>
                    </div>
                    {
                        userInfo?.roomId && 
                        <div>
                            <div className="flex items-center gap-[7.5rem]">
                                <label htmlFor="hostel">Hostel</label>
                                <input type="text" id="hostel" value={rooms.filter((room)=>{return room._id===userInfo?.roomId})[0]?.hostel} readOnly/>
                            </div>
                            <div className="flex items-center gap-24">
                                <label htmlFor="roomNo" className="whitespace-nowrap">Room No.</label>
                                <input type="text" id="roomNo" value={rooms.filter((room)=>{return room._id===userInfo?.roomId})[0]?.roomNo} readOnly/>
                            </div>
                        </div>
                    }
            
                    <button onClick={handleClick} className="bg-red-500 text-white max-w-sm w-full py-2 mt-4 rounded-2xl">Logout</button>
                </div>
            </div>
        );       
    }
    else if(id==='hostelStaff'){
        return(
            <div>
                <AccountNav role={id} />

                <div className="text-center max-w-lg mx-auto mb-20">
                    <div className="flex items-center gap-14">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={userInfo?.name} readOnly/>
                    </div>
                    <div className="flex items-center gap-14">
                        <label htmlFor="hostel" className="whitespace-nowrap">Hostel:</label>
                        <input type="text" id="hostel" value={userInfo?.hostel} readOnly/>
                    </div>
                    <div className="flex items-center gap-8">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={userInfo?.username} readOnly/>
                    </div>

                    <button onClick={handleClick} className="bg-red-500 text-white max-w-sm w-full py-2 mt-4 rounded-2xl">Logout</button>
                </div>
            </div>   
        );
    }
    else{
        return(
            <PageNotFound />
        );
    }
}

export default Account;