import React, { useEffect, useState } from "react";
import RoomsContext from "./RoomsContext";

const RoomsState=(props)=>{
    
    const [rooms, setRooms]=useState([]);

    const [ready, setReady]=useState(false);

    useEffect(()=>{   //requrired when reloading 
        if(!rooms.length){
            fetch("http://localhost:5000/api/admin/allRooms", {
                method: 'GET',
                credentials: 'include'
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady(true);
                return setRooms(data);
            });
        }
    }, []);

    return(
        <RoomsContext.Provider value={{rooms, setRooms, ready, setReady}}>
            {props.children}
        </RoomsContext.Provider>
    );
}

export default RoomsState;