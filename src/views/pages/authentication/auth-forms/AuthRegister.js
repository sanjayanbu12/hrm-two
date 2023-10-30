import { Box } from '@mui/system';
import './authreg.css';
import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import AnimateButton from 'ui-component/extended/AnimateButton';

import axios from 'axios';
import { signupSchema } from 'Valdidation/SignupValidation';
import PasswordValidator from './PasswordValidator';
const FirebaseRegister = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchAlert, setPasswordMismatchAlert] = useState('');
  //use to route to another page
  const navigate = useNavigate();
  //func define
  const handle = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatchAlert('Passwords do not match');
      return;
    }

    // Clear the password mismatch alert if passwords match
    setPasswordMismatchAlert('');

    const dataVar = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    try {
      await signupSchema.validate(dataVar, { abortEarly: false });
      const userExist = await checkUserExist(email);
      if (userExist) {
        setErr((prev) => ({ ...prev, email: 'user aldready exist' }));
      } else {
        await axios.post('https://hrm-backend-square.onrender.com/auth/createUser', dataVar); //using axios to set data to json server
        setFirstname('');
        setEmail('');
        setLastname('');
        setPassword('');
        setErr({});
        navigate('/pages/login/login3');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const ValidationErrors = {};
        error.inner.map((err) => {
          ValidationErrors[err.path] = err.message;
        });
        setErr(ValidationErrors);
        console.log(ValidationErrors);
      } else {
        console.log(error);
      }
    }
  };
  const checkUserExist = async (email) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/Users`);
      const resData = response.data;
      const userExist = resData.some((x) => x.email === email);
      return userExist;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
    setErr((prev) => ({
      ...prev,
      firstname: ''
    }));
  };
  const handleLastNameChange = (e) => {
    setLastname(e.target.value);
    setErr((prevErr) => ({ ...prevErr, lastname: '' }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErr((prevErr) => ({ ...prevErr, email: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErr((prevErr) => ({ ...prevErr, password: '' }));
  };
  const handlecheckConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
    setErr((prevErr) => ({ ...prevErr, confirmPassword: '' }));
  };
  return (
    <div className="signup-wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={6}>
            <TextField
              sx={{ minWidth: '100%' }}
              variant="outlined"
              id="outlined-required"
              label="First Name"
              value={firstname}
              error={err && err.firstname}
              helperText={err && err.firstname}
              onChange={(e) => handleFirstname(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ minWidth: '100%' }}
              variant="outlined"
              id="outlined-required"
              label="Last Name"
              value={lastname}
              error={err && err.lastname}
              helperText={err && err.lastname}
              onChange={(e) => handleLastNameChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ minWidth: '100%' }}
              variant="outlined"
              id="outlined-required"
              label="Email"
              type="email"
              value={email}
              error={err && err.email}
              helperText={err && err.email}
              onChange={(e) => handleEmailChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ minWidth: '100%' }}
              variant="outlined"
              error={err && err.password}
              helperText={err && err.password}
              id="outlined-required"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
            <PasswordValidator />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ minWidth: '100%' }}
              variant="outlined"
              id="outlined-required"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => handlecheckConfirmPass(e)}
              error={passwordMismatchAlert !== ''}
              helperText={passwordMismatchAlert}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={2}>
        </Grid>
      </Box>
      <AnimateButton>
        <Button onClick={handle} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
          Sign up
        </Button>
      </AnimateButton>
    </div>
  );
};

export default FirebaseRegister;
