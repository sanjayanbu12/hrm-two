import React from 'react';
import TextField from '@mui/material/TextField';
import {InputLabel, Autocomplete} from '@mui/material';
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

  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: e.target.value });
  };

  const handleBudgetChange = (e) =>{
    setFormData({ ...formData, approximateBudget: e.target.value });
  };

  const handlePriorityChange = (e) => {
    setFormData({ ...formData, priority: e.target.value });
  };

  const handleProct = (e, value) => {
    const selectedData = value.map((item) => ({
      employee: item._id,
      approved: false,
    }));
    setFormData((prevData) => ({ ...prevData, reportingTo: selectedData }));
    console.log("formDatas",formData)
  };



  const isValid = () => {
    return !!formData.quantity && !!formData.approximateBudget && !!formData.priority&& !!formData.reportingTo;
  };
  
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, isValid: isValid() }));
  }, [formData.quantity, formData.approximateBudget, formData.priority,formData.reportingTo]);
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
        <Grid item xs={10}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={employeeContextData.data}
                      getOptionLabel={(option) => option.name}
                      defaultValue={[]}
                      onChange={handleProct}
                      filterSelectedOptions
                      renderInput={(params) => <TextField {...params} label="Reporting to" placeholder="Add" />}
                    />
                 
                   
                
                </FormControl>
              </Grid>
      </Grid>
    </>
  );
};

export default Secondstep;