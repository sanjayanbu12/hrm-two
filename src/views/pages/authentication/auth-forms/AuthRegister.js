import { Box } from '@mui/system';
import './authreg.css';
import { Button, Grid, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { signupSchema } from 'Valdidation/SignupValidation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordValidator from './PasswordValidator';
import useToast from 'views/leavemanagement/useToast';

const FirebaseRegister = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchAlert, setPasswordMismatchAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const handle = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatchAlert('Passwords do not match');
      return;
    }

    setPasswordMismatchAlert('');

    const dataVar = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    try {
      // Set loading to true when the form is being submitted
      setIsLoading(true);

      await signupSchema.validate(dataVar, { abortEarly: false });
      const userExist = await checkUserExist(email);
      if (userExist) {
        setErr((prev) => ({ ...prev, email: 'user aldready exist' }));
      } else {
        await axios.post('http://localhost:3001/auth/createUser', dataVar);
        setFirstname('');
        setEmail('');
        setLastname('');
        setPassword('');
        setErr({});
        showToast('success', 'Welcome! Please go and verify your email.', 'Message Content');
        navigate('/pages/login/login3');
       
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const ValidationErrors = {};
        error.inner.map((err) => {
          ValidationErrors[err.path] = err.message;
        });
        setErr(ValidationErrors);
      } else {
        error && showToast('error', error.response.data.message, 'Message Content');
      }
    } finally {
      // Clear loading state after submission (success or error)
      setIsLoading(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="signup-wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={12} md={12} sm={6} lg={6}>
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
          <Grid item xs={12} md={12} sm={6} lg={6}>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              error={err && err.password}
              helperText={err && err.password}
              id="outlined-required"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
            {password && <PasswordValidator password={password} />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ minWidth: '100%' }}
              variant="outlined"
              id="outlined-required"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handlecheckConfirmPass(e)}
              error={passwordMismatchAlert !== ''}
              helperText={passwordMismatchAlert}
            />
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                onClick={handle}
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Sign up'}
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Box>

      <Toast ref={toast} style={{ width: '100%', maxWidth: '100%' }} position="bottom-center" />
    </div>
  );
};

export default FirebaseRegister;
