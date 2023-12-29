import React from "react";
import UserAdd from "../component/userAdd";
import Navbar from "../component/navBar";
export default function AddPage(){
    return(
        <React.Fragment>
            <Navbar/>
            <UserAdd/>     
        </React.Fragment>
    )
  
}