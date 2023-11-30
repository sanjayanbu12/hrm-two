import React from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Firststep = ({ setFormData, formData,name,email }) => {
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  }; 

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setFormData({ ...formData, email: emailValue });

    // Clear the email error when the user starts typing again
    if (formData.emailError && emailValue) {
      setFormData((prevData) => ({ ...prevData, emailError: '' }));
    }
  };
  const handleEmailBlur = () => {
    validateEmail(formData.email);
  };
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!emailRegex.test(email)) {
      setFormData((prevData) => ({ ...prevData, emailError: 'Invalid email format' }));
    } else {
      setFormData((prevData) => ({ ...prevData, emailError: '' }));
    }
  };

  const handleProductDescriptionChange = (e) => { 
    setFormData({ ...formData, productDescription: e.target.value });
  };

  const handleBusinessJustificationChange = (e) => {
    setFormData({ ...formData, businessJustification: e.target.value });
  };
  const isValid = () => {
    return formData.productDescription && !!formData.businessJustification;
  };
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, isValid: isValid() }));
  }, [ formData.productDescription, formData.businessJustification]);

  return (
    <>
      <Grid sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px' }} container spacing={4}>
        <Grid item xs={10}>
          <TextField sx={{ width: '100%' }}  label="Name" onChange={handleNameChange}  value={formData.name || name} />
        </Grid>
        <Grid item xs={10}>
        <TextField
            sx={{ width: '100%' }}
            label="Email"
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            value={formData.email || email}
            error={!!formData.emailError}
            helperText={formData.emailError}

          />
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