import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { userSchema } from 'validation/Validation';
import {
  Button,
  // Stack,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
} from '@mui/material';
import { useState } from 'react';
// /import { userSchema } from 'validation/Validation';//
// import * as yup from 'yup';
import axios from 'axios';

// third party

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router';

import { useDispatch } from 'react-redux';
import { LOGGED_IN } from 'store/actions';
// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {

  const [value1, setvalue1] = useState('');
  const [value2, setvalue2] = useState('');
  // const [data, setData] = useState([]);
  const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const customization = useSelector((state) => state.customization.loggedIn);
  const validateLogin = async (e) => {
    e.preventDefault();
    console.log(value1, value2);
    try {
      
      await axios.post('https://hrm-backend-square.onrender.com/auth/login', {
        email: value1,
        password: value2
      }).then(()=>{
        console.log(`then`);
        dispatch({ type: LOGGED_IN })
        navigate('/recruitment');
      })

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        seterror(error.response.data.error);
      } else {
        seterror('An error occurred');
      }
      setTimeout(() => {
        seterror("")
      }, 5000);
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
      {/* <form noValidate {...others}> */}
      <Grid >
        <TextField
          sx={{ mb: 0, height: "8 vh", }}
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

            height: "8 vh",
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
          type={showPassword ? 'text' : 'password'} // Toggle between text and password type
          placeholder="Enter your password"
          autoComplete="current-password"
          error={error && error.password}
          helperText={error && error.password}
          value={value2}
          onChange={(e) => handlePass(e)}
        />
      </Grid>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Remember me"
          />
          <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Stack> */}
      {/* <Typography color="error" variant="body2" sx={{mb: 1,ml:10.5 }}>
          {loginError} */}

      {/* </Typography> */}
      <Grid >
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary"
            onClick={
              validateLogin}
          >
            Sign in
          </Button>
        </AnimateButton>
      </Grid>
      {/* </form> */}
    </div>
  )
};

export default AuthLogin;