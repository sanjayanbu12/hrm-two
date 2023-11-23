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


const Secondstep = ({ setFormData, formData }) => {

  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: e.target.value });
  };

  const handleBudgetChange = (e) => {
    setFormData({ ...formData, approximateBudget: e.target.value });
  };

  const handlePriorityChange = (e) => {
    setFormData({ ...formData, priority: e.target.value });
  };

  const handleQuoteComparisonChange = (e) => {
    setFormData({ ...formData, quoteComparison: e.target.value });
  };
 return (
    <>
      <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px' }} container spacing={4}>
        <Grid item xs={10}>
          <TextField
            sx={{ width: '100%' }}
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleQuantityChange}
            value={formData.quantity || ''}
          />
        </Grid>
        <Grid item xs={10}>
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
        <Grid item xs={10}>
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
        <Grid sx={{ mt: '10px' }} item xs={10}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Whether Quote comparison done with other vendor?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleQuoteComparisonChange}
              value={formData.quoteComparison || ''}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Secondstep;