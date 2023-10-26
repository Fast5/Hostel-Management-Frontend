import React, { useEffect, useState } from "react";
import StudentsContext from "./StudentsContext";

const StudentsState=(props)=>{
    const [students, setStudents]=useState([]);

    const [ready, setReady]=useState(false);

    useEffect(()=>{  //requrired when reloading 
        if(!students.length){
            fetch("http://localhost:5000/api/admin/allStudents", {
                method: 'GET',
                credentials: 'include'  
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady(true);
                return setStudents(data);
            });
        }
    }, []);

    return(
        <StudentsContext.Provider value={{students, setStudents, ready, setReady}}>
            {props.children}
        </StudentsContext.Provider>
    );
}

export default StudentsState;