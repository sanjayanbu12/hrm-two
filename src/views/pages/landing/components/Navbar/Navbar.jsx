import React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WhyHrm from "./Navcomponents/WhyHrm";
import Features from "./Navcomponents/Features";
// import Resources from "./Navcomponents/Resources";
import Pricing from "./Navcomponents/Pricing";
import LoginStyle from "./Navcomponents/LoginStyle";
import { Button } from "@mui/material";
import { useState } from "react";
import NavBarMenu from "./Navcomponents/NavBarMenu";
import { Link } from "react-router-dom";  
const Navbar = () => {
  const [openPopper, setOpenPopper] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);




  const Theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "rgba(22, 22, 23, .8)",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={Theme}>
        <AppBar 
          className="darkColor" 
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" , boxShadow: "none" }}
          sx={{ p: "6px" }}
          position="fixed"
          color="primary"
          enableColorOnDark
        >
          <Stack
            direction={"row"}
            sx={{
              padding: "0px 64px",
              justifyContent: "space-between",
              alignItems: "center",
              className : "extra-padding-navbar"
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{
                  textTransform: 'none',
                  background:"none",
                  color: "rgba(255, 255, 255, .8)",
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",                  
                  "&:hover": {
                    background: "none",
                    color: "rgba(255, 255, 255, 1)",
                  },
                }}
              >
                Logo
              </Button>
              <WhyHrm
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                openPopper={openPopper}
                setOpenPopper={setOpenPopper}
              />
              <Features
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                openPopper={openPopper}
                setOpenPopper={setOpenPopper}
              />
              {/* <Resources
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                openPopper={openPopper}
                setOpenPopper={setOpenPopper}
              /> */}
              <Pricing />
            </Stack>
            <Stack direction={"row"} spacing={4} sx={{ alignItems: "center" }}>
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
                  fontSize: "1rem",
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  backgroundColor: "rgb(22, 96, 146)",
                  "&:hover": {
                    backgroundColor: "#F06A6A",
                    color: "black",
                  },
                }}
         
               
              >
                Get Started
              </Button>
              </Link>
              <NavBarMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                openPopper={openPopper}
                setOpenPopper={setOpenPopper}
              />
            </Stack>
          </Stack>
        </AppBar>
      </ThemeProvider>
      <style>
        {
          `
          @media (max-width: 1000px) {
            .extra-padding-navbar{
                padding:0px;
            }
          }
          `
        }
      </style>
    </>
  );
};
export default Navbar;
