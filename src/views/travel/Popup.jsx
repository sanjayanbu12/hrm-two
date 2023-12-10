import React, { useState } from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import FormData from 'form-data';

const Popup = ({ handleClose }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [business, setBusiness] = useState('');
  const [claimtype, setClaimtype] = useState('');
  const [transport, setTransport] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleFrom = (e) => {
    setFrom(e.target.value);
  };

  const handleTo = (e) => {
    setTo(e.target.value);
  };

  const handleStartdate = (e) => {
    setStartdate(e.target.value);
  };

  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };

  const handleDays = (e) => {
    setDays(e.target.value);
  };

  const handleBudget = (e) => {
    setBudget(e.target.value);
  };

  const handleBusiness = (e) => {
    setBusiness(e.target.value);
  };

  const handleClaimtype = (e) => {
    setClaimtype(e.target.value);
  };

  const handleTransport = (e) => {
    setTransport(e.target.value);
  };

  const handleFile = (selectedFiles) => {
    const filesArray = Array.from(selectedFiles);
    setAttachments(filesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('from', from);
      data.append('to', to);
      data.append('startdate', startdate);
      data.append('enddate', enddate);
      data.append('days', days);
      data.append('budget', budget);
      data.append('business', business);
      data.append('claimtype', claimtype);
      data.append('transport', transport);
      data.append('attachments', attachments[0]);

      const response = await axios.post('https://hrm-backend-square.onrender.com/travel/createData', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setFrom('');
        setTo('');
        setStartdate('');
        setEnddate('');
        setDays('');
        setBudget('');
        setBusiness('');
        setClaimtype('');
        setTransport('');
        setAttachments([]);
        setSuccess(true);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '0px', margin: '0px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '20px',
            marginTop: '10px'
          }}
        >
          Request Form
        </div>
        <div style={{ cursor: 'pointer', color: 'blue' }}>
          <CancelIcon onClick={handleClose} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="space-evenly" display="flex" maxWidth="498px">
          <Grid item xs={5} style={{ marginBottom: 10 }}>
            <TextField
              id="filled-basic"
              label="From"
              variant="filled"
              value={from}
              onChange={(e) => handleFrom(e)}
              inputProps={{ style: { height: '10px' } }}
            />
          </Grid>
          <Grid item xs={5} style={{ marginBottom: 10 }}>
            <TextField
              id="filled-basic"
              label="To"
              variant="filled"
              value={to}
              onChange={(e) => handleTo(e)}
              inputProps={{ style: { height: '10px' } }}
            />
          </Grid>

          <Grid item xs={5} style={{ marginBottom: 10 }}>
            <TextField
              id="filled-basic"
              variant="filled"
              type="date"
              value={startdate}
              onChange={(e) => handleStartdate(e)}
              inputProps={{ style: { height: '10px', width: '160px' } }}
            />
          </Grid>
          <Grid item xs={5} style={{ marginBottom: 10 }}>
            <TextField
              id="filled-basic"
              variant="filled"
              type="date"
              value={enddate}
              onChange={(e) => handleEnddate(e)}
              inputProps={{ style: { height: '10px', width: '160px' } }}
            />
          </Grid>

          <Grid item xs={5} style={{ marginBottom: 10 }}>
            <TextField
              id="filled-basic"
              label="Days"
              type="number"
              variant="filled"
              value={days}
              onChange={(e) => handleDays(e)}
              inputProps={{ style: { height: '10px' } }}
            />
          </Grid>

          <Grid item xs={5} style={{ marginBottom: 20 }}>
            <TextField
              id="filled-basic"
              label="Estimated Budget"
              variant="filled"
              value={budget}
              onChange={(e) => handleBudget(e)}
              fullwidth
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                style: { height: '45px', marginRight: '7px' }
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={5} style={{ marginBottom: 20, marginLeft: '26px', marginRight: '33px' }}>
          <TextField
            id="filled-basic"
            label="Business Justification"
            variant="filled"
            value={business}
            onChange={(e) => handleBusiness(e)}
            fullWidth
            inputProps={{ style: { height: '10px' } }}
          />
        </Grid>

        <Grid container spacing={2} justifyContent="space-evenly" display="flex" maxWidth="498px">
          <Grid item xs={5} style={{ marginBottom: '10px' }}>
            <FormLabel id="demo-row-radio-buttons-group-label" value={claimtype} onChange={(e) => handleClaimtype(e)}>
              Claim Type
            </FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="claim" style={{ marginBottom: '0px' }} control={<Radio size="small" />} label="Claim" />
              <FormControlLabel value="advance" control={<Radio size="small" />} label="Need Advance" />
            </RadioGroup>
          </Grid>

          <Grid item xs={5} style={{ marginBottom: '10px' }}>
            <FormLabel id="demo-row-radio-buttons-group-label" value={transport} onChange={(e) => handleTransport(e)}>
              Mode of Transport
            </FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="Own" control={<Radio size="small" />} label="Own Vehicle" />
              <FormControlLabel value="Public" control={<Radio size="small" />} label="Public Transport" />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid justifyContent="flex-start" display="flex" maxWidth="498px" marginLeft="20px" marginBottom="10px">
          <FileUpload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="pdf/image/word/*"
            maxFileSize={1000000}
            value={attachments}
            onChange={(e) => handleFile(e)}
          />
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '12px', marginBottom: '0px' }}>
          <Stack spacing={2} direction="row">
            <Button onClick={handleClose} variant="text" size="small">
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button>
          </Stack>
        </Grid>
      </form>
    </div>
  );
};

export default Popup;
