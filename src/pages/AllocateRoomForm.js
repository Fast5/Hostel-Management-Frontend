import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import RoomsContext from "../contexts/RoomsContext";
import StudentsContext from "../contexts/StudentsContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import PageNotFound from "../components/PageNotFound";
import UserContext from "../contexts/UserContext";

function AllocateRoomForm(){
    const {id}=useParams();

    const [roomInfo, setRoomInfo]=useState({roomNo: '', hostel: '', accomodationType: '', occupants: []});
    const [student1, setStudent1]=useState('');
    const [student2, setStudent2]=useState('');
    
    const [redirect, setRedirect]=useState(false);

    const {userInfo}=useContext(UserContext);
    const {rooms, setRooms, ready2, setReady2}=useContext(RoomsContext);
    const {students, setStudents, ready3, setReady3}=useContext(StudentsContext);

    useEffect(()=>{
        if(rooms.length===0){
            setReady2(false);
        }
        else{
            setRoomInfo(rooms.filter((room)=>{return room._id===id})[0]);
            setStudent1(rooms.filter((room)=>{return room._id===id})[0]?.occupants[0]);
            setStudent2(rooms.filter((room)=>{return room._id===id})[0]?.occupants[1]);
        }

        if(students.length===0){
            setReady3(false);
        }        
    }, [rooms.length, students.length]);

    if((rooms.length===0 && !ready2) || (students.length===0 && !ready3)){
        return <Loader />
    }

    if(userInfo?.role!=='hostelStaff'){
        return <PageNotFound />
    }

    if(!roomInfo){
        return <PageNotFound />
    }

    const reqStudents=students.filter((student)=>{return student?.roomId===id || student?.roomId===null;});
   
    //for dropdowns
    const reqStudents1=reqStudents.filter((student)=>{return student?._id!==student2;});  
    const reqStudents2=reqStudents.filter((student)=>{return student?._id!==student1;});
    
    const handleChange=(event)=>{
        // if(event.target.name==='accomodable'){
        //     setRoomInfo({...roomInfo, accomodable: event.target.value==='true'});
        // }
        if(event.target.name==='addStudent1'){
            setStudent1(event.target.value);
        }
        else if(event.target.name==='addStudent2'){
            setStudent2(event.target.value);
        }
        
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        
        if(roomInfo.occupants.length!==0){
            setRoomInfo({...roomInfo, occupants: roomInfo.occupants.length=0});
        }
        
        setRoomInfo({...roomInfo, occupants: roomInfo.occupants.push(student1)});
        
        if(student2){
            setRoomInfo({...roomInfo, occupants: roomInfo.occupants.push(student2)});
        }

        roomInfo.id=id;

        const response=await fetch(`${process.env.REACT_APP_URL}/api/hostelStaff/allocateRoom`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roomInfo)
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
            setRooms(res.rooms);
            setStudents(res.students);
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

    const handleClick=async()=>{
        const response=await fetch(`${process.env.REACT_APP_URL}/api/hostelStaff/deallocateRoom`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
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
            setRooms(res.rooms);
            setStudents(res.students);
            setRedirect(true);
        }
        else{
            toast.success(res.error, {
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
        return <Navigate to={"/hostelStaff/allocateRoom"}/>
    }

    return( // to allocate rooms to student
        <div className="flex flex-col items-center mt-20">
            <form onSubmit={handleSubmit} className="w-2/4 mb-3">
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="roomNo">Room Number</label>
                        <input type="text" id="roomNo" value={roomInfo?.roomNo} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="accomodationType">Accomodation Type</label>
                        <input type="text" id="accomodationType" value={roomInfo?.accomodationType} readOnly />
                    </div>
                </div>    

                {/* <fieldset>
                    <legend className="text-base text-[#212529]">Accomodable</legend>
                    <div className="flex gap-4">
                        <div className="flex gap-1">
                            <input type="radio" name="accomodable" id="yes" onChange={handleChange} value={true} checked={roomInfo.accomodable===true} />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" name="accomodable" id="no" onChange={handleChange} value={false} checked={roomInfo.accomodable===false} />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </fieldset>     */}

                {/* accomodavble ke according karna baaki hai */}

                {
                    roomInfo.accomodationType==='single' ? 
                    (
                        <div className="flex justify-center m-4">
                            <select name="addStudent1" value={student1} onChange={handleChange} className="w-full border my-1 py-2 px-3 rounded-2xl" required>
                                {roomInfo?.occupants.length===0 && <option value="">Add Student</option>}
                                {/* {roomInfo.occupants.length && <option value={student1}>{students.find((student)=>{return student._id===student1;})?.rollNo} </option>} */}
                                {reqStudents1.length>0 && reqStudents1.map((student, index)=>{
                                    return(
                                        <option key={index} value={student?._id}>
                                            {student?.rollNo}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 m-4">
                            <select name="addStudent1" value={student1} onChange={handleChange} className="w-full border my-1 py-2 px-3 rounded-2xl" required>
                                {roomInfo?.occupants.length===0 && <option value="">Add Student1</option>}
                                {reqStudents1.length>0 && reqStudents1.map((student, index)=>{
                                    return(
                                        <option key={index} value={student?._id}>
                                            {student?.rollNo}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="addStudent2" value={student2} onChange={handleChange} className="w-full border my-1 py-2 px-3 rounded-2xl" required>
                                {roomInfo?.occupants.length===0 && <option value="">Add Student2</option>}
                                {reqStudents2.length>0 && reqStudents2.map((student, index)=>{
                                    return(
                                        <option key={index} value={student?._id}>
                                            {student?.rollNo}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    )
                }

                <button type="submit" className="text-white bg-red-500 py-2 px-4 w-full rounded-full">Allocate Room</button>
            </form>
            {rooms.filter((room)=>{return room._id===id})[0]?.occupants.length>0 && 
                <button onClick={handleClick} className="text-white bg-red-500 py-2 px-4 mb-3 rounded-full w-2/4">Deallocate Room</button> 
            }
            <Link to={"/hostelStaff/allocateRoom"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4">
                Cancel
            </Link>
        </div>
    );
}

export default AllocateRoomForm;