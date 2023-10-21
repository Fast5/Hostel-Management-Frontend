import React from "react";
import { Link, useLocation } from "react-router-dom";

function HostelNav(){
    const location=useLocation();

    const handleClasses=(type=null)=>{
        let classes="bg-slate-50 text-center p-2 w-36 h-10";
        
        if(("/hostels/"+type===location.pathname)){
            classes="bg-slate-300 text-center p-2 w-36 h-10";
        }

        return classes;
    }

    return(
        <div>
            <nav className="flex justify-center m-4">
                <Link to={"/hostels/bh1"} className={handleClasses("bh1")}>
                    BH-1
                </Link>
                <div className="border-l border-gray-300"></div>
                <Link to={"/hostels/bh2"} className={handleClasses("bh2")}>
                    BH-2
                </Link>
                <div className="border-l border-gray-300"></div>
                <Link to={"/hostels/bh3"} className={handleClasses("bh3")}>
                    BH-3
                </Link>
            </nav>
        </div>
    );
}

export default HostelNav;