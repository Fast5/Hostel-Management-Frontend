import React from "react";

function Home() {
    return (
        <div className="grid grid-cols-2 items-center p-4">
            <div className="m-4 mt-96 text-red-500 font-bold text-5xl text-center">
                Hostel Management
                <br />
                &
                <br />
                Complaint Registration
            </div>
            <div className="relative h-[23.8rem]">
                <img src="../assets/photo-1.jpeg" alt="campus" className="absolute right-12 z-20 h-72 w-72 rounded-full"/>
                <img src="../assets/photo-2.jpeg" alt="room" className="absolute left-48 bottom-0 z-10 h-44 w-44 rounded-full"/>
                <img src="../assets/photo-3.jpeg" alt="hostel" className="absolute left-24 top-14 z-0 h-56 w-56  rounded-full"/>
            </div>
        </div>
    );
}

export default Home;
