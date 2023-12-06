import React, { useContext, useEffect, useState } from "react";
import RoomsContext from "./RoomsContext";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";

const RoomsState = (props) => {

    const navigate=useNavigate();

    const [rooms, setRooms] = useState([]);
    const [ready2, setReady2] = useState(true);
    // const UserC = useContext(UserContext);
    // const token = UserC.token;

    useEffect(() => {
    
        if(ready2){
            return;
        }
        else{
            fetch(`${process.env.REACT_APP_URL}/allRooms`, {
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
                if(data.error){
                    navigate("/PageNotFound");
                    return;
                }
                setRooms(data);
                return;
            });
        }
    }, [ready2]);
    
    // console.log(ready2);
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
