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
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

const AuthLogin = () => {
  const [value1, setvalue1] = useState('');
  const [value2, setvalue2] = useState('');
  const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotExistAlert, setEmailNotExistAlert] = useState(false);
  const [emailValidationAlert, setEmailValidationAlert] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);
  const [emailNotVerifiedAlert, setEmailNotVerifiedAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setloggedUserData } = useContext(ApiContext);

  const validateLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!value1 && !value2) {
      setEmptyFieldsAlert(true);
      setIsLoading(false);
      setEmailValidationAlert(false);
      setPasswordError(false);
      setEmailNotExistAlert(false);
      setEmailNotVerifiedAlert(false);
      return;
    } else {
      setEmptyFieldsAlert(false);
    }
    if (!value2) {
      setPasswordError(true);
      setIsLoading(false);
      setEmptyFieldsAlert(false);
      setEmailValidationAlert(false);
      setEmailNotExistAlert(false);
      setEmailNotVerifiedAlert(false);
      return;
    } else {
      setPasswordError(false);
    }
    if (!value1) {
      setEmailValidationAlert(true);
      setIsLoading(false);
      setEmptyFieldsAlert(false);
      setPasswordError(false);
      setEmailNotExistAlert(false);
      setEmailNotVerifiedAlert(false);
      return;
    } else {
      setEmailValidationAlert(false);
    }

    try {
      const response = await axios.post('https://hrm-backend-square.onrender.com/auth/login', {
        email: value1,
        password: value2
      });

      setloggedUserData(response);
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

      setIsLoading(false);
    } catch (error) {
      console.error('Login Error:', error.response.data.message);

      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "Email Id doesn't exist. Please SignUp") {
          setEmailNotExistAlert(true);
        } else if (errorMessage === 'Email is not verified. Please verify your email first.') {
          setEmailNotVerifiedAlert(true);
        } else if (errorMessage === 'Password is incorrect') {
          setPasswordError(true);
        } else {
          seterror({ email: errorMessage });
        }
      } else {
        // Display a generic password error alert
        setPasswordError(true);
      }

      setTimeout(() => {
        seterror({});
      }, 5000);

      setIsLoading(false);
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
    setPasswordError(false);
    setEmailNotExistAlert(false);
    setEmailNotVerifiedAlert(false);
  };

  const handlePass = (e) => {
    setvalue2(e.target.value);
    seterror((prev) => ({
      ...prev,
      password: ''
    }));

    setEmptyFieldsAlert(false);
    setEmailValidationAlert(false);
    setPasswordError(false);
    setEmailNotExistAlert(false);
    setEmailNotVerifiedAlert(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div>
        <Grid>
          <TextField
            sx={{
              mb: 0,
              height: '8vh',
              marginTop: '0px',
              marginBottom: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '4px'
              }
            }}
            // id="outlined-adornment-email-login"
            label="Email Address"
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            autoComplete="email"
            placeholder="abc@gmail.com"
            type="email"
            // autoFocus
            value={value1}
            onChange={(e) => handleEmail(e)}
          />
        </Grid>
        <Grid>
          <TextField
            sx={{
              mb: 0,
              height: '8vh',
              marginTop: '0px',
              marginBottom: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '4px'
              }
            }}
            InputProps={{
              // startAdornment: <InputAdornment position="start">{/* <PassKeyIcon/> */}</InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            // id="outlined-adornment-password-login"
            label="Password"
            // variant="outlined"
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
              style={{ marginTop: '10px', backgroundColor:"#222222", transition:"0.3s",
              ':hover':{
                backgroundColor: "rgba(255,255,255,0.8)"
              }
            
            }}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
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
      {passwordError && (
        <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
          <Alert variant="filled" severity="error">
            {value2 ? 'Password is incorrect' : 'Please enter your password'}
          </Alert>
        </Stack>
      )}

      {emailNotExistAlert && (
        <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Email Id doesn&apos;t exist. Please SignUp
          </Alert>
        </Stack>
      )}
      {emailNotVerifiedAlert && (
        <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Email is not verified. Please verify your email first.
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default AuthLogin;
