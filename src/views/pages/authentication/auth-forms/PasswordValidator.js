import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 100,
  margin: '10px 0 0 0',
//   padding: '10px 0 5px 0',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
const passConstraints = ['At least one lowercase', 'At least one uppercase', 'At least one numeric', 'Minimum 8 characters'];
const marg0 = { margin: 0, padding: 0 };
const marg1 = { margin: 0, padding: 0};
export default function PasswordValidator() {
  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={6} lg={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box>
              <Item elevation={3}>
                <ul style={marg0}>
                  {passConstraints.map((constrain, index) => (
                    <li style={marg1} key={index}>
                      {constrain}
                    </li>
                  ))}
                </ul>
              </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
