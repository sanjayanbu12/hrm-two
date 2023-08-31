import React, {  } from 'react';
import {Autocomplete,TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './PopupCard.css';

const PopupSkill = ({ onClose }) => {


  const skills = [
    { label: 'C' },
    { label: 'C++' },
    { label: 'Java' },
    { label: 'Python' },
    { label: 'React JS' },
    { label: 'Node JS' },
  ];
  const level = [
    { label: 'Not Aware' },
    { label: 'Awareness' },
    { label: 'Novice' },
    { label: 'Competent' },
    { label: 'Expert' },
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
          options={skills}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Skills" />}
        />
        </div>
        <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={level}
          sx={{ width: 300, marginTop:"15px" }}
          renderInput={(params) => <TextField {...params} label="Current Skill Level" />}
        />
        </div>
        <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={level}
          sx={{ width: 300, marginTop:"15px" }}
          renderInput={(params) => <TextField {...params} label="Required Skill Level" />}
        />
        </div>
        <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={level}
          sx={{ width: 300, marginTop:"15px" }} 
          renderInput={(params) => <TextField {...params} label="Skill Goal" />}
        />
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

export default PopupSkill;
