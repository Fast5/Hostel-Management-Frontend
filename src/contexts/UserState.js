import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserState=(props)=>{
    const [userInfo, setUserInfo]=useState(null);

    const [ready, setReady]=useState(false);

    useEffect(()=>{
        if(!userInfo){
            fetch("http://localhost:5000/profile", {
                method: 'GET',
                credentials: "include"
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady(true);
                return setUserInfo(data);
            })
        }
    }, []);

    return(
        <UserContext.Provider value={{userInfo, setUserInfo, ready}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;