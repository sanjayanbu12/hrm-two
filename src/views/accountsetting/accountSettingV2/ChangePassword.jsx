import { React, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
import { InputText, PasswordToggle, SaveButton, StyledSmallText } from './AccountSettingStyled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LOGGED_IN, ADMIN_OR_NOT, USER_OR_NOT, AUTH_ID, USER_ID } from 'store/actions';

const ChangePassword = () => {
  const [value1, setvalue1] = useState('');
  const [value2, setvalue2] = useState('');
  const [value3, setvalue3] = useState('');
  const [error, seterror] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);
  const [emailValidationAlert, setEmailValidationAlert] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailNotVerifiedAlert, setEmailNotVerifiedAlert] = useState(false);
  const [emailNotExistAlert, setEmailNotExistAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setloggedUserData } = useContext(ApiContext);

  const validateLogin = async (e) => {
    e.preventDefault();

    if (!value1 && !value2) {
      setEmptyFieldsAlert(true);
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

  const handleNewPass = (e) => {
    setvalue3(e.target.value);
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
      <Box sx={{ marginLeft: '127px' }}>
        <Grid container flexDirection={'column'}>
          <Grid xs={12}>
            <StyledSmallText>E-mail</StyledSmallText>
            <InputText
              name="email"
              autoComplete="email"
              placeholder="abc@gmail.com"
              type="email"
              value={value1}
              onChange={(e) => handleEmail(e)}
            />
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>Current Password</StyledSmallText>
            <Box style={{ position: 'relative' }}>
              <InputText
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                error={error && error.password}
                value={value2}
                onChange={(e) => handlePass(e)}
              />
              <PasswordToggle onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <VisibilityIcon style={{ verticalAlign: 'middle' }} />
                ) : (
                  <VisibilityOffIcon style={{ verticalAlign: 'middle' }} />
                )}
              </PasswordToggle>
            </Box>
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>New Password</StyledSmallText>
            <Box style={{ position: 'relative' }}>
              <InputText
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                error={error && error.password}
                value={value3}
                onChange={(e) => handleNewPass(e)}
              />
              <PasswordToggle onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <VisibilityIcon style={{ verticalAlign: 'middle' }} />
                ) : (
                  <VisibilityOffIcon style={{ verticalAlign: 'middle' }} />
                )}
              </PasswordToggle>
            </Box>
          </Grid>
          <Grid xs={12}>
            <SaveButton onClick={validateLogin} type="submit">
              Change Password
            </SaveButton>
          </Grid>
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
        </Grid>
      </Box>
    </>
  );
};

export default ChangePassword;
