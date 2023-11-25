import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import RoomsContext from "../contexts/RoomsContext";
import StudentsContext from "../contexts/StudentsContext";

function AllocateRoomForm(){
    const {id}=useParams();

    const {rooms, setRooms, ready}=useContext(RoomsContext);
    const {students, setStudents}=useContext(StudentsContext);

    if(!ready){
        setTimeout(()=>{
        }, 1000);
    }

    const room=rooms.find((room)=>{return room._id===id});

    const reqStudents=students.filter((student)=>{return student.roomId===null;});

    const [roomInfo, setRoomInfo]=useState({roomNo: room.roomNo, hostel: room.hostel, accomodationType: room.accomodationType, accomodable: room.accomodable, occupants: room.occupants});

    const [student1, setStudent1]=useState(roomInfo.occupants[0]);
    const [student2, setStudent2]=useState(roomInfo.occupants[1]);

    const [redirect, setRedirect]=useState(false);
   
    //for dropdowns
    const reqStudents1=reqStudents.filter((student)=>{return student._id!==student2;});  
    const reqStudents2=reqStudents.filter((student)=>{return student._id!==student1;});
    
    const handleChange=(event)=>{
        if(event.target.name==='accomodable'){
            setRoomInfo({...roomInfo, accomodable: event.target.value==='true'});
        }
        else if(event.target.name==='addStudent1'){
            setStudent1(event.target.value);
        }
        else if(event.target.name==='addStudent2'){
            setStudent2(event.target.value);
        }
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        
        setRoomInfo({...roomInfo, occupants: roomInfo.occupants.push(student1)});

        if(student2){
            setRoomInfo({...roomInfo, occupants: roomInfo.occupants.push(student2)});
        }

        roomInfo.id=id;

        const response=await fetch("http://localhost:5000/api/hostelStaff/allocateRoom", {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roomInfo)
        });

        const res=await response.json();
        
        if(response.ok){
            alert(res.success);
            setRooms(res.rooms);
            setStudents(res.students);
            setRedirect(true);
        }
        else{
            alert(res.error);
        }

        if(redirect){
            return <Navigate to={"/hostelStaff/allocateRoom"}/>
        }
    }

    return( // to allocate rooms to student
        <div className="flex flex-col items-center mt-4 mb-12">
            <form onSubmit={handleSubmit} className="w-2/4 mb-3">
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="roomNo">Room Number</label>
                        <input type="text" id="roomNo" value={roomInfo.roomNo} readOnly />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="accomodationType">Accomodation Type</label>
                        <input type="text" id="accomodationType" value={roomInfo.accomodationType} readOnly />
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
                    room.accomodationType==='single' ? 
                    (
                        <div className="flex justify-center m-4">
                            <select name="addStudent1" value={student1} onChange={handleChange} required>
                                {room.occupants.length ? <option value={student1}>{students.filter((student)=>{return student._id===student1;})[0].rollNo}</option> : <option value="">Add Student</option>}
                                {reqStudents1.length>0 && reqStudents1.map((student, index)=>{
                                    return(
                                        <option key={index} value={student._id}>
                                            {student.rollNo}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 m-4">
                            <select name="addStudent1" value={student1} onChange={handleChange} required>
                                {room.occupants.length ? <option value={student1}>{students.filter((student)=>{return student._id===student1;})[0].rollNo}</option> : <option value="">Add Student1</option>}
                                {reqStudents1.length>0 && reqStudents1.map((student, index)=>{
                                        return(
                                            <option key={index} value={student._id}>
                                                {student.rollNo}
                                            </option>
                                        );
                                })}
                            </select>
                            <select name="addStudent2" value={student2} onChange={handleChange} required>
                                {room.occupants.length ? <option value={student2}>{students.filter((student)=>{return student._id===student2;})[0].rollNo}</option> : <option value="">Add Student2</option>}
                                {reqStudents2.length>0 && reqStudents2.map((student, index)=>{
                                        return(
                                            <option key={index} value={student._id}>
                                                {student.rollNo}
                                            </option>
                                        );
                                })}
                            </select>
                        </div>
                    )
                }

                <button type="submit" className="text-white bg-red-500 py-2 px-4 w-full rounded-full">Allocate Room</button>
            </form>
            <Link to={"/hostelStaff/allocateRoom"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4">
                Cancel
            </Link>
        </div>
    );
}

export default AllocateRoomForm;