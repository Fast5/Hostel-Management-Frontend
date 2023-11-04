import React, { useState } from "react";
import HostelStaffsContext from "./HostelStaffsContext";

const HostelStaffsState=(props)=>{

    const [hostelStaffs, setHostelStaffs]=useState([]);
    const [ready, setReady]=useState(false);

    return(
        <HostelStaffsContext.Provider value={{hostelStaffs, setHostelStaffs, ready, setReady}}>
            {props.children}
        </HostelStaffsContext.Provider>
    );
}

export default HostelStaffsState;