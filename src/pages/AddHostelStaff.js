import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import HostelStaffsContext from "../contexts/HostelStaffsContext";
import Loader from "../components/Loader";

function AddHostelStaff(){

    const {hostelStaffs, ready4, setReady4}=useContext(HostelStaffsContext);

    useEffect(()=>{
        if(hostelStaffs.length===0){
            setReady4(false);
            return;
        }
        else{
            return;
        }
    }, [])


    if(hostelStaffs.length===0 && !ready4){
        return <Loader/>
    }

    // useEffect(()=>{
    //     if(!hostelStaffs.length){
    //         fetch("http://localhost:5000/api/admin/allHostelStaffs", {
    //             method: 'GET',
    //             credentials: 'include'
    //         })
    //         .then((response)=>{
    //             return response.json();
    //         })
    //         .then((data)=>{
    //             setReady(true);
    //             return setHostelStaffs(data);
    //         });
    //     }
    // }, []);

    return(
        <div className="text-center">
            <AccountNav role="admin"/>

            <Link to={"/admin/addHostelStaff/new"} className="text-white bg-red-500 py-2 px-4 rounded-full">
                <i className="fa-solid fa-plus"></i> Add Hostel Staff
            </Link>

            {/* {!ready && <Loader />} */}

            <div className="m-4">
                <div className="flex justify-evenly px-4 py-2">
                    <div>Name</div>
                    <div>Hostel</div>
                    <div>Username</div>
                </div>
                {hostelStaffs.length>0 ? hostelStaffs.map((hostelStaff, index)=>{
                    return(
                        <Link to={`/admin/addHostelStaff/${hostelStaff._id}`} key={index} className="flex justify-evenly bg-gray-100 p-2 rounded-2xl m-2">
                            <div>
                                {hostelStaff.name} 
                            </div>
                            <div>
                                {hostelStaff.hostel} 
                            </div>
                            <div>
                                {hostelStaff.username}
                            </div>
                        </Link>
                    );
                }) : "No staff added"}
            </div>
        </div>
    );
}

export default AddHostelStaff;