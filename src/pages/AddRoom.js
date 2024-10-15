import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import RoomsContext from "../contexts/RoomsContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import UserContext from "../contexts/UserContext";
import PageNotFound from "../components/PageNotFound";

function AddRoom(){
    //make sure to check if the user is admin or not using userContext->role==='admin'=>then only allow (left)
    const {userInfo}=useContext(UserContext);
    const {rooms, setRooms, ready2, setReady2}=useContext(RoomsContext); 

    useEffect(()=>{
        if(rooms.length===0){
            setReady2(false);
        }
    }, [rooms.length])
    
    if((rooms.length===0 && !ready2) || !userInfo){
        return <Loader />
    }

    if(userInfo?.role!=='admin'){  
        return <PageNotFound/>
    }

    //delete last room
    const handleClick=async(hostel)=>{
        let roomIndex;
        for(let i=0; i<rooms?.length; i++){
            if(rooms[i]?.hostel===hostel){
                roomIndex=i;
            }
        }

        const roomId=rooms[roomIndex]?._id;

        const response=await fetch(`${process.env.REACT_APP_URL}/api/admin/deleteRoom`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({roomId})
        });

        const res=await response.json();
            
        if(response.ok){
            toast.success(res.success, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRooms(res.rooms);
        }
        else{
            toast.error(res.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    
    let bh1Rooms=rooms.filter((room)=>{return room?.hostel==='bh1'});
    let bh2Rooms=rooms.filter((room)=>{return room?.hostel==='bh2'});
    let bh3Rooms=rooms.filter((room)=>{return room?.hostel==='bh3'});

    return(
        <div className="text-center">
            <AccountNav role="admin"/>
            
            <Link to={"/admin/addRoom/new"} className="text-white bg-red-500 py-2 px-4 rounded-full">
                <i className="fa-solid fa-plus"></i> Add Room
            </Link>

            <div className="row m-4">
                <div className="col">
                    <h1 className="text-lg mb-2">BH-1</h1>
                    <div className="m-2">
                        {bh1Rooms?.length>0 ? bh1Rooms.map((room, index)=>{
                            return(
                                <Link key={index} to={`/admin/addRoom/${room?._id}`}>
                                    <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Room No.: </label>
                                            <h1>{room?.roomNo}</h1>
                                        </div>
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Accomodation Type: </label>
                                            <h1>{room?.accomodationType}</h1>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) 
                        : "No rooms created"}

                        {bh1Rooms?.length>0 && 
                            <div className="mb-14">
                                <button onClick={()=>{handleClick("bh1")}} className="bg-gray-600 text-white px-4 py-2 rounded-full"><i className="fa-solid fa-trash"></i> Delete Room</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="col">
                    <h1 className="text-lg mb-2">BH-2</h1>
                    <div className="m-2">
                        {bh2Rooms?.length>0 ?  bh2Rooms.map((room, index)=>{
                            return(
                                <Link key={index} to={`/admin/addRoom/${room?._id}`}>
                                    <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Room No.: </label>
                                            <h1>{room?.roomNo}</h1>
                                        </div>
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Accomodation Type: </label>
                                            <h1>{room?.accomodationType}</h1>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) 
                        : "No rooms created"}

                        {bh2Rooms?.length>0 && 
                            <div className="mb-14">
                                <button onClick={()=>{handleClick("bh2")}} className="bg-gray-600 text-white px-4 py-2 rounded-full"><i className="fa-solid fa-trash"></i> Delete Room</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="col">
                    <h1 className="text-lg mb-2">BH-3</h1>
                    <div className="m-2">
                        {bh3Rooms?.length>0 ?  bh3Rooms.map((room, index)=>{
                            return(
                                <Link key={index} to={`/admin/addRoom/${room?._id}`}>
                                    <div className="bg-gray-100 p-2 rounded-2xl mb-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Room No.: </label>
                                            <h1>{room?.roomNo}</h1>
                                        </div>
                                        <div className="flex gap-2 items-center justify-center">
                                            <label>Accomodation Type: </label>
                                            <h1>{room?.accomodationType}</h1>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) 
                        : "No rooms created"}

                        {bh3Rooms?.length>0 && 
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