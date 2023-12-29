import React, { useEffect, useState } from 'react';
import {
    Grid,
    Modal,
    Container,
    Typography,
    Paper,
    FormControl,
    Select,
    InputLabel,
    Button,
    MenuItem,
    TextField,
} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import axios from 'axios';
import { getCountries, getStates } from './api';
import UserDetail from './userDetails';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

export default function UserView() {
    const [userDetails, setUserDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [upDetails, setUpDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        zipCode: '',
    });
    const [isValidInput, setIsValidInput] = useState({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address1: true,
        country: true,
        state: true,
        zipCode: true,
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setUpDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleInputChange = (e, minLength = 0, regex = null, maxLength = Infinity) => {
        const { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            validateField(name, value, 5);
        } else if (name === 'phone') {
            validateField(name, value, 0, null);
        } else if (name === 'zipCode') {
            validateField(name, value, 5, null, maxLength);
        } else {
            validateField(name, value, minLength, regex);
        }

        inputChange(e);
    };

    const validateField = (name, value, minLength = 0, regex = null, maxLength = Infinity) => {
        const isValid = value.length >= minLength && value.length <= maxLength && (regex ? regex.test(value) : true);
        setIsValidInput((prev) => ({ ...prev, [name]: isValid }));
        return isValid;
    };

    useEffect(() => {
        axios.get('http://localhost:4004/user/showUsers')
            .then(response => {
                const data = response.data.data;
                if (response.data.success === true) {
                    setUserDetails(data);
                }
            })
            .catch(error => {
                console.error('Error fetching User details', error);
            });
    }, []);

    useEffect(() => {
        getCountries().then((result) => setCountries(result.data.data));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            getStates(selectedCountry).then((result) => setStates(result.data.data.states));
        }
    }, [selectedCountry]);

    const deleteUser = (id) => {
        axios.get(`http://localhost:4004/user/deleteUser/${id}`)
            .then(res => {
                console.log('User deleted successfully');
                window.location.reload();
            })
            .catch(error => {
                const message = error.response?.data?.message || 'An error occurred';
                alert(message);
                console.error('Error deleting user', error);
            });
    }

    const updateUser = (id) => {
        axios.get(`http://localhost:4004/user/updateUser/${id}`)
            .then(function (res) {
                const upD = res.data.details;
                setUpDetails(upD);
                console.log('update details retrieved', upD);
                handleOpen();
            })
            .catch(function (error) {
                const message = error.response.data.message;
                alert(message);
                console.log(error);
            });
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4004/user/updateUser', upDetails)
            .then(function (res) {
                console.log('Update Success');
                setOpen(false);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getCountries().then((result) => setCountries(result.data.data));
      }, []);
    
      useEffect(() => {
        if (selectedCountry) {
          getStates(selectedCountry).then((result) => setStates(result.data.data.states));
        }
      }, [selectedCountry]);
    
    return (
        <React.Fragment>
            <Grid container style={{ marginTop: "2%" }} >
                {userDetails?.map((user, index) => (
                    <Grid item key={index} className="user-item" style={{
                        background: 'rgba(255, 255, 255, 0.14)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(3.6px)',
                        WebkitBackdropFilter: 'blur(3.6px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '20px',
                        margin: 'auto',
                        marginTop: "2%"
                    }}>
                        <Container>
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
                                onClick={() => deleteUser(user._id)}
                                variant="contained"
                                className="delete-button"
                                color="error"
                                endIcon={<DeleteForeverRoundedIcon />}
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={() => { updateUser(user._id); }}
                                variant="contained"
                                style={{ boxShadow: "none", backgroundColor: "#308E3A", margin: '2%', color: '#000000' }}
                                color="success"
                                endIcon={<NoteAltRoundedIcon style={{ boxShadow: "none" }} />}
                            >
                                EDIT
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}

                                >
                                <Paper elevation={0}>
                                    <Typography variant="h5">
                                        User Details
                                    </Typography>
                                    <form onSubmit={handleUpdateSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-required"
                                                    color="warning"
                                                    value={upDetails.firstName}
                                                    onChange={(e) => handleInputChange(e, 5)}
                                                    style={styles.textField}
                                                    InputLabelProps={{ style: { color: '#86888c' } }}
                                                    InputProps={{ style: { color: '#aaabad' } }}
                                                    name="firstName"
                                                    label="First Name"
                                                    variant="outlined"
                                                />
                                                {!isValidInput.firstName && (
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        First Name must be at least 5 characters long.
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="ooutlined-required"
                                                    color="warning"
                                                    value={upDetails.lastName}
                                                    onChange={(e) => handleInputChange(e, 5)}
                                                    style={styles.textField}
                                                    InputLabelProps={{ style: { color: '#86888c' } }}
                                                    InputProps={{ style: { color: '#aaabad' } }}
                                                    name="lastName"
                                                    label="Last Name"
                                                    variant="outlined"
                                                />
                                                {!isValidInput.lastName && (
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        Last Name must be at least 5 characters long.
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-required"
                                                    color="warning"
                                                    value={upDetails.email}
                                                    onChange={(e) => handleInputChange(e)}
                                                    onBlur={() => validateField('email', upDetails.email, 0, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)}
                                                    style={styles.textField}
                                                    InputLabelProps={{ style: { color: '#86888c' } }}
                                                    InputProps={{ style: { color: '#aaabad' } }}
                                                    name="email"
                                                    label="Email Id"
                                                    variant="outlined"
                                                />
                                                {!isValidInput.email && (
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        Enter a valid email address! eg: John@gmail.com
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <PhoneInput
                                                    country={'in'}
                                                    color="warning"
                                                    name="phone"
                                                    value={upDetails.phone}
                                                    onChange={(value, data, event) => {
                                                        setValue(value);
                                                        inputChange(event); 
                                                    }}
                                                    inputStyle={{
                                                        width: '100%',
                                                        height: '100%',
                                                        background: 'transparent',
                                                        color: '#86888c',
                                                        borderColor: 'none',
                                                    }}
                                                />
                                                {!isValidInput.phone && (
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        Enter a valid phone number.
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="outlined-basic"
                                                    color="warning"
                                                    value={upDetails.address1}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={styles.textField}
                                                    InputLabelProps={{ style: { color: '#86888c' } }}
                                                    InputProps={{ style: { color: '#aaabad' } }}
                                                    name="address1"
                                                    label="Address 1"
                                                    variant="outlined"
                                                />
                                                {!isValidInput.address1 && (
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        Address 1 is required.
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="outlined-basic"
                                                    color="warning"
                                                    value={upDetails.address2}
                                                    onChange={inputChange}
                                                    style={styles.textField}
                                                    InputLabelProps={{ style: { color: '#86888c' } }}
                                                    InputProps={{ style: { color: '#aaabad' } }}
                                                    name="address2"
                                                    label="Address 2"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="country-label" style={{ color: '#86888c' }}>
                                                        Countries
                                                    </InputLabel>
                                                    <Select
                                                        labelId="country-label"
                                                        id="country-select"
                                                        label="Country"
                                                        value={upDetails.country}
                                                        name="country"
                                                        onChange={(event) => {
                                                            const { name, value } = event.target;
                                                            inputChange(event);
                                                            setSelectedCountry(value);
                                                            setSelectedState('');
                                                        }}
                                                    >
                                                        {countries.map((country) => (
                                                            <MenuItem key={country.value} value={country.name}>
                                                                {country.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!isValidInput.country && (
                                                        <Typography variant="caption" style={{ color: 'red' }}>
                                                            Country is required.
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="state-label" style={{ color: '#86888c' }}>
                                                        State
                                                    </InputLabel>
                                                    <Select
                                                        labelId="state-label"
                                                        id="state-select"
                                                        value={upDetails.state}
                                                        name="state"
                                                        label="State"
                                                        onChange={(event) => {
                                                            const { name, value } = event.target;
                                                            inputChange(event);
                                                            setSelectedState(value);
                                                        }}
                                                    >
                                                        {states.map((state) => (
                                                            <MenuItem key={state.value} value={state.name}>
                                                                {state.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!isValidInput.state && (
                                                        <Typography variant="caption" style={{ color: 'red' }}>
                                                            State is required.
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    type="number"
                                                    id="outlined-basic"
                                                    color="warning"
                                                    value={upDetails.zipCode}
                                                    onChange={(e) => handleInputChange(e, 5, null, 9)}
                                                    style={styles.textField}
                                                    InputLabelProps={{ style: { color: '#86888c' } }}
                                                    InputProps={{ style: { color: 'white' } }}
                                                    name="zipCode"
                                                    label="Zip Code"
                                                    variant="outlined"
                                                />
                                                {!isValidInput.zipCode && (
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        Zip Code must be between 5 and 9 characters.
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                    style={styles.button}
                                                >
                                                    UPDATE USER
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Modal>
                        </Container>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}

const styles = {
    paper: {
        background: 'rgba(255, 255, 255, 0.  14)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(3.6px)',
        WebkitBackdropFilter: 'blur(3.6px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '20px',
        width: '85%',
        margin: 'auto',
        marginTop: "3%"
    },
    heading: {
        marginBottom: '20px',
    },
    textField: {
        width: '100%',
        marginBottom: '20px',
    },
    button: {
        width: '100%',
        marginTop: '20px',
    },
};


