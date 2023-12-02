import React, { useContext, useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Loader from "../components/Loader";
import ComplaintContext from "../contexts/ComplaintContext";

function AddComplaint(){

    const {userInfo, ready1, setReady1}=useContext(UserContext);
    const {complaints, ready5, setReady5}=useContext(ComplaintContext);

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
        }
 
        if(complaints.length===0){
            setReady5(false);
        }
    }, [userInfo, complaints.length]);


    if((!userInfo && !ready1) || (complaints.length===0 && !ready5)){
        return <Loader/>
    }

    const reqComplaints=complaints?.filter((complaint)=>{return userInfo?.complaints.includes(complaint?._id)});
        
    function convertToTitleCase(text) {
        // Split the text into words
        let words = text.split(/(?=[A-Z])|_/);
        
        // Capitalize the first letter of each word
        let titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        
        // Join the words back together
        let titleCaseText = titleCaseWords.join(' ');
        
        return titleCaseText+" Related";
    }

    return(
        <div className="text-center">
            <AccountNav role="student"/>

            {
                userInfo?.roomId && (
                    <Link to={"/student/addComplaint/new"} className="text-white bg-red-500 py-2 px-4 rounded-full">
                        <i className="fa-solid fa-plus"></i> Add Complaint
                    </Link>
                )
            }

            {/* show previous complaints */}
            <div className="text-center max-w-lg mx-auto mt-4 mb-20">
                {reqComplaints.length>0 ? reqComplaints.map((complaint, index)=>{
                    return(
                        <Link key={index} to={`/student/addComplaint/${complaint?._id}`}>
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

export default AddComplaint;