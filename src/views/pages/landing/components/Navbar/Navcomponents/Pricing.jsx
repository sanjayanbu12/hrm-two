import { React } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const pricingnavigate = useNavigate();

  const navigation = () => {
    pricingnavigate('/pricing');
  };
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
          fontSize: '1rem',
          background: 'none',
          color: 'rgba(255, 255, 255, .8)',
          '&:hover': {
            background: 'none',
            color: 'rgba(255, 255, 255, 1)'
          }
        }}
      >
        Pricing
      </Button>
    </div>
  );
};
export default Pricing;
