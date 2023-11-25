import React, { useContext } from "react";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function AddComplaint(){

    const {userInfo}=useContext(UserContext);

    return(
        <div className="text-center">
            <AccountNav role="student"/>

            {
                userInfo.roomId && (
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