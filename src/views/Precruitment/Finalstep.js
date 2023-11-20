import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TemplateDemo from './FileUpload';

const Finalstep = () => {
  return (
    <>
      <Grid sx={{ marginTop: '10px', display: "flex", justifyContent: 'center', maxWidth: '600px' }} container spacing={3} >
        <Grid item xs={5}>
          <TextField sx={{ width: '100%', ml: '10px' }} label="Vendor Name" />
        </Grid>
        <Grid item xs={7}>
          <TextField sx={{ width: '100%'}} label="If Quote Available, Vendor Number"  InputProps={{
            startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
          }} />
        </Grid>
        <Grid sx={{mt:'10px'}} item xs={11}>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Whether Quote comparison done with other vendor?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Yes" control={<Radio  />} label="Yes" />
        <FormControlLabel  value="No" control={<Radio  />} label="No" />
       
       
      </RadioGroup>
    </FormControl>
        </Grid>
        <Grid sx={{mt:'10px'}} item xs={11}>

<TemplateDemo/>
          </Grid>


      </Grid>
    </>
  )
}

export default Finalstep