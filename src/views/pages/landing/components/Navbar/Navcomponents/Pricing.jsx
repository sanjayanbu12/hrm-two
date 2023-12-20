import { React } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const prigingnavigate = useNavigate();

  const navigation = () =>{
    prigingnavigate('/pricing')
  }
  return (
    <div>
      <Button
      onClick={navigation}
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
        Pricing
      </Button>
    </div>
  );
};
export default Pricing;