import React from "react";
import UserView from "../component/userView";
import Navbar from "../component/navBar";
export default function MainPage(){
    return(
        <React.Fragment>
            <Navbar/>
            <UserView/>
        </React.Fragment>
    )
  
}