import React, { useState } from 'react';
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LOGGED_IN, ADMIN_OR_NOT, USER_OR_NOT } from 'store/actions';
import AnimateButton from 'ui-component/extended/AnimateButton';

const AuthLogin = () => {
  const [value1, setvalue1] = useState('');
  const [value2, setvalue2] = useState('');
  const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State variable for loader
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.customization.isAuthAdmin);
  console.log(isAdmin)

  const validateLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader
  
    // Validation for empty fields
    if (!value1) {
      seterror({ email: 'Email is required' });
      setIsLoading(false); // Stop loader
      return;
    }
    if (!value2) {
      seterror({ password: 'Password is required' });
      setIsLoading(false); // Stop loader
      return;
    }
  
    try {
      const response = await axios.post('https://hrm-backend-square.onrender.com/auth/login', {
        email: value1,
        password: value2
      });
  
      dispatch({ type: LOGGED_IN });
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
          ({ email: error.response.data.error }); // Email error
          
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
      email: "",
    }));
  };

  const handlePass = (e) => {
    setvalue2(e.target.value);
    seterror((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Grid>
        <TextField
          sx={{ mb: 0, height: "8vh" ,marginTop:"0px",marginBottom:"20px"}}
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
          error={error && error.email}
          helperText={error && error.email}
          value={value1}
          onChange={(e) => handleEmail(e)}
        />
      </Grid>
      <Grid>
        <TextField
          sx={{
            height: "8vh",
            mb: 2,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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
          helperText={error && error.password}
          value={value2}
          onChange={(e) => handlePass(e)}
        />
      </Grid>
      <Grid>
        <AnimateButton>
          <Button
          style={{marginTop:'10px'}}
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
  );
};

export default AuthLogin;