import React, { useContext, useEffect } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Loader from "../components/Loader";

function AddComplaint(){

    const {userInfo, ready1, setReady1}=useContext(UserContext);

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
            return;
        }
    }, []);

    if(!userInfo && !ready1){
        return <Loader/>
    }

    return(
        <div className="text-center">
            <AccountNav role="student"/>

            {
                userInfo?.roomId && (
                    <Link to={"/student/addComplaint/new"} className="text-white bg-red-500 py-2 px-4 rounded-full">
                        <i className="fa-solid fa-plus"></i> Add Complaint
                    </Link>
                )
            }

            {/* show previous complaints */}
        </div>
    );
}

export default AddComplaint;