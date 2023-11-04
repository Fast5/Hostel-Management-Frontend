import React, { useEffect, useState } from "react";
import StudentsContext from "./StudentsContext";

const StudentsState=(props)=>{

    const [students, setStudents]=useState([]);
    const [ready, setReady]=useState(false);


    return(
        <StudentsContext.Provider value={{students, setStudents, ready, setReady}}>
            {props.children}
        </StudentsContext.Provider>
    );
}

export default StudentsState;