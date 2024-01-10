import { React, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
import { SaveButton } from './AccountSettingStyled';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import { useContext } from 'react';
// import ApiContext from 'context/api/ApiContext';
import axios from 'axios';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassword = () => {
  // const [value1, setvalue1] = useState('');
  // const [value2, setvalue2] = useState('');
  // const [value3, setvalue3] = useState('');
  // const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [newShowPassword , setNewShowPassword] = useState(false);
  const [email , setemail] = useState('');
  const [password , setpassword] = useState('');
  const [newpassword , setnewpassword] = useState('');
  // const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);
  // const [emailValidationAlert, setEmailValidationAlert] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [emailNotVerifiedAlert, setEmailNotVerifiedAlert] = useState(false);
  // const [emailNotExistAlert, setEmailNotExistAlert] = useState(false);

  // const navigate = useNavigate();
  // const { setloggedUserData } = useContext(ApiContext);

  const handelemail = (e) =>{
    setemail(e.target.value)
  }

  const handelpassword = (e) =>{
    setpassword(e.target.value)
  }

  const handelnewpassword = (e) =>{
    setnewpassword(e.target.value)
  }
  
  const submitchangepassword = async () =>{
    try {
      const alldata = {
        email,
        password,
        newpassword
      }

      const res = await axios.put('http://localhost:3001/auth/updatenewpassword',alldata)
      console.log('im here...')
if(res.status ===200){
     setemail(" ");
     setpassword(" ");
     setnewpassword(" ")
}
    } catch (error) {
      setemail("");
     setpassword("");
     setnewpassword("")
      console.error("error: ",error)
    }     
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleNewPasswordVisibility = () => {
    setNewShowPassword((x) => !x);
  };

  return (
    <>
      <Box sx={{ marginLeft: '127px', marginTop: '2px' }}>
        <Grid container flexDirection={'column'}>
          <Grid xs={12}>
            <TextField
              labelId="demo-simple-select-label"
              name="email"
              id="demo-simple-select"
              label="E-mail"
              autoComplete="email"
              placeholder="abc@gmail.com"
              style={{ width: '350px', fontFamily: "'Poppins', sans-serif" }}
              onChange={(e) => handelemail(e)}
              type="email"
            />
            {/* <InputText
              name="email"
              autoComplete="email"
              placeholder="abc@gmail.com"
              type="email"
              value={value1}
              onChange={(e) => handleEmail(e)}
            /> */}
          </Grid>
          <Grid xs={12}>
            {/* <StyledSmallText style={{ marginTop: '10px' }}>Current Password</StyledSmallText> */}
              <TextField
                labelId="demo-simple-select-label"
                name="password"
                id="demo-simple-select"
                label="Current Password"
                autoComplete="current-password"
                placeholder="Enter your password"
                // error={error && error.password}
                style={{ width: '350px', marginTop: '20px', fontFamily: "'Poppins', sans-serif" }}
                onChange={(e) => handelpassword(e)}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {/* <InputText
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                error={error && error.password}
                value={value2}
                onChange={(e) => handlePass(e)}
              /> */}
             
          </Grid>
          <Grid xs={12}>
            {/* <StyledSmallText style={{ marginTop: '10px' }}>New Password</StyledSmallText> */}
            {/* <Box style={{ position: 'relative' }}> */}
              <TextField
                labelId="demo-simple-select-label"
                name="password"
                id="demo-simple-select"
                label="New Password"
                placeholder="Enter your password"
                style={{ width: '350px', marginTop: '20px', fontFamily: "'Poppins', sans-serif" }}
                onChange={(e) => handelnewpassword(e)}
                type={newShowPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleNewPasswordVisibility} edge="end" aria-label="toggle password visibility">
                        {newShowPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {/* <InputText
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                error={error && error.password}
                value={value3}
                onChange={(e) => handleNewPass(e)}
              /> */}
              {/* <PasswordToggle onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <VisibilityIcon style={{ verticalAlign: 'middle' }} />
                ) : (
                  <VisibilityOffIcon style={{ verticalAlign: 'middle' }} />
                )}
              </PasswordToggle>
            </Box> */}
          </Grid>
          <Grid xs={12}>
            <SaveButton onClick={submitchangepassword} type="submit">
              Change Password
            </SaveButton>
          </Grid>
          {/* {emptyFieldsAlert && (
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
          )} */}
        </Grid>
      </Box>
    </>
  );
};

export default ChangePassword;
