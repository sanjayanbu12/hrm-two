import * as React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  SuperDiv,
  SuperContainer,
  StyledPaper,
  StyledSign,
  StyledTypography,
  StyledBox,
  FormContainer,
  StyledDiv,
  StyledGrid,
  StyledOr,
  StyledTextField,
  StyledButton,
  SocialMediaContainer,
  Separator,
  StyledText,
  StyledRoute,
  StyledDivider
} from './Styled';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Logo from '../assets/Logo';
import GoogleLogo from '../assets/GoogleLogo';
import FackBookLogo from '../assets/FackBookLogo';


const defaultTheme = createTheme();

const Signup = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SuperDiv>
        <SuperContainer component="main">
          <CssBaseline />
          <StyledPaper>
            <StyledDiv>
              <Logo />
            </StyledDiv>
            <StyledSign>
              <Divider>
                <StyledTypography className="auth__name">Sign up</StyledTypography>
              </Divider>
            </StyledSign>
            <StyledBox>
              <FormContainer>
                <StyledGrid container spacing={2}>
                  <StyledGrid item xs={12} sm={6}>
                    <StyledTextField id="firstName" label="First Name" size="small" />
                  </StyledGrid>
                  <StyledGrid item xs={12} sm={6}>
                    <StyledTextField id="lastName" label="Last Name" size="small" />
                  </StyledGrid>
                  <StyledGrid item xs={12}>
                    <StyledTextField id="email" label="Email Address" type="email" size="small" />
                  </StyledGrid>
                  <StyledGrid item xs={12}>
                    <StyledTextField label="Password" type="password" id="password" size="small" />
                  </StyledGrid>
                </StyledGrid>
                <StyledButton type="submit" fullWidth variant="contained" component={Link} to="/pages/login">
                  Sign Up
                </StyledButton>
                <StyledOr>
                <Divider>
                  <Chip label="OR" />
                </Divider>
                </StyledOr>
                <SocialMediaContainer>
                  <GoogleLogo />

                  <Separator />
                  <FackBookLogo />
                </SocialMediaContainer>

                <StyledGrid item xs={12}>
                  <StyledDivider />
                </StyledGrid>
                <StyledGrid item xs={12}>
                  <StyledRoute>
                    
                    <StyledText>Already have an account?</StyledText>
                    <StyledText sm={6} component={Link} to="/pages/login">
                      Signin
                    </StyledText>
                  </StyledRoute>
                </StyledGrid>
              </FormContainer>
            </StyledBox>
          </StyledPaper>
        </SuperContainer>
      </SuperDiv>
    </ThemeProvider>
  );
};

export default Signup;
