import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { checkPasswordStrength } from './CheckPasswordStrength';
import PasswordStrengthBar from 'react-password-strength-bar';
const marg0 = { margin: 0, padding: 0 };
const marg1 = { margin: 0, padding: 0, listStyle: 'none' };
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  height: 120,
  margin: '5px 0 0 0',
  padding: '15px 0 10px 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(300, 244, 239, 0.5)',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function PasswordValidator({ password }) {
  const passwordStrength = checkPasswordStrength(password);
  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={6} lg={12} key={index}>
          <ThemeProvider theme={theme}>
            <PasswordStrengthBar password={password} />
            <Box>
              <Item elevation={3}>
                <ul style={marg0}>
                  <li style={marg1}>
                    {passwordStrength.hasLowercase ? <span style={{ color: 'green' }}>✓</span> : <span style={{ color: 'red' }}>✗</span>} At
                    least one lowercase
                  </li>
                  <li style={marg1}>
                    {passwordStrength.hasUppercase ? <span style={{ color: 'green' }}>✓</span> : <span style={{ color: 'red' }}>✗</span>} At
                    least one uppercase
                  </li>
                  <li style={marg1}>
                    {passwordStrength.hasNumeric ? <span style={{ color: 'green' }}>✓</span> : <span style={{ color: 'red' }}>✗</span>} At
                    least one numeric
                  </li>
                  <li style={marg1}>
                    {passwordStrength.hasMinLength ? <span style={{ color: 'green' }}>✓</span> : <span style={{ color: 'red' }}>✗</span>}{' '}
                    Minimum 8 characters
                  </li>
                  <li style={marg1}>
                    {passwordStrength.hasSpecialChar ? <span style={{ color: 'green' }}>✓</span> : <span style={{ color: 'red' }}>✗</span>}{' '}
                    Atleast one special character
                  </li>
                </ul>
              </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
