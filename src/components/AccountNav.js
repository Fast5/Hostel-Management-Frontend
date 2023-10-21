import React from "react";
import { Link, useLocation } from "react-router-dom";

function AccountNav(props){
    const location=useLocation();

    const handleClasses=(type=null)=>{
        let classes="bg-white text-center p-2 w-48 h-10";
        
        if((`/${props.role}/`+type===location.pathname)){
            classes="bg-red-500 text-white text-center p-2 w-48 h-10";
        }

        return classes;
    }
    
    return(
        <div className="mb-10">
            <nav className="flex justify-center m-4">
                <Link to={`/${props.role}/account`} className={handleClasses("account")}>
                    My Profile
                </Link>
                <div className="border-l border-gray-300"></div>
                <Link to={"/admin/addRoom"} className={handleClasses("addRoom")}>
                    Add Room
                </Link>
                <div className="border-l border-gray-300"></div>
                <Link to={"/admin/addStudent"} className={handleClasses("addStudent")}>
                    Add Student
                </Link>
                <div className="border-l border-gray-300"></div>
                <Link to={"/admin/addHostelStaff"} className={handleClasses("addHostelStaff")}>
                    Add Hostel Employee
                </Link>
            </nav>
        </div>
    );
}

export default AccountNav;