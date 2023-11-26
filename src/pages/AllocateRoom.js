import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import RoomsContext from "../contexts/RoomsContext";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";
import StudentsContext from "../contexts/StudentsContext";
import Loader from "../components/Loader";

function AllocateRoom(){
    const {userInfo, ready1, setReady1}=useContext(UserContext);
    const {rooms, ready2, setReady2}=useContext(RoomsContext);
    const {students, setStudents}=useContext(StudentsContext);  //for showing students if room is allocated
    

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
        }
        if(rooms.length===0){
            setReady2(false);
        }
    }, []);


    if(!userInfo || (rooms.length===0 && !ready2)){
        return <Loader />
    }

    const reqRooms=rooms.filter((room)=>{return room.hostel===userInfo.hostel;});
    // console.log(reqRooms);

    return(
        <div>
            <AccountNav role="hostelStaff" />

            <div className="text-center max-w-lg mx-auto">
                {reqRooms.length>0 ?  reqRooms.map((room, index)=>{
                    return(
                        <Link key={index} to={`/hostelStaff/allocateRoom/${room._id}`} className="">
                            <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                <div className="flex justify-center gap-4">
                                    <div className="flex gap-2 items-center justify-center">
                                        <label>Room No.: </label>
                                        <h1>{room.roomNo}</h1>
                                    </div>
                                    <div className="flex gap-2 items-center justify-center">
                                        <label>Accomodation Type: </label>
                                        <h1>{room.accomodationType}</h1>
                                    </div>
                                </div>
                                {room.occupants.length!==0 &&
                                    <div className="flex justify-center gap-4">
                                        Student1 and Student 2
                                    </div>
                                }
                            </div>
                        </Link>
                    );
                }) 
                : "No rooms created"}
            </div>
        </div>
    );
}

export default AllocateRoom;