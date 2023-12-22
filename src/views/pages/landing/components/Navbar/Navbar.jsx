import React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WhyHrm from './Navcomponents/WhyHrm';
import Features from './Navcomponents/Features';
// import Resources from "./Navcomponents/Resources";
import Pricing from './Navcomponents/Pricing';
import LoginStyle from './Navcomponents/LoginStyle';
import { Button } from '@mui/material';
import NavBarMenu from './Navcomponents/NavBarMenu';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const FirstPage = useNavigate();

  const FirstPageNavigation = () => {
    FirstPage('/');
  };

  const Theme = createTheme({
    // palette: {
    //   mode: 'dark',
    //   primary: {
    //     main: 'rgba(22, 22, 23, .8)'
    //   }
    // }
  });


  return (
    <>
      <ThemeProvider theme={Theme}>
        <AppBar
          className="darkColor"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', boxShadow: 'none' }}
          sx={{ p: '6px' }}
          position="fixed"
        >
          <Stack
            direction={'row'}
            sx={{
              padding: '0px 64px',
              justifyContent: 'space-between',
              alignItems: 'center',
              className: 'extra-padding-navbar'
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                alignItems: 'center'
              }}
            >
              <Button
                onClick={FirstPageNavigation}
                variant="contained"
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{
                  textTransform: 'none',
                  background: 'none',
                  paddingRight: '0px',
                  paddingLeft: '0px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  '&:hover': {
                    background: 'none',
                  }
                }}
              >
                <img src={Logo} alt="" />
              </Button>
              <WhyHrm />
              <Features />
              {/* <Resources
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                openPopper={openPopper}
                setOpenPopper={setOpenPopper}
              /> */}
              <Pricing />
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{ alignItems: 'center' }}>
              <LoginStyle />
              <Link to="/pages/register/register3">
                <Button
                  variant="contained"
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    color: 'white',
                    fontWeight: '600',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    backgroundColor: 'rgb(22, 96, 146)',
                    '&:hover': {
                      backgroundColor: '#F06A6A',
                      color: 'black'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Link>
              <NavBarMenu />
            </Stack>
          </Stack>
        </AppBar>
      </ThemeProvider>
      <style>
        {`
          @media (max-width: 1000px) {
            .extra-padding-navbar{
                padding:0px;
            }
          }
          `}
      </style>
    </>
  );
};
export default Navbar;
