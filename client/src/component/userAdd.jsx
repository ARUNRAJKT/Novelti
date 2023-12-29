import React, { useEffect, useState } from 'react';
import {
  Paper,
  FormControl,
  Select,
  InputLabel,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import axios from 'axios'; // Import axios for HTTP requests
import { getCountries, getStates } from './api';
import {  useNavigate } from "react-router-dom"

export default function Register() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    zipcode: '',
  });
  const [isValidInput, setIsValidInput] = useState({
    // Initialize isValidInput state
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    address1: true,
    country: true,
    state: true,
    zipCode: true,
  });

  const validateField = (name, value, minLength = 0, regex = null, maxLength = Infinity) => {
    const isValid = value.length >= minLength && value.length <= maxLength && (regex ? regex.test(value) : true);
    setIsValidInput((prev) => ({ ...prev, [name]: isValid }));
    return isValid;
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const navGate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValid = Object.keys(input).every((key) => validateField(key, input[key]));
      if (isValid) {
        const response = await axios.post('http://localhost:4004/user/addUser', {
          ...input,
          phone: value,
          country: selectedCountry,
          state: selectedState,
        });

        console.log(response.data); // Handle the response from the backend as needed

        if (response.data.success) {
          alert('User has been added successfully');
          navGate('/')
        } else {
          alert('Backend validation failed. Please check your input.');
        }
      } else {
        alert('Please enter all information correctly');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred while adding the user');
    }
  };

  const handleInputChange = (e, minLength = 0, regex = null, maxLength = Infinity) => {
    const { name, value } = e.target;

    if (name === 'firstName' || name === 'lastName') {
      validateField(name, value, 5);
    } else if (name === 'phone') {
      validateField(name, value, 0, null);
    } else if (name === 'zipCode') {
      validateField(name, value, 5, maxLength);
    } else {
      validateField(name, value, minLength, regex);
    }

    inputChange(e);
  };

  useEffect(() => {
    getCountries().then((result) => setCountries(result.data.data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates(selectedCountry).then((result) => setStates(result.data.data.states));
    }
  }, [selectedCountry]);

  return (
    <center>
      <Container>
        <br />
        <br />
        <Paper elevation={0} style={styles.paper}>
          <Typography variant="h5" style={styles.heading}>
            User Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-required"
                  color="warning"
                  onChange={(e) => handleInputChange(e, 5)}
                  style={styles.textField}
                  InputLabelProps={{ style: { color: '#86888c' } }}
                  InputProps={{ style: { color: '#aaabad' } }}
                  name="firstname"
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
                  onChange={(e) => handleInputChange(e)}
                  style={styles.textField}
                  InputLabelProps={{ style: { color: '#86888c' } }}
                  InputProps={{ style: { color: '#aaabad' } }}
                  name="lastname"
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
                  onChange={(e) => handleInputChange(e)}
                  onBlur={() => validateField('email', input.email, 0, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)}
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
                  value={value}
                  onChange={setValue}
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
                    value={selectedCountry}
                    name="country"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setInput((values) => ({ ...values, [name]: value }));
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
                    value={selectedState}
                    name="state"
                    label="State"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setInput((values) => ({ ...values, [name]: value }));
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
                  onChange={(e) => handleInputChange(e, 5, null, 9)}
                  style={styles.textField}
                  InputLabelProps={{ style: { color: '#86888c' } }}
                  InputProps={{ style: { color: 'white' } }}
                  name="zipcode"
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
                  Add User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
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

