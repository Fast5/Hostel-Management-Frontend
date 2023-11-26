import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import StudentsContext from "../contexts/StudentsContext";

function AddStudent(){

    const {students, ready3, setReady3}=useContext(StudentsContext);

    useEffect(()=>{
        if(students.length===0){
            setReady3(false);
        }
        else{
            return;
        }
    }, [])


    if(students.length===0 && !ready3){
        return <Loader/>
    }

    // Must be used here as it is shown without pressing a button (unlike login)
    // useEffect(()=>{
    //     if(!students.length){
    //         fetch("http://localhost:5000/api/admin/allStudents", {
    //             method: 'GET',
    //             credentials: 'include'  
    //         })
    //         .then((response)=>{
    //             return response.json();
    //         })
    //         .then((data)=>{
    //             setReady(true);
    //             return setStudents(data);
    //         });
    //     }
    // }, []);

    // if(!ready){
    //     setTimeout(()=>{
    //     }, 1000);
    // }

    return(
        <div className="text-center">
            <AccountNav role="admin"/>
            
            <Link to={"/admin/addStudent/new"} className="text-white bg-red-500 py-2 px-4 rounded-full">
                <i className="fa-solid fa-plus"></i> Add Student
            </Link>

            {/* {!ready && <Loader />} */}

            {/* show students */}
            <div className="m-4">
                <div className="flex justify-evenly p-2">
                    <div>Name</div>
                    <div>Roll No</div>
                    <div>Username</div>
                </div>
                {students.length>0 ? students.map((student, index)=>{
                    return(
                        <Link to={`/admin/addStudent/${student._id}`} key={index} className="flex justify-evenly bg-gray-100 p-2 rounded-2xl m-2">
                            <div>
                                {student.name} 
                            </div>
                            <div>
                                {student.rollNo} 
                            </div>
                            <div>
                                {student.username}
                            </div>
                        </Link>
                    );
                }) : "No students added"}
            </div>
        </div>
    );
}

export default AddStudent;