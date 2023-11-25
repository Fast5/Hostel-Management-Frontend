import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import RoomsContext from "../contexts/RoomsContext";
import Loader from "../components/Loader";

function AddRoom(){
    //make sure to check if the user is admin or not using userContext->role==='admin'=>then only allow (left)
    
    const {rooms, setRooms, ready, setReady}=useContext(RoomsContext); 

    //Must be used here as it is shown without pressing a button (unlike login)
    // useEffect(()=>{
    //     fetch("http://localhost:5000/allRooms", {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //     .then((response)=>{
    //         return response.json();
    //     })
    //     .then((data)=>{
    //         setReady(true);
    //         return setRooms(data);
    //     });
    // }, []);

    if(!ready){
        setTimeout(()=>{
        }, 1000);
    }

    //delete last room
    const handleClick=async(hostel)=>{
        let roomIndex;
        for(let i=0; i<rooms.length; i++){
            if(rooms[i].hostel===hostel){
                roomIndex=i;
            }
        }

        const roomId=rooms[roomIndex]._id;

        const response=await fetch("http://localhost:5000/api/admin/deleteRoom", {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({roomId})
        });

        const res=await response.json();
            
        if(response.ok){
            alert(res.success);
            setRooms(res.rooms);
        }
        else{
            alert(res.error);
        }
    }
    
    let bh1Rooms=rooms.filter((room)=>{return room.hostel==='bh1'});
    let bh2Rooms=rooms.filter((room)=>{return room.hostel==='bh2'});
    let bh3Rooms=rooms.filter((room)=>{return room.hostel==='bh3'});

    return(
        <div className="text-center">
            <AccountNav role="admin"/>
            
            <Link to={"/admin/addRoom/new"} className="text-white bg-red-500 py-2 px-4 rounded-full">
                <i className="fa-solid fa-plus"></i> Add Room
            </Link>

            {/* {!ready && <Loader />} */}

            <div className="row m-4">
                <div className="col">
                    <h1 className="text-lg mb-2">BH-1</h1>
                    <div className="m-2">
                        {bh1Rooms.length>0 ?  bh1Rooms.map((room, index)=>{
                            return(
                                <Link key={index} to={`/admin/addRoom/${room._id}`}>
                                    <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Room No.: </label>
                                            <h1>{room.roomNo}</h1>
                                        </div>
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Accomodation Type: </label>
                                            <h1>{room.accomodationType}</h1>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) 
                        : "No rooms created"}

                        {bh1Rooms.length>0 && 
                            <div className="mb-14">
                                <button onClick={()=>{handleClick("bh1")}} className="bg-gray-600 text-white px-4 py-2 rounded-full"><i className="fa-solid fa-trash"></i> Delete Room</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="col">
                    <h1 className="text-lg mb-2">BH-2</h1>
                    <div className="m-2">
                        {bh2Rooms.length>0 ?  bh2Rooms.map((room, index)=>{
                            return(
                                <Link key={index} to={`/admin/addRoom/${room._id}`}>
                                    <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Room No.: </label>
                                            <h1>{room.roomNo}</h1>
                                        </div>
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Accomodation Type: </label>
                                            <h1>{room.accomodationType}</h1>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) 
                        : "No rooms created"}

                        {bh2Rooms.length>0 && 
                            <div className="mb-14">
                                <button onClick={()=>{handleClick("bh2")}} className="bg-gray-600 text-white px-4 py-2 rounded-full"><i className="fa-solid fa-trash"></i> Delete Room</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="col">
                    <h1 className="text-lg mb-2">BH-3</h1>
                    <div className="m-2">
                        {bh3Rooms.length>0 ?  bh3Rooms.map((room, index)=>{
                            return(
                                <Link key={index} to={`/admin/addRoom/${room._id}`}>
                                    <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Room No.: </label>
                                            <h1>{room.roomNo}</h1>
                                        </div>
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Accomodation Type: </label>
                                            <h1>{room.accomodationType}</h1>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) 
                        : "No rooms created"}

                        {bh3Rooms.length>0 && 
                            <div className="mb-14">
                                <button onClick={()=>{handleClick("bh3")}} className="bg-gray-600 text-white px-4 py-2 rounded-full"><i className="fa-solid fa-trash"></i> Delete Room</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    

}

export default AddRoom;