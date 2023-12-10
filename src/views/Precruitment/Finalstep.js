import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TemplateDemo from './FileUpload';
import {InputLabel, Autocomplete} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

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
 

  return (
    <>
      <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px' }}  spacing={2}>
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
                      renderInput={(params) => <TextField {...params} label="Reporting to" placeholder="Add" />}
                    />
                 
                </FormControl>
              </Grid>
      
    

        <Grid sx={{ mt: '10px' }} item xs={11}>
          <TemplateDemo onFileSelect={handleFileSelect} />
        </Grid>
      </Grid>
    </>
  );
};

export default Finalstep;