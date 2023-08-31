import React, {  } from 'react';
import {Autocomplete,Rating,TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './PopupCard.css';

const PopupCard = ({ onClose }) => {


  const empnames = [
    { label: 'Sridhar S' },
    { label: 'Ajay S' },
    { label: 'Ajay B' },
    { label: 'Naveena ' },
    { label: 'Varadharajan' },
    { label: 'Sanjay' },
  ];

  return (
    <div className="popup-container">
      <div className="popup-card" >
        <div style={{display:"flex",}}>
        <h2>Give Feedbacks</h2>
        <IconButton sx={{ marginLeft:"110px" }} onClick={onClose} aria-label="SVG Icon Button">
            <CloseIcon />
          </IconButton>   
          </div>
        <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={empnames}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Employees" />}
        />
        </div>
        <div style={{marginLeft:"10px", marginTop:"10px"}}>
        <Rating alignItems="left" name="controlled"   />
        </div>
        <div>
        <TextField id="outlined-basic" label="Comment" variant="outlined" display="flex" sx={{ width:"100%", marginTop:"10px"}}/>
        </div>

        <div style={{marginTop:"10px", padding:"10px",display:"flex", gap:"20px", justifyContent:"center"}}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Submit
        </Button>
            </div>
      </div>

    </div>
  );
};

export default PopupCard;
