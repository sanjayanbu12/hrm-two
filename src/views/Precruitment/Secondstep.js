import React from 'react';
import TextField from '@mui/material/TextField';
// import {InputLabel, Autocomplete} from '@mui/material';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { pink } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';



const Secondstep = ({ setFormData, formData }) => {
  const { employeeContextData } = useContext(ApiContext);
  console.log("employeeContextData",employeeContextData.data)

 

  const handleBudgetChange = (e) =>{
    setFormData({ ...formData, approximateBudget: e.target.value });
  };

  const handlePriorityChange = (e) => {
    setFormData({ ...formData, priority: e.target.value });
  };



  const handleVendorNameChange = (e) => {
    setFormData({ ...formData, vendorName: e.target.value });
  };

  const handleVendorNumberChange = (e) => {
    setFormData({ ...formData, vendorNumber: e.target.value });
  };
  const handleReason = (e) => {
    setFormData({ ...formData, Reason: e.target.value });
  };


  const isValid = () => {
    return  !!formData.approximateBudget && formData.priority ;
  };
  
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, isValid: isValid() }));
  }, [formData.quantity, formData.approximateBudget, formData.priority,formData.reportingTo]);
 return (
    <>
      <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px',paddingLeft:'10px',paddingRight:'10px' }} container spacing={3}>
      <Grid item xs={5}>
          <TextField sx={{ width: '100%'}} label="Vendor Name" onChange={handleVendorNameChange}  value={formData.vendorName || ''}/>
        </Grid>
        <Grid item xs={7}>
          <TextField
            sx={{ width: '100%' }}
            label="If Quote Available, Vendor Number"
            InputProps={{
              startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
            }}
            onChange={handleVendorNumberChange}
            value={formData.vendorNumber || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
           onChange={handleReason}
           value={formData.Reason || ''}
          sx={{ width: '100%' }} label="Reason for choosing this "  />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ width: '100%' }}
            label="Approximate Budget"
            id="Approximate Budget"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            onChange={handleBudgetChange}
            value={formData.approximateBudget || ''}
          />
        </Grid>
        <Grid item xs={11} sx={{mt:'15px'}}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handlePriorityChange}
              value={formData.priority || ''}
            >
              <FormControlLabel value="High" control={<Radio sx={{ color: pink[800] }} />} label="High" />
              <FormControlLabel value="Medium" control={<Radio sx={{ color: yellow[800] }} />} label="Medium" />
              <FormControlLabel value="Low" control={<Radio sx={{ color: green[800] }} />} label="Low" />
            </RadioGroup>
          </FormControl>
        </Grid>
        
      </Grid>
    </>
  );
};

export default Secondstep;