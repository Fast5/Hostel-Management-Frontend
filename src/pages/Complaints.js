import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import ComplaintContext from "../contexts/ComplaintContext";
import UserContext from "../contexts/UserContext";
import RoomsContext from "../contexts/RoomsContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function Complaints(){

    const {userInfo, ready1, setReady1}=useContext(UserContext);
    const {rooms, ready2, setReady2}=useContext(RoomsContext);
    const {complaints, ready5, setReady5}=useContext(ComplaintContext);

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
        }

        if(rooms.length===0){
            setReady2(false);
        }

        if(complaints.length===0){
            setReady5(false);
        }

    }, [userInfo, rooms.length, complaints.length]);

    if((!userInfo && !ready1) || (rooms.length===0 && !ready2) || (complaints.length===0 && !ready5)){
        return <Loader />
    }

    if(userInfo?.role!=='hostelStaff'){
        return <Loader />
    }

    function convertToTitleCase(text) {
        // Split the text into words
        let words = text.split(/(?=[A-Z])|_/);
        
        // Capitalize the first letter of each word
        let titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        
        // Join the words back together
        let titleCaseText = titleCaseWords.join(' ');
        
        return titleCaseText+" Related";
    }

    let reqRooms=rooms.filter((room)=>{return room.hostel===userInfo.hostel});
    // console.log(reqRooms);
    reqRooms=reqRooms.map(room=>room._id);
    // setReqComplaints(complaints.filter((complaint)=>{return userInfo.complaints.includes(complaint._id)}));

    let reqComplaints=complaints.filter((complaint)=>{return reqRooms.includes(complaint.roomId)});
    reqComplaints=reqComplaints.filter((complaint)=>{return complaint.status!=='resolved'});

    return(
        <div>
            <AccountNav role="hostelStaff" />

            <div className="text-center max-w-lg mx-auto m-4">
                {reqComplaints?.length>0 ? reqComplaints?.map((complaint, index)=>{
                    return(
                        <Link key={index} to={`/hostelStaff/viewComplaint/${complaint?._id}`}>
                            <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                <div className="flex justify-center gap-4">
                                    <div className="flex gap-2 items-center justify-center">
                                        <label>Complaint Type: </label>
                                        <h1>{convertToTitleCase(complaint?.type)}</h1>
                                    </div>
                                    <div className="flex gap-2 items-center justify-center">
                                        <label>Status: </label>
                                        <h1>{complaint?.status}</h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                }) 
                : "No record of complaints"}
            </div>
        </div>
    );
}

export default Complaints;

