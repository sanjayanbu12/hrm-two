import { React, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
import { SaveButton } from './AccountSettingStyled';
import axios from 'axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useContext } from 'react';
import { useEffect } from 'react';
import ApiContext from 'context/api/ApiContext';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [showemail, setShowemail] = useState('');
  const [password, setpassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmNewpassword, setConfirmNewpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { employeeContextData } = useContext(ApiContext);
  const user = useSelector((state) => state.customization.authId);
  const [passwordMissmatchError, setPasswordMissMatchError] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await employeeContextData;
        const allEmployeeData = response.data;
        const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === user);
        setShowemail(specificEmployee.email);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchdata();
  }, [employeeContextData]);

  const handelpassword = (e) => {
    setpassword(e.target.value);
  };

  const handelnewpassword = (e) => {
    setnewpassword(e.target.value);
  };

  const handelconfirmnewpassword = (e) => {
    setConfirmNewpassword(e.target.value);
  };

  const submitchangepassword = async () => {
    setIsLoading(true);

    if (!password) {
      setIsLoading(false);
      toast.error('Please enter your password.');
      return;
    }

    if (confirmNewpassword !== newpassword) {
      setPasswordMissMatchError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    setPasswordMissMatchError('');

    try {
      const alldata = {
        email: showemail,
        password,
        newpassword
      };

      const res = await axios.put('https://hrm-backend-square.onrender.com/auth/updatenewpassword', alldata);
      if (res.status === 200) {
        document.getElementById('demo-simple-select').value = '';
        document.getElementById('demo-simple-select1').value = '';
        document.getElementById('demo-simple-select2').value = '';
        toast.success(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('error: ', error);
      if (error.response && error.response.status === 400) {
        toast.error('Incorrect password. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setOldPassword((x) => !x);
  };
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
              name="password"
              id="demo-simple-select"
              label="Old Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              style={{ width: '350px', marginTop: '20px', fontFamily: "'Poppins', sans-serif" }}
              onChange={(e) => handelpassword(e)}
              type={oldPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleOldPasswordVisibility} edge="end" aria-label="toggle password visibility">
                      {oldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              labelId="demo-simple-select-label"
              name="password"
              id="demo-simple-select1"
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
          </Grid>
          <ToastContainer />
          <Grid xs={12}>
            <TextField
              labelId="demo-simple-select-label"
              name="password"
              id="demo-simple-select2"
              label="Confirm New Password"
              placeholder="Enter your password"
              style={{ width: '350px', marginTop: '20px', fontFamily: "'Poppins', sans-serif" }}
              onChange={(e) => handelconfirmnewpassword(e)}
              error={passwordMissmatchError !== ''}
              helperText={passwordMissmatchError}
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
          </Grid>
          <Grid xs={12}>
            <SaveButton disabled={isLoading} onClick={() => submitchangepassword()} type="submit">
              {isLoading ? <CircularProgress style={{ verticalAlign: 'middle' }} size={24} /> : 'Change Password'}
            </SaveButton>
          </Grid>
          {/* {passwordError && (
            <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
              <Alert variant="filled" severity="error">
                {password ? 'Password is incorrect' : 'Please enter your password'}
              </Alert>
            </Stack>
          )} */}
        </Grid>
      </Box>
    </>
  );
};

export default ChangePassword;
