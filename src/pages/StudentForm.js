import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import StudentsContext from "../contexts/StudentsContext";
import Loader from "../components/Loader";
// import PageNotFound from "../components/PageNotFound";

function StudentForm(){
    const {id}=useParams();  //for editng and deleting room with particular id

    const [studentInfo, setStudentInfo]=useState({name: "", rollNo: "", phoneNo: "", guardianName: "", guardianPhoneNo: "", username: "", password: ""});

    const [redirect, setRedirect]=useState(false);

    const {students, setStudents, ready}=useContext(StudentsContext);

    useEffect(()=>{
        if(id==='new'){
            return;
        }

        if(ready){
            const student=students.filter((student)=>{return student._id===id});
            return setStudentInfo(student[0]);
        }

    }, [ready]);

    if(!ready && id!=='new'){
        return <Navigate to={"/admin/addStudent"}/>;
    }

    const handleChange=(event)=>{
        setStudentInfo({...studentInfo, [event.target.name]: event.target.value});
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();

        if(id==='new'){
            const response=await fetch("http://localhost:5000/api/admin/addStudent", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentInfo)
            });

            const res=await response.json();
                
            if(response.ok){
                alert(res.success);
                setStudents(res.students);
                setRedirect(true);
            }
            else{
                alert(res.error);
            }
        }
        else{  //for edit
            const response=await fetch("http://localhost:5000/api/admin/editStudent", {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentInfo)
            });

            const res=await response.json();
                
            if(response.ok){
                alert(res.success);
                setStudents(res.students);
                setRedirect(true);
            }
            else{
                alert(res.error);
            }
        }
    }
    
    //for deleting 
    const handleClick=async()=>{
        const response=await fetch("http://localhost:5000/api/admin/deleteStudent", {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
        });

        const res=await response.json();
            
        if(response.ok){
            alert(res.success);
            setStudents(res.students);
            setRedirect(true);
        }
        else{
            alert(res.error);
        }
    }

    if(redirect){
        return <Navigate to={"/admin/addStudent"}/>
    }

    return(
        <div className="flex flex-col items-center mt-4 mb-12">
            <form onSubmit={handleSubmit} className="w-2/4 mb-3">

                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={studentInfo.name} onChange={handleChange} required autoComplete="off" className="inline" />
                
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="rollNo">Roll Number</label>
                        <input type="text" id="rollNo" name="rollNo" value={studentInfo.rollNo} onChange={handleChange}  required autoComplete="off" />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="phoneNo">Personal Mobile Number</label>
                        <input type="tel" id="phoneNo" name="phoneNo" value={studentInfo.phoneNo} onChange={handleChange} required autoComplete="off" pattern="[0-9]{10}" title="valid 10 digit number" className="w-full border my-1 py-2 px-3 rounded-2xl"/>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="guardianName">Guardian Name</label>
                        <input type="text" id="guardianName" name="guardianName" value={studentInfo.guardianName} onChange={handleChange} required autoComplete="off" />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="guardianPhoneNo">Guardian Mobile Number</label>
                        <input type="tel" id="guardianPhoneNo" name="guardianPhoneNo" value={studentInfo.guardianPhoneNo} onChange={handleChange} required autoComplete="off" pattern="[0-9]{10}" title="valid 10 digit number" className="w-full border my-1 py-2 px-3 rounded-2xl"/>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2/4">
                        <label htmlFor="username">Username</label>
                        <input type="email" id="username" name="username" value={studentInfo.username} onChange={handleChange} required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id" />
                    </div>
                    <div className="w-2/4">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={studentInfo.password} onChange={handleChange} required pattern=".{8,}" title="Eight or more characters" />
                    </div>
                </div>

                <button type="submit" className="text-white mt-4 bg-red-500 py-2 px-4 w-full rounded-full">{id==='new' ? "Add student" : 'Edit student'}</button>
            </form>
            {id!=='new' && <button onClick={handleClick} className="text-white bg-red-500 py-2 px-4 w-2/4 mb-3 rounded-full">Delete student</button>}
            <Link to={"/admin/addStudent"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4 mb-10">
                Cancel
            </Link>
        </div>
    );
}

export default StudentForm;