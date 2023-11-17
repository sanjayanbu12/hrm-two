import React from 'react';
import TextField from '@mui/material/TextField';
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


const Secondstep = () => {
  return (
    <>
      <Grid sx={{ marginTop: '10px', display: "flex", justifyContent: 'center', maxWidth: '600px' }} container spacing={4}>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }} label="Quantity"   type="number"
          InputLabelProps={{
            shrink: true,
          }}/>
        </Grid>
        <Grid item xs={10}>
        <TextField
        sx={{ width: '100%' }}
          label="Approximate Budget"
          id="Approximate Budget"
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
        </Grid>
        <Grid item xs={10}>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="High" control={<Radio sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }} />} label="High" />
        <FormControlLabel  value="Medium" control={<Radio sx={{
          color: yellow[800],
          '&.Mui-checked': {
            color: yellow[600],
          },
        }} />} label="Medium" />
        <FormControlLabel value="Low" control={<Radio sx={{
          color: green[800],
          '&.Mui-checked': {
            color: green[600],
          },
        }} />} label="Low" />
       
      </RadioGroup>
    </FormControl>
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }} label="Business justification" />
        </Grid>
      </Grid>
    </>
  );
}

export default Secondstep;