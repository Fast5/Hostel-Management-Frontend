import React from "react";
import { useParams } from "react-router-dom";
import HostelNav from "../components/HostelNav";

function HostelPage(){
    const {id}=useParams();
    return(
        <div className="flex flex-col">
            <HostelNav />
            
            <div>
                <h1>{id}</h1>
            </div>
        </div>
    );
}

export default HostelPage;