import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import StudentsContext from "../contexts/StudentsContext";
import RoomsContext from "../contexts/RoomsContext";
import ComplaintContext from "../contexts/ComplaintContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

//for hostel staff

function Complaint(){
    const {id}=useParams();

    const {rooms, ready2, setReady2}=useContext(RoomsContext);
    const {students, ready3, setReady3}=useContext(StudentsContext);
    const {complaints, setComplaints, ready5, setReady5}=useContext(ComplaintContext);

    const [status, setStatus]=useState('');
    const [redirect, setRedirect]=useState(false);

    useEffect(()=>{
        if(rooms.length===0){
            setReady2(false);
        }

        if(students.length===0){
            setReady3(false);
        }

        if(complaints.length===0){
            setReady5(false); 
        }
        else{
            setStatus(complaints.filter((complaint)=>{return complaint._id===id})[0].status);
        }
    }, [students.length, rooms.length, complaints.length]);


    if((rooms.length===0 && !ready2) || (students.length===0 && !ready3) || (complaints.length===0 && !ready5)){
        return <Loader />
    }

    const reqComplaint=complaints.filter((complaint)=>{return complaint?._id===id})[0];

    const reqStudent=students.filter((student)=>{return student?._id===reqComplaint?.studentId})[0];

    const reqRoom=rooms.filter((room)=>{return room?._id===reqComplaint?.roomId})[0];

    const handleSubmit=async(event)=>{
        event.preventDefault();

        const response=await fetch(`${process.env.REACT_APP_URL}/editComplaint`,{
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({_id: id, status})
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

    if(redirect){
        return <Navigate to={"/hostelStaff/viewComplaints"}/>;
    }

    return(
        <div className="flex flex-col items-center mt-4 mb-12">
            <form onSubmit={handleSubmit} className="w-2/4 mb-3">
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="name">Complainant Name</label>
                        <input type="text" id="name" value={reqStudent?.name} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="phoneNo">Contact No.</label>
                        <input type="tel" id="phoneNo" name="phoneNo" value={reqComplaint?.phoneNo} required autoComplete="off" pattern="[0-9]{10}" title="valid 10 digit number" className="w-full border my-1 py-2 px-3 rounded-2xl" readOnly />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="username">Username</label>
                        <input type="email" id="username" name="username" value={reqStudent?.username} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="hostel">Hostel</label>
                        <input type="text" id="hostel" value={reqRoom?.hostel} readOnly />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="roomNo">Room No</label>
                        <input type="text" id="roomNo" value={reqRoom?.roomNo} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="type">Complaint Type</label>
                        <select name="type" id="type" value={reqComplaint?.type}  className="w-full border my-1 py-2 px-3 rounded-2xl" disabled>
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
                    <textarea name="details" id="details" value={reqComplaint?.details}  cols="60" rows="4" className="w-full border my-1 py-2 px-3 rounded-2xl" readOnly></textarea>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="dateTime">Complaint Date and Time</label>
                        <input type="datetime-local" name="dateTime" id="dateTime" value={reqComplaint?.dateTime} className="w-full border my-1 py-2 px-3 rounded-2xl" readOnly/>
                    </div>
                    <div className="w-2/4">
                        <p><label htmlFor="status">Complaint Status</label></p>
                            <select name="status" id="status" value={status} onChange={(event)=>{setStatus(event.target.value)}} className="w-full border my-1 py-2 px-3 rounded-2xl" disabled={complaints.filter((complaint)=>{return complaint?._id===id})[0]?.status==='inProgress'}> 
                                <option value="open">Open</option>
                                <option value="inProgress">In-Progress</option>
                            </select>
                    </div>
                </div>

                {/* As complaint is not yet updated. */}
                {complaints.filter((complaint)=>{return complaint?._id===id})[0]?.status==='open' && 
                    <button type="submit" className="text-white mt-4 bg-red-500 py-2 px-4 w-full rounded-full">Update Status</button>
                }
            </form>
            <Link to={"/hostelStaff/viewComplaints"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4 mb-10">
                Cancel
            </Link>
        </div>
    );
}

export default Complaint;