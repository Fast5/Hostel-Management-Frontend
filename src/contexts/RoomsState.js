import React, { useContext, useEffect, useState } from "react";
import RoomsContext from "./RoomsContext";

const RoomsState=(props)=>{
    
    const [rooms, setRooms]=useState([]);
    const [ready, setReady]=useState(false);

    return(
        <RoomsContext.Provider value={{rooms, setRooms, ready, setReady}}>
            {props.children}
        </RoomsContext.Provider>
    );
}

export default RoomsState;