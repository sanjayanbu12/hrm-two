import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TemplateDemo from './FileUpload';
import { useEffect } from 'react';

const Finalstep = ({ setFormData, formData }) => {
  const handleVendorNameChange = (e) => {
    setFormData({ ...formData, vendorName: e.target.value });
  };

  const handleVendorNumberChange = (e) => {
    setFormData({ ...formData, vendorNumber: e.target.value });
  };

  const handleProductLinkChange = (e) => {
    setFormData({ ...formData, productLink: e.target.value });
  };
  
  const handleFileSelect = (files) => {
    console.log('fileupload',files)
    setFormData({ ...formData, attachments: files[0] });
  };
  const isValid = () => {
    return !!formData.vendorName && !!formData.vendorNumber && !!formData.productLink;
  };
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, isValid: isValid() }));
  }, [formData.vendorName, formData.vendorNumber, formData.productLink]);

  return (
    <>
      <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px' }} container spacing={3}>
        <Grid item xs={5}>
          <TextField sx={{ width: '100%', ml: '10px' }} label="Vendor Name" onChange={handleVendorNameChange}  value={formData.vendorName || ''}/>
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
            sx={{ width: '98%', ml: '10px' }}
            label="Product Link"
            type="link"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleProductLinkChange}
            value={formData.productLink || ''}
          />
        </Grid>
        <Grid sx={{ mt: '10px' }} item xs={11}>
          <TemplateDemo onFileSelect={handleFileSelect} />
        </Grid>
      </Grid>
    </>
  );
};

export default Finalstep;