import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import RoomsContext from "../contexts/RoomsContext";
import ComplaintContext from "../contexts/ComplaintContext";
import Loader from "../components/Loader";
import StudentsContext from "../contexts/StudentsContext";
import { toast } from "react-toastify";
import PageNotFound from "../components/PageNotFound";

//for student
function ComplaintForm(){
    const {id}=useParams();  //either new or complaint Id for viewing and marking resolved

    const [complaint, setComplaint]=useState({phoneNo: "", type: "", details: "", dateTime: getCurrentDateTimeIndia(), status: "open"});

    const [redirect, setRedirect]=useState(false);

    const {userInfo, setUserInfo, ready1, setReady1}=useContext(UserContext);
    const {rooms, ready2, setReady2}=useContext(RoomsContext);
    const {complaints, setComplaints, ready5, setReady5}=useContext(ComplaintContext);

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
        }
        else{
            setComplaint({...complaint, phoneNo: userInfo.phoneNo});
        }

        if(rooms.length===0){
            setReady2(false);
        }

        if(id!=='new'){
            if(complaints.length===0){
                setReady5(false);
            }
            else{
                setComplaint(complaints.filter((complaint)=>{return complaint?._id===id})[0]);
            }
        }
    }, [userInfo, rooms.length, complaints.length, id])

    if((!userInfo && !ready1) || (rooms.length===0 && !ready2) || (complaints.length===0 && !ready5)){
        return <Loader />
    }

    if(userInfo?.role!=='student' && !redirect){
        return <PageNotFound/> 
    }

    if(id!=='new' && !complaint){  //if complaint id doesn't match 
        return <PageNotFound />
    }

    function getCurrentDateTimeIndia() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
  
        // Format: "YYYY-MM-DDThh:mm"
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    

    const handleChange=(event)=>{
        setComplaint({...complaint, [event.target.name]: event.target.value});
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();

        if(id==='new'){  //studentId added in Backend
            complaint.roomId=rooms.filter((room)=>{return room?._id===userInfo?.roomId})[0]._id;

            const response=await fetch(`${process.env.REACT_APP_URL}/api/student/registerComplaint`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(complaint)
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
                setUserInfo(res.userInfo);
                setComplaints(res.complaints);
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
        else{ //for viewing and changing status using complaint id
            // console.log(complaint);
            const response=await fetch(`${process.env.REACT_APP_URL}/editComplaint`,{
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(complaint)
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
                setComplaints(res.complaints);
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
    }

    if(redirect){
        return <Navigate to={"/student/addComplaint"}/>; //for student
    }

    return(
        <div className="flex flex-col items-center mt-4 mb-12">
            <form onSubmit={handleSubmit} className="w-2/4 mb-3">

                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="name">Complainant Name</label>
                        <input type="text" id="name" value={userInfo?.name} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="phoneNo">Contact No.</label>
                        <input type="tel" id="phoneNo" name="phoneNo" value={complaint?.phoneNo} onChange={handleChange} required autoComplete="off" pattern="[0-9]{10}" title="valid 10 digit number" className="w-full border my-1 py-2 px-3 rounded-2xl" readOnly={id!=='new'}/>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="username">Username</label>
                        <input type="email" id="username" name="username" value={userInfo?.username} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="hostel">Hostel</label>
                        <input type="text" id="hostel" value={rooms.filter((room)=>{return room?._id===userInfo?.roomId})[0]?.hostel} readOnly />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="roomNo">Room No</label>
                        <input type="text" id="roomNo" value={rooms.filter((room)=>{return room?._id===userInfo?.roomId})[0]?.roomNo} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="type">Complaint Type</label>
                        <select name="type" id="type" value={complaint?.type} onChange={handleChange} className="w-full border my-1 py-2 px-3 rounded-2xl" required disabled={id!=='new'}>
                            <option value="">Select</option>
                            <option value="airConditioner">Air Conditioner Repair</option>
                            <option value="ducts">Air Ducts Related</option>
                            <option value="civilAndInfra">Civil and Infrastructure Related</option>
                            <option value="electricity">Electricity Related</option>
                            <option value="furniture">Furniture Related</option>
                            <option value="plumbing">Plumbing Related</option>
                            <option value="ro">RO Water Purifier Related</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-4 m-2">
                    <label htmlFor="details" className="whitespace-nowrap">Complaint Details</label>
                    <textarea name="details" id="details" value={complaint?.details} onChange={handleChange} cols="60" rows="4" className="w-full border my-1 py-2 px-3 rounded-2xl" readOnly={id!=='new'}></textarea>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="dateTime">Complaint Date and Time</label>
                        <input type="datetime-local" name="dateTime" id="dateTime" value={complaint?.dateTime} className="w-full border my-1 py-2 px-3 rounded-2xl" readOnly/>
                    </div>
                    <div className="w-2/4">
                        <p><label htmlFor="status">Complaint Status</label></p>
                        {id==='new' ? 
                            (
                                <input type="text" name="status" id="status" value={complaint?.status} readOnly/>
                            ) 
                            : 
                            (   
                                <select name="status" id="status" value={complaint?.status} onChange={handleChange} className="w-full border my-1 py-2 px-3 rounded-2xl" disabled={complaints.filter((complaint)=>{return complaint?._id===id})[0]?.status==='resolved'}>
                                    {complaints.filter((complaint)=>{return complaint?._id===id})[0]?.status==='inProgress' ? 
                                        <option value="inProgress">In-Progress</option>
                                        :
                                        <option value="open">Open</option>
                                    }
                                    <option value="resolved">Resolved</option>
                                </select>
                            )
                        }
                    </div>
                </div>

                {complaints.filter((complaint)=>{return complaint?._id===id})[0]?.status!=='resolved' &&
                    <button type="submit" className="text-white mt-4 bg-red-500 py-2 px-4 w-full rounded-full">{id==='new' ? "Register Complaint" : "Update Status"}</button>
                }
            </form>
            <Link to={"/student/addComplaint"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4 mb-10">
                Cancel
            </Link>
        </div>
    );
}

export default ComplaintForm;