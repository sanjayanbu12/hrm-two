import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  // Stack,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { userSchema } from 'validation/Validation';
import * as yup from 'yup';
import axios from 'axios';

// third party

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router';


// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {

  const [value1, setvalue1] = useState('');
  const [value2, setvalue2] = useState('');
  const [loginError, setLoginError] = useState('');
  // const [botherror,setbotherror]=useState("")
  const [data, setData] = useState([]);
  const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility
  const navigate = useNavigate();

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

  const validateLogin = async () => {
    try {
      await userSchema.validate(
        { email: value1, password: value2 },
        { abortEarly: false }
      );
      const response = await axios.get("http://localhost:3001/users");
      setData(response.data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationerr = {};
        error.inner.forEach((err) => {
          validationerr[err.path] = err.message;
        });
        seterror(validationerr);
        console.log(validationerr);
      } else {
        console.log(error);
      }
    }
  };

  const checkLogin = () => {
    const user = data.find((item) => item.email === value1);
    const user1 = data.find((item) => item.password === value2);
  
    if (user && user1) {
      navigate("/dashboard/default");
    } else if (!user && user1) {
      setLoginError("Your email is incorrect");
    } else if (user && !user1) {
      setLoginError("Your password is incorrect");
    } else {
      setLoginError("Both email and password are incorrect");
    }
  
    if (!value1) {
      setLoginError(" ");
    } else if (!value2) {
      setLoginError(" ");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <form noValidate {...others}>
      <Grid >
        <TextField
          sx={{mb:0,  height:"8 vh",}}
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
    
           height:"8 vh",
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
          onChange={handlePass}
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
       <Typography color="error" variant="body2" sx={{mb: 1,ml:10.5 }}>
          {loginError}
        
        </Typography>
<Grid >
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary"  
             onClick={(e) => {
              validateLogin().then(checkLogin)
              e.preventDefault()
            }}
            >
            Sign in
          </Button>
        </AnimateButton>
        </Grid>
      </form>
    </>
  );
};

export default FirebaseLogin;
