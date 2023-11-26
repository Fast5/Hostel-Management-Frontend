import React, { useContext, useEffect, useState } from "react";
import RoomsContext from "./RoomsContext";
import UserContext from "./UserContext";

const RoomsState = (props) => {
    const [rooms, setRooms] = useState([]);
    const [ready2, setReady2] = useState(true);
    // const UserC = useContext(UserContext);
    // const token = UserC.token;

    useEffect(() => {
        // console.log("ROOM *** token", token);
        if(ready2){
            return;
        }
        else{
            fetch("http://localhost:5000/allRooms", {
                method: "GET",
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
                credentials: "include",
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setReady2(true);
                setRooms(data);
                return;
            });
        }
    }, [ready2]);

    // const something = async()=>{
    //     console.log("ROOM *** token", token);
    //     const res = await axios.get("http://localhost:5000/allRooms", {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     })
    //     console.log('res in rooms:', res);
    //     setRooms(res.data);
    // }
    // useEffect(() => {
    //     something();

    // }, [token]);

    return <RoomsContext.Provider value={{ rooms, setRooms, ready2, setReady2}}>{props.children}</RoomsContext.Provider>;
};

export default RoomsState;
