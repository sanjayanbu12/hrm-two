import React from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Firststep = ({ setFormData, formData }) => {
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  }; 

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleProductDescriptionChange = (e) => {
    setFormData({ ...formData, productDescription: e.target.value });
  };

  const handleBusinessJustificationChange = (e) => {
    setFormData({ ...formData, businessJustification: e.target.value });
  };
  return (
    <>
      <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px' }} container spacing={4}>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }} label="Name" onChange={handleNameChange}  value={formData.name || ''} />
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }} label="Email" onChange={handleEmailChange} value={formData.email || ''} />
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }} label="Product Description" onChange={handleProductDescriptionChange}  value={formData.productDescription || ''}/>
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }} label="Business justification" onChange={handleBusinessJustificationChange}  value={formData.businessJustification || ''} />
        </Grid>
      </Grid>
    </>
  );
};

export default Firststep