import React, { useEffect, useState } from "react";
import HostelStaffsContext from "./HostelStaffsContext";

const HostelStaffsState=(props)=>{

    const [hostelStaffs, setHostelStaffs]=useState([]);
    const [ready4, setReady4]=useState(true);

    useEffect(()=>{
        if(ready4){
            return;
        }
        else{
            fetch("http://localhost:5000/api/admin/allHostelStaffs", {
                method: 'GET',
                credentials: 'include'  
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady4(true);
                setHostelStaffs(data)
                return;
            });
        }
    }, [ready4]);

    return(
        <HostelStaffsContext.Provider value={{hostelStaffs, setHostelStaffs, ready4, setReady4}}>
            {props.children}
        </HostelStaffsContext.Provider>
    );
}

export default HostelStaffsState;