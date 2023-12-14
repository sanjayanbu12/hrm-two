import React, { useState } from 'react';
import { Modal } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {InputLabel, Autocomplete} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

const SecondApproval = ({modalOpen, handleClose}) => {
    const[request,SetRequest]=useState("");
    const[secJustification,setSecJustification]=useState([]);


    const { employeeContextData } = useContext(ApiContext);

    const handleSecondApproval = (event, value) => {
        // Check if value is an array before mapping
        if (Array.isArray(value)) {
            const selectedData = value.map((item) => ({
                employee: item._id,
                approved: false,
            }));
            SetRequest((prevData) => ({ ...prevData, SecondRequest: selectedData }));
            console.log("formDatas", request);
        } else {
            console.error("Value is not an array:", value);
        }
    };

    
      const handloeSecondJustification = (e) => { 
        setSecJustification({ ...secJustification, SecondJustification: e.target.value });
      };
  const ButtonContainer = styled('div')({
    marginTop: 'auto',
    alignSelf: 'flex-end',
    marginBottom: '20px',
    marginRight: '10px',
  });

  return (
    <div>
      <Modal
        open={modalOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            minWidth: '498px',
            minHeight: '270px',
            backgroundColor: 'white',
            padding: 10,
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            borderRadius: '10px',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column', // Make it a column layout
          }}
        >
          {/* Cancel icon in the top-right corner */}
          <CancelIcon style={{ alignSelf: 'flex-end' }} onClick={handleClose} />
<div>
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
    onChange={(event, value) => handleSecondApproval(event, value)}
    filterSelectedOptions
    renderInput={(params) => <TextField {...params} label="Requesting to" placeholder="Add" />}
/>
                </FormControl>
    </Grid>
    <Grid item xs={12}> 
          <TextField sx={{ width: '100%' }} label="Business Justification" onChange={handloeSecondJustification}  />
        </Grid>
    
    
    
    
    </Grid>

</div>
         
          <Grid sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
            <ButtonContainer>
              <Button style={{marginLeft:'20px'}} variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button style={{marginRight:'10px'}} variant="contained" >
                Send
              </Button>
            </ButtonContainer>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default SecondApproval;