import React from "react";
import { Grid, Button } from '@mui/material';
import { Link } from "react-router-dom";
import Icon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/GroupAdd';

export default function Navbar() {
  return (
    <div style={styles.navbar}>
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={4}>
          User
        </Grid>
        <Grid item sm={1}></Grid>
        <Grid item sm={3} style={styles.buttonContainer}>
          <Link to='/'>
          <Button variant="outlined" endIcon={<Icon />} style={styles.button}>All Users</Button>
          </Link>
          <Link to='/addpage'>
          
          <Button variant="outlined" endIcon={<AddIcon />} style={styles.button}>Add User</Button>
          </Link>
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
    </div>
  );
}

const styles = {
  navbar: {
    padding: '20px',
    backgroundColor: "#15171a",
    boxShadow: '0px 7px 11px -1px rgba(0, 0, 0, 0.75)',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    color: "white",
    marginLeft: "10px",
  },
};
