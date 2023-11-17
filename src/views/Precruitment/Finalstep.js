import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Finalstep = () => {
  return (
    <>
<Grid sx={{marginTop:'10px',display:"flex",justifyContent:'center',maxWidth:'600px'}} container spacing={4} >
<Grid  item xs={10}>
      <TextField sx={{width:'100%'}} label="Name"  />
      </Grid>
      <Grid item xs={10}>
      <TextField sx={{width:'100%'}} label="Email" />
      </Grid>
      <Grid item xs={10}>
      <TextField sx={{width:'100%'}} label="Product Description" />
      </Grid>

      <Grid item xs={10}>
      <TextField sx={{width:'100%'}} label="Business justification"/>
      </Grid>
     
  
    </Grid>
    </>
  )
}

export default Finalstep