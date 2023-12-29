import React from 'react';
import {  Typography } from "@mui/material";

export default function UserDetail({ label, value }) {
  return (
    
    <Typography style={userItemStyle}>
      {label}: &nbsp;{value}
    </Typography>
   
  );
}

const userItemStyle = {
  width: "200px",
  boxShadow: "none",
  color: "#000000",
  marginBottom: "10px",
};