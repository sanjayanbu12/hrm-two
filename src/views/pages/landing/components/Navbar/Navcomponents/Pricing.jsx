import { React } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomContextHook } from '../../usecontext/CustomContextHook';

const Pricing = () => {
  const pricingnavigate = useNavigate();
  const { openPopper, setValue, setOpenPopper } = CustomContextHook();

  const navigation = (popperName) => {
    pricingnavigate('/pricing');
    if (openPopper !== popperName) {
      setOpenPopper(null);
      document.body.style.overflow = 'unset';
      handleChange();
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
