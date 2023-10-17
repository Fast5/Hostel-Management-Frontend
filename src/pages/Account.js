import React from "react";
import { useParams } from "react-router-dom";

function Account(){
    const {id}=useParams();
    

    return(
        <div className="text-center max-w-lg mx-auto">
            Logged in as {userInfo.name} ({userInfo.username})
            <br />
            <button onClick={handleClick} className="bg-red-500 text-white max-w-sm w-full py-2 mt-2 rounded-2xl">Logout</button>
        </div>
    );
}

export default Account;