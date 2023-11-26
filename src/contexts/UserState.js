import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserState=(props)=>{
    const [userInfo, setUserInfo]=useState(null);
    const [ready1, setReady1]=useState(true);

    useEffect(()=>{
        if(ready1){
            return;
        }
        else{
            fetch("http://localhost:5000/profile", {
                method: 'GET',
                credentials: "include"
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setReady1(true);
                setUserInfo(data);
                return;
            })
        }
    }, [ready1]);

    // useEffect(()=>{
    //     if(!userInfo){
    //         fetch("http://localhost:5000/profile", {
    //             method: 'GET',
    //             credentials: "include"
    //         })
    //         .then((response)=>{
    //             return response.json();
    //         })
    //         .then((data)=>{
    //             setReady(true);
    //             return setUserInfo(data);
    //         })
    //     }
    // }, [token]);

    return(
        <UserContext.Provider value={{userInfo, setUserInfo, ready1, setReady1}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;