import React from "react";

import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LoginStyle = () => {
  return (
    <Box>
      <Link to="/pages/login/login3">
      <Button

        variant="contained"
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{
          textTransform: 'none',
          fontSize: "1rem",
          fontWeight: "600",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          background:"none",
          color: "rgba(255, 255, 255, .8)",
          "&:hover": {
            background: "none",
            color: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        Log In
      </Button>
      </Link>
    </Box>
  );
};
export default LoginStyle;