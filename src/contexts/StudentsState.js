import React, { useEffect, useState } from "react";
import StudentsContext from "./StudentsContext";
import { useNavigate } from "react-router-dom";

const StudentsState=(props)=>{

    const navigate=useNavigate();

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
                if(data.error){
                    navigate("/PageNotFound");
                }
                setStudents(data);
                return;
            });
        }
    }, [ready3]);

    return(
        <StudentsContext.Provider value={{students, setStudents, ready3, setReady3}}>
            {props.children}
        </StudentsContext.Provider>
    );
}

export default StudentsState;