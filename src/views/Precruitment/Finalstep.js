import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TemplateDemo from './FileUpload';
import {InputLabel, Autocomplete} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import { useEffect } from 'react';

const Finalstep = ({ setFormData, formData }) => {
  
  const { employeeContextData } = useContext(ApiContext);

  const handleProct = (e, value) => {
    const selectedData = value.map((item) => ({
      employee: item._id,
      approved: false,
    }));
    setFormData((prevData) => ({ ...prevData, reportingTo: selectedData }));
    console.log("formDatas",formData)
  };
  
  const handleFileSelect = (files) => {
    console.log('fileupload',files)
    setFormData({ ...formData, attachments: files[0] });
  };

  const handleIssuesChange = (e) => { 
    setFormData({ ...formData, issues: e.target.value });
  };
 
  const isValid = () => {
    return  formData.reportingTo ;
  };
  
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, isValid: isValid() }));
  }, [formData.reportingTo,formData.attachments]);
  return (
    <>
       <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '580px',paddingLeft:'10px',paddingRight:'10px' }} container spacing={1}>
      <Grid item xs={12}>
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
                      renderInput={(params) => <TextField {...params} label="Requesting to" placeholder="Add" />}
                    />
                </FormControl>
    </Grid>
     <Grid item xs={12}> 
          <TextField sx={{ width: '100%' }} label="Any Other Issues?" onChange={handleIssuesChange}  value={formData.issues|| ''}/>
        </Grid>
      
        <Grid sx={{ mt: '5px' }} item xs={12}>
          <TemplateDemo onFileSelect={handleFileSelect} />
        </Grid>
      </Grid>
    </>
  );
};

export default Finalstep;