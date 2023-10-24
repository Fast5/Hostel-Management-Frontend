import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import RoomsContext from "../contexts/RoomsContext";
import Loader from "../components/Loader";

function RoomForm(){
    const {id}=useParams();  //for editing (only accomodationtype) particular room

    const [roomInfo, setRoomInfo]=useState({roomNo: "", hostel: "", accomodationType: ""});  

    const [redirect, setRedirect]=useState(false);

    const {rooms, setRooms, ready}=useContext(RoomsContext);   //reload required (solved by setRooms method)
    
    useEffect(()=>{
        if(id==='new'){
            return;
        }

        if(ready){
            const editRoom=rooms.filter((room)=>{return room._id===id});
            return setRoomInfo(editRoom[0]);
        }

    }, [ready]);

    if(!ready){
        return <Loader />
    }

    let bh1Rooms=0, bh2Rooms=0, bh3Rooms=0;
    for(let i=0; i<rooms.length; i++){
        if(rooms[i].hostel==='bh1'){
            bh1Rooms++;
        }
        else if(rooms[i].hostel==='bh2'){
            bh2Rooms++;
        }
        else{
            bh3Rooms++;
        }
    }

    const handleChange=(event)=>{                    //for dynamically providing the room no.
        if(event.target.name==='hostel'){
            if(event.target.value==='bh1'){
                setRoomInfo({...roomInfo, roomNo: bh1Rooms+1, hostel: "bh1"});
            }
            if(event.target.value==='bh2'){
                setRoomInfo({...roomInfo, roomNo: bh2Rooms+1, hostel: "bh2"});
            }
            if(event.target.value==='bh3'){
                setRoomInfo({...roomInfo, roomNo: bh3Rooms+1, hostel: "bh3"});
            }
        }   
        else{
            setRoomInfo({...roomInfo, [event.target.name]: event.target.value});
        }
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        
        //add a room
        if(id==='new'){ 
            const response=await fetch("http://localhost:5000/api/admin/addRoom", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomInfo)
            });
    
            const res=await response.json();
                
            if(response.ok){
                alert(res.success);
                setRooms(res.rooms);
                setRedirect(true);
            }
            else{
                alert(res.error);
            }
        }
        else{  //edit a room with id===room._id
            const response=await fetch("http://localhost:5000/api/admin/editRoom", {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomInfo)
            });

            const res=await response.json();
                
            if(response.ok){
                alert(res.success);
                setRooms(res.rooms);
                setRedirect(true);
            }
            else{
                alert(res.error);
            }
        }
    }


    if(redirect){
        return <Navigate to={"/admin/addRoom"}/>
    }

    return(
        <div className="flex flex-col items-center m-12 pb-4"> 
            <form onSubmit={handleSubmit} className="flex flex-col justify-center mb-4">
                <div className="border-2 border-amber-500 rounded-2xl my-4">
                    <div className="flex w-[36rem]">
                        <div className="py-3 px-4 w-2/4">
                            <fieldset>
                                <legend>Hostel:</legend>
                                
                                {id==='new' ?
                                    <div className="flex justify-between">
                                        <div className="flex gap-1">
                                            <input type="radio" name="hostel" onChange={handleChange} value="bh1" id="bh1" required />
                                            <label htmlFor="bh1">BH-1</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input type="radio" name="hostel" onChange={handleChange} value="bh2" id="bh2" />
                                            <label htmlFor="bh2">BH-2</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input type="radio" name="hostel" onChange={handleChange} value="bh3" id="bh3" />
                                            <label htmlFor="bh3">BH-3</label>
                                        </div>
                                    </div>
                                 :
                                    <div className="flex justify-between">
                                        <div className="flex gap-1">
                                            <input type="radio" name="hostel" value="bh1" checked={roomInfo.hostel==='bh1'} id="bh1" disabled />
                                            <label htmlFor="bh1">BH-1</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input type="radio" name="hostel" value="bh2" checked={roomInfo.hostel==='bh2'} id="bh2" disabled/>
                                            <label htmlFor="bh2">BH-2</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input type="radio" name="hostel" value="bh3" checked={roomInfo.hostel==='bh3'} id="bh3" disabled/>
                                            <label htmlFor="bh3">BH-3</label>
                                        </div>
                                    </div>
                                }
                            </fieldset>
                        </div>
                        <div className="py-3 px-4 border-l-2 border-amber-500">
                            <fieldset>
                                <legend>Accomodation Type:</legend>

                                <div className="flex gap-5">
                                    <div className="flex gap-1">
                                        <input type="radio" name="accomodationType" onChange={handleChange} value="double" checked={roomInfo.accomodationType==='double'} id="double" required/>
                                        <label htmlFor="double">Double</label>
                                    </div>
                                    <div className="flex gap-1">
                                        <input type="radio" name="accomodationType" onChange={handleChange} value="single" checked={roomInfo.accomodationType==='single'} id="single" />
                                        <label htmlFor="single">Single</label>
                                    </div>
                                </div>
                            </fieldset>                        
                        </div>
                    </div>
                    <div className="flex items-center py-3 px-4 border-t-2 border-amber-500">
                        <label htmlFor="roomNo" className="w-1/2">Room Number:</label>
                        <input type="number" name="roomNo" value={roomInfo.roomNo} id="roomNo" disabled />               
                    </div>
                </div>

                <button type="submit" className="text-white bg-red-500 py-2 px-4 rounded-full">{id==='new' ? "Add room" : 'Edit room'}</button>
            </form>
            <Link to={"/admin/addRoom"} className="text-white text-center bg-gray-500 py-2 px-4 rounded-full w-2/4">
                Cancel
            </Link>
        </div>
    );
}

export default RoomForm;