import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import HostelStaffsContext from "../contexts/HostelStaffsContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import PageNotFound from "../components/PageNotFound";

function HostelStaffForm() {
    const {id} = useParams();

    const [hostelStaffInfo, setHostelStaffInfo] = useState({ name: "", hostel: "", username: "", password: "" });

    const [redirect, setRedirect]=useState(false);

    const {hostelStaffs, setHostelStaffs, ready4, setReady4}=useContext(HostelStaffsContext);

    useEffect(()=>{
        if(id==='new'){
            return;
        }
        else{
            if(hostelStaffs.length===0){
                setReady4(false);
            }
            else{
                setHostelStaffInfo(hostelStaffs.filter((hostelStaff)=>{return hostelStaff._id===id})[0]);   
            }
        }
    }, [id, hostelStaffs.length]);

    if(hostelStaffs.length===0 && !ready4){
        return <Loader />
    }


    if(id!=='new' && !hostelStaffInfo){  //if hostel id is changed and is not found
        return <PageNotFound /> 
    }
    // if(hostelStaffs.length===0 && !ready4 && id!=='new'){  //has to be checked
    //     return <Navigate to={"/admin/addHostelStaff"}/>
    // }

    const handleChange = (event) => {
        setHostelStaffInfo({ ...hostelStaffInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(id==='new'){
            const response=await fetch(`${process.env.REACT_APP_URL}/api/admin/addHostelStaff`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(hostelStaffInfo)
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
                setHostelStaffs(res.hostelStaffs);
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
        else{ //for edit
            const response=await fetch(`${process.env.REACT_APP_URL}/api/admin/editHostelStaff`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(hostelStaffInfo)
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
                setHostelStaffs(res.hostelStaffs);
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

    //for deleting
    const handleClick = async() => {
        const response=await fetch(`${process.env.REACT_APP_URL}/api/admin/deleteHostelStaff`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
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
            setHostelStaffs(res.hostelStaffs);
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
    };

    if(redirect){
        return <Navigate to={"/admin/addHostelStaff"}/>
    }

    return (
        <div className="flex flex-col items-center mt-4 mb-12">
            <form onSubmit={handleSubmit} className="w-2/4 mb-3">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={hostelStaffInfo?.name} onChange={handleChange} required autoComplete="off" className="inline" />

                <label htmlFor="username">Username</label>
                <input type="email" id="username" name="username" value={hostelStaffInfo?.username} onChange={handleChange} required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={hostelStaffInfo?.password} onChange={handleChange} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="must contain 8 or more characters consisting of atleast one cap, one small and one number." />
                
                <fieldset className="mt-2">
                    <legend className="text-lg">Hostel:</legend>

                    {id === "new" ? (
                        <div className="flex gap-16">
                            <div className="flex gap-1">
                                <input type="radio" name="hostel" onChange={handleChange} value="bh1" id="bh1" required />
                                <label htmlFor="bh1">BH-1</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" name="hostel" onChange={handleChange} value="bh2" id="bh2" />
                                <label htmlFor="bh2">BH-2</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" name="hostel" onChange={handleChange} value="bh3" id="bh3" />
                                <label htmlFor="bh3">BH-3</label>
                            </div>
                        </div>
                    ) : (
                        
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <input type="radio" name="hostel" value="bh1" onChange={handleChange} checked={hostelStaffInfo?.hostel==='bh1'} id="bh1" />
                                <label htmlFor="bh1">BH-1</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" name="hostel" value="bh2" onChange={handleChange} checked={hostelStaffInfo?.hostel==='bh2'} id="bh2" />
                                <label htmlFor="bh2">BH-2</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" name="hostel" value="bh3" onChange={handleChange} checked={hostelStaffInfo?.hostel==='bh3'} id="bh3" />
                                <label htmlFor="bh3">BH-3</label>
                            </div>
                        </div> 
                        
                    )}
                </fieldset>

                <button type="submit" className="text-white mt-4 bg-red-500 py-2 px-4 w-full rounded-full">
                    {id === "new" ? "Add Staff" : "Edit Staff"}
                </button>
            </form>
            {id !== "new" && (
                <button onClick={handleClick} className="text-white bg-red-500 py-2 px-4 w-2/4 mb-3 rounded-full">
                    Delete staff
                </button>
            )}
            <Link to={"/admin/addHostelStaff"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4 mb-10">
                Cancel
            </Link>
        </div>
    );
}

export default HostelStaffForm;
