import React, { useEffect, useState } from "react";
import StudentsContext from "./StudentsContext";

const StudentsState=(props)=>{

    const [students, setStudents]=useState([]);
    const [ready3, setReady3]=useState(true);

    useEffect(()=>{
        if(ready3){
            return;
        }
        else{
            fetch(`${process.env.REACT_APP_URL}/allStudents`, {
                method: 'GET',
                credentials: 'include'  
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady3(true);
                setStudents(data);
                return;
            });
        }
    }, [ready3]);

    // useEffect(()=>{
    //     if(!students.length){
    //         fetch("http://localhost:5000/allStudents", {
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


    return(
        <StudentsContext.Provider value={{students, setStudents, ready3, setReady3}}>
            {props.children}
        </StudentsContext.Provider>
    );
}

export default StudentsState;