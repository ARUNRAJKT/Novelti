import React, {  } from 'react';
import {
  Paper,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import UserDetail from './UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { deleteUser } from './redux/userSlice';

export default function Users() {
 
  const users = useSelector(state => state.users.users);
 const dispatch=useDispatch()
  const handleDelete = (id) => {
    axios.delete('http://localhost:4004/deleteuser/'+id)
    .then(res=>{
      dispatch(deleteUser({id}))
      console.log(res);
    }).catch(err=>console.log(err))
  
  };


  return (
    <center>
      <Container>
        <br />
        <br />
        <Paper elevation={0} style={styles.paper}>
          <Typography variant="h5" style={styles.heading}>
            User Details
          </Typography>
          <Link to='/create'> 
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={styles.button}
          >
            Add User
          </Button></Link>
          <Grid container spacing={2}>
            {users.map((user, index) => (
              <Grid item xs={12} key={user._id}><br />
                <Paper style={styles.userContainer}>
                    <Grid item xs={6}>
                      <UserDetail label="Firstname" value={user.firstname} />
                      <UserDetail label="Lastname" value={user.lastname} />
                      <UserDetail label="Email" value={user.email} />
                      <UserDetail label="Phone" value={user.phone} />
                      <UserDetail label="Address1" value={user.address1} />
                      <UserDetail label="Address2" value={user.address2} />
                      <UserDetail label="Country" value={user.country} />
                      <UserDetail label="State" value={user.state} />
                      <UserDetail label="Zipcode" value={user.zipcode} />
                      <Button
                      style={styles.button}
                        variant="contained"
                        color="error"
                        className="delete-button"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/edit/${user.id}`}> <Button
                      style={styles.button}
                        type="submit"
                        variant="contained"
                        color="success"
                        className="update-button"
                      >
                        Update
                      </Button>
                      </Link>
                     
                    </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
      <br />
    </center>
   
  );
}

const styles = {
  paper: {
    background: 'rgba(255, 255, 255, 0.14)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(3.6px)',
    WebkitBackdropFilter: 'blur(3.6px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '20px',
    width: '85%',
    margin: 'auto',
  },
  heading: {
    color:"white",
    
  },
  button: {
    width: '100%',
    marginTop: '20px',
  },
  userContainer: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.14)',
    boxShadow: '0 4px 30px rgba(5, 5, 5, 5)',
  },
};
