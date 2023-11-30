import React, { useEffect, useState } from "react";
import ComplaintContext from "./ComplaintContext";

const ComplaintState=(props)=>{

    const [complaints, setComplaints]=useState([]);
    const [ready5, setReady5]=useState(true);

    useEffect(()=>{
        if(ready5){
            return;
        }
        else{
            fetch("http://localhost:5000/allComplaints", {
                method: 'GET',
                credentials: "include"
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady5(true);
                setComplaints(data);
                return; 
            });
        }
    }, [ready5]);

    return(
        <ComplaintContext.Provider value={{complaints, setComplaints, ready5, setReady5}}>
            {props.children}
        </ComplaintContext.Provider>
    );
}

export default ComplaintState;