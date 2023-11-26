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
    
    if(props.role==='admin'){
        return(
            <div className="mb-10">
                <nav className="flex justify-center m-4">
                    <Link to={`/${props.role}/account`} className={handleClasses("account")}>
                        My Profile
                    </Link>
                    <div className="border-l border-gray-300"></div>
                    <Link to={`/${props.role}/addRoom`} className={handleClasses("addRoom")}>
                        Add Room
                    </Link>
                    {/* <a href={`/${props.role}/addRoom`}>
                        Add ERoom
                    </a> */}
                    <div className="border-l border-gray-300"></div>
                    <Link to={`/${props.role}/addStudent`} className={handleClasses("addStudent")}>
                        Add Student
                    </Link>
                    <div className="border-l border-gray-300"></div>
                    <Link to={`/${props.role}/addHostelStaff`} className={handleClasses("addHostelStaff")}>
                        Add Hostel Employee
                    </Link>
                </nav>
            </div>
        );
    }
    else if(props.role==='student'){
        return(
            <div className="mb-10">
                <nav className="flex justify-center m-4">
                    <Link to={`/${props.role}/account`} className={handleClasses("account")}>
                        My Profile
                    </Link>
                    <div className="border-l border-gray-300"></div>
                    <Link to={"/student/addComplaint"} className={handleClasses("addComplaint")}>
                        Add Complaint
                    </Link>
                    {/* <div className="border-l border-gray-300"></div> */}
                    {/* <Link to={"/student/nightExtension"} className={handleClasses("addRoom")}>
                        Night Extension
                    </Link> */}
                </nav>
            </div>
        );
    }
    else if(props.role==='hostelStaff'){
        return(
            <div className="mb-10">
                <nav className="flex justify-center m-4">
                    <Link to={`/${props.role}/account`} className={handleClasses("account")}>
                        My Profile
                    </Link>
                    <div className="border-l border-gray-300"></div>
                    <Link to={`/${props.role}/allocateRoom`} className={handleClasses("allocateRoom")}>
                        Allocate Room
                    </Link>
                    <div className="border-l border-gray-300"></div>
                    <Link to={`/${props.role}/viewComplaints`} className={handleClasses("viewComplaint")}>
                        View Complaints
                    </Link>
                </nav>
            </div>
        );
    }
    else{
            //page not found
    }

}

export default AccountNav;