import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment, CircularProgress, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LOGGED_IN, ADMIN_OR_NOT, USER_OR_NOT, AUTH_ID, USER_ID } from 'store/actions';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
axios.defaults.withCredentials = true;
const AuthLogin = () => {
  const [value1, setvalue1] = useState('');
  const [value2, setvalue2] = useState('');
  const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State variable for loader
  const [emailValidationAlert, setEmailValidationAlert] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader

    // Validation for empty email field
    if (!value1 && !value2) {
      setEmptyFieldsAlert(true); // Show the alert
      setIsLoading(false);
      setEmailValidationAlert(false);
      setPassworderror(false); // Stop loader
      return;
    } else {
      setEmptyFieldsAlert(false); // Hide the alert if not empty
    }
    if (!value2) {
      setPassworderror(true);
      setIsLoading(false);
      setEmptyFieldsAlert(false);
      setEmailValidationAlert(false); // Stop loader
      return;
    } else {
      setPassworderror(false);
    }
    if (!value1) {
      setEmailValidationAlert(true);
      setIsLoading(false);
      setEmptyFieldsAlert(false);
      setPassworderror(false); // Stop loader
      return;
    } else {
      setEmailValidationAlert(false);
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email: value1,
        password: value2
      });

      dispatch({ type: LOGGED_IN });
      dispatch({ type: AUTH_ID, payload: response.data.existingUser.employeeId });
      dispatch({ type: USER_ID, payload: response.data.existingUser._id });
      const role = response.data.existingUser.role;
      if (role === 'Admin') {
        dispatch({ type: ADMIN_OR_NOT });

        navigate('/dashboard/default');
      } else {
        dispatch({ type: USER_OR_NOT });
        navigate('/dashboard/default');
      }

      setIsLoading(false); // Stop loader
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error === 'Invalid password') {
          seterror({ password: 'Wrong password' }); // Password error
        } else {
          seterror({ email: error.response.data.error }); // Email error
        }
      } else {
        seterror({ password: 'Wrong password' }); // Generic password error
      }

      setTimeout(() => {
        seterror({});
      }, 5000);

      setIsLoading(false); // Stop loader
    }
  };

  const handleEmail = (e) => {
    setvalue1(e.target.value);
    seterror((prev) => ({
      ...prev,
      email: ''
    }));
    setEmptyFieldsAlert(false);
    setEmailValidationAlert(false);
    setPassworderror(false);
  };

  const handlePass = (e) => {
    setvalue2(e.target.value);
    seterror((prev) => ({
      ...prev,
      password: ''
    }));

    setEmptyFieldsAlert(false);
    setEmailValidationAlert(false);
    setPassworderror(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div>
        <Grid>
          <TextField
            sx={{ mb: 0, height: '8vh', marginTop: '0px', marginBottom: '20px' }}
            id="outlined-adornment-email-login"
            label="Email Address"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            autoComplete="email"
            placeholder="abc@gmail.com"
            type="email"
            autoFocus
            value={value1}
            onChange={(e) => handleEmail(e)}
          />
        </Grid>
        <Grid>
          <TextField
            sx={{
              height: '8vh',
              mb: 2
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            id="outlined-adornment-password-login"
            label="Password"
            margin="normal"
            required
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete="current-password"
            error={error && error.password}
            value={value2}
            onChange={(e) => handlePass(e)}
          />
        </Grid>
        <Grid>
          <AnimateButton>
            <Button
              style={{ marginTop: '10px' }}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              onClick={validateLogin}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign in'}
            </Button>
          </AnimateButton>
        </Grid>
      </div>
      {emptyFieldsAlert && (
        <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
          <Alert sx={{ mt: '20px' }} variant="filled" severity="error">
            Please enter email and password
          </Alert>
        </Stack>
      )}
      {emailValidationAlert && (
        <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please enter your email.
          </Alert>
        </Stack>
      )}
      {passworderror && (
        <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please enter password
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default AuthLogin;
