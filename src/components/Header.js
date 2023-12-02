import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Loader from "./Loader";

function Header() {
    const {userInfo, ready1, setReady1} = useContext(UserContext);

    useEffect(()=>{
        if(!userInfo){
            setReady1(false);
        }
    }, [userInfo])

    if(!ready1){
        setTimeout(()=>{}, 2000);
    }

    return (
        <header>
            <div className="flex justify-between p-6 bg-amber-500">
                <Link to={"/"}>
                    <img src="/assets/LOGO_LNM.png" alt="LNMITT_logo" width={120} height={30} />
                </Link>

                <div className="flex justify-between items-center gap-4">
                    <Link to={"/hostels"} className="bg-white p-2 rounded-md">
                        <i className="fa-solid fa-hotel"></i> Hostels
                    </Link>

                    <Link to={"/contact"} className="bg-white p-2 rounded-md">
                        <i className="fa-solid fa-address-book"></i> Contact Us
                    </Link>

                    {userInfo ? (
                        <Link to={`/${userInfo?.role}/account`} className="bg-white p-2 rounded-md">
                            <i className="fa-solid fa-user"></i> {userInfo?.name}
                        </Link>
                    ) : (
                        <div className="dropdown">
                            <button className="btn bg-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-right-to-bracket"></i> Login
                            </button>
                            <ul className="dropdown-menu text-center p-2">
                                <li>
                                    <Link to={"/login/student"}>continue as Student</Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link to={"/login/hostelStaff"} className="whitespace-nowrap w-4 overflow-hidden text-ellipsis">
                                        continue as Hostel Staff
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link to={"/login/admin"}>continue as Admin</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
