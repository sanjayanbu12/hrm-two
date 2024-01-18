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
    setFormData({ ...formData, productname: e.target.value });
  };
  const handleSPecificationChange = (e) => { 
    setFormData({ ...formData, Specification: e.target.value });
  };

  const handleBusinessJustificationChange = (e) => {
    setFormData({ ...formData, businessJustification: e.target.value });
  };
  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: e.target.value });
  };
  const handleProductLinkChange = (e) => {
    setFormData({ ...formData, productLink: e.target.value });
  };
  const isValid = () => {
    return formData.productname &&formData.Specification && formData.businessJustification && formData.quantity;
  };
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, isValid: isValid() }));
  }, [ formData.productname, formData.businessJustification,formData.Specification,formData.quantity]);

  return (
    <>
      <Grid  sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', maxWidth: '600px',paddingLeft:'10px',paddingRight:'10px'}} container spacing={3}>
        <Grid item xs={6} >
          <TextField sx={{ width: '100%' }}  label="Name" onChange={handleNameChange}  value={formData.name || name} />
        </Grid>
        <Grid item xs={6}>
        <TextField
            sx={{ width:'100%'}}
            label="Email"
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            value={formData.email || email}
            error={!!formData.emailError}
            helperText={formData.emailError}

          />
        </Grid>
        <Grid item xs={6}> 
          <TextField sx={{ width: '100%' }} label="Product Name" onChange={handleProductDescriptionChange}  value={formData.productname || ''}/>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={12}> 
          <TextField sx={{ width: '100%' }} label="Product Specification" onChange={handleSPecificationChange}  value={formData.Specification|| ''}/>
        </Grid>
        
        <Grid item xs={12}>
          <TextField sx={{ width: '100%' }} label="Business justification" onChange={handleBusinessJustificationChange}  value={formData.businessJustification || ''} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ width: '100%' }}
            label="Product Link"
            onChange={handleProductLinkChange}
            value={formData.productLink || ''}
          />
        </Grid>
      
      </Grid>
    </>
  );
};

export default Firststep