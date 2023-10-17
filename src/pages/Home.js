import React from "react";

function Home() {
    return (
        <div className="grid grid-cols-2 items-center p-6">
            <div className="m-4 mt-96 text-red-500 font-bold text-5xl text-center">
                Hostel Management
                <br />
                &
                <br />
                Complaint Registration
            </div>
            <div className="relative h-[30rem]">
                <img src="../assets/photo-1.jpeg" alt="campus" className="absolute right-12 z-0 h-80 w-80 rounded-full"/>
                <img src="../assets/photo-2.jpeg" alt="room" className="absolute left-36 bottom-0 z-10 h-64 w-64 rounded-full"/>
                <img src="../assets/photo-3.jpeg" alt="hostel" className="absolute left-10 top-20 z-20 h-56 w-56 rounded-full"/>
            </div>
        </div>
    );
}

export default Home;
