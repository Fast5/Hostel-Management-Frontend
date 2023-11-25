import React from "react";
import { useParams } from "react-router-dom";

//for student based on room

function ComplaintForm(){
    const {id}=useParams();  //either new or complaint Id for viewing and marking resolved
    
    return(
        <div>Complaint Form</div>
    );
}

export default ComplaintForm;