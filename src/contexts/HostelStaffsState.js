import React, { useEffect, useState } from "react";
import HostelStaffsContext from "./HostelStaffsContext";
import { useNavigate } from "react-router-dom";

const HostelStaffsState=(props)=>{

    const navigate=useNavigate();

    const [hostelStaffs, setHostelStaffs]=useState([]);
    const [ready4, setReady4]=useState(true);

    useEffect(()=>{
        if(ready4){
            return;
        }
        else{
            fetch(`${process.env.REACT_APP_URL}/api/admin/allHostelStaffs`, {
                method: 'GET',
                credentials: 'include'  
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady4(true);
                if(data.error){
                    navigate("/PageNotFound");
                }
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