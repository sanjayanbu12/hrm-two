import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ApiContext from 'context/api/ApiContext';
import { Grid, TextField, InputAdornment, FormControl,InputLabel,Autocomplete } from '@mui/material';
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
// import Swal from 'sweetalert2';
// import { Select} from '@mui/material';

const Popup = ({ handleClose }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [business, setBusiness] = useState('');
  const [reportingTo, setReportingTo] = useState([]);
  const [claimtype, setClaimtype] = useState('');
  const [transport, setTransport] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});

  const { employeeContextData } = useContext(ApiContext);
  const authId = useSelector((state) => state.customization.authId);
  const [employeeId, setEmployeeId] = useState(null);
  console.log(employeeId);

  const handleFrom = (e) => {
    const value = e.target.value;
    setFrom(value);
    setErrors((prevState) => ({ ...prevState, from: value === to ? 'From and To cannot be the same' : '' }));
  };

  const handleTo = (e) => {
    const value = e.target.value;
    setTo(value);
    setErrors((prevState) => ({ ...prevState, to: value === from ? 'From and To cannot be the same' : '' }));
  };

  const handleStartdate = (e) => {
    setStartdate(e.target.value);
    setErrors((prevState) => ({ ...prevState, startdate: '' }));
    calculateDays(e.target.value, enddate);
  };

  const handleEnddate = (e) => {
    setEnddate(e.target.value);
    setErrors((prevState) => ({ ...prevState, enddate: '' }));
    calculateDays(startdate, e.target.value);
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;

    if (!isNaN(daysDifference) && daysDifference >= 0) {
      setDays(daysDifference);
    } else {
      setDays('');
    }
  };

  const handleBudget = (e) => {
    const input = e.target.value;
    if (!isNaN(input) && input !== '') {
      setBudget(input);
      setErrors((prevState) => ({ ...prevState, budget: '' }));
    } else {
      setErrors((prevState) => ({ ...prevState, budget: 'Budget must be a number' }));
    }
  };

  const handleBusiness = (e) => {
    setBusiness(e.target.value);
    setErrors((prevState) => ({ ...prevState, business: '' }));
  };

  const handleClaimtype = (e) => {
    setClaimtype(e.target.value);
    setErrors((prevState) => ({ ...prevState, claimtype: '' }));
  };

  const handleTransport = (e) => {
    setTransport(e.target.value);
    setErrors((prevState) => ({ ...prevState, transport: '' }));
  };

  const handleFile = (e) => {
    const filesArray = e.files;
    setAttachments(filesArray);
  };

  // const handleFile = (e) => {
  //   const filesArray = e.files || e.target.files;
  //   setAttachments([...filesArray]);
  // };

  // const handleFile = (e) => {
  //   const filesArray = e.files;
  //   if (filesArray && filesArray.length > 0) {
  //     setAttachments(filesArray);
  //   }
  // };

  const handleReportingTo = (e, value) => {
    const selectedData = value.map((item) => ({
      employee: item._id,
      approved: false
    }));
    setReportingTo((prevData) => ({ ...prevData, reportingTo: selectedData }));
    console.log('formDatas', reportingTo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!from.trim()) {
      formErrors.from = 'From field is required';
    }

    if (!to.trim()) {
      formErrors.to = 'To field is required';
    }

    if (!startdate.trim()) {
      formErrors.startdate = 'Start Date is required';
    }

    if (!enddate.trim()) {
      formErrors.enddate = 'End Date is required';
    }

    // if (!days.trim()) {
    //   formErrors.days = 'No Of Days  is required';
    // }

    // if (startdate.trim() && enddate.trim() && !days.trim()) {
    //   formErrors.days = 'No Of Days is required';
    // }

    if (!budget.trim()) {
      formErrors.budget = 'Budget field is required';
    }

    // if (!reportingTo.trim()) {
    //   formErrors.reportingTo = 'ReportingTo field is required';
    // }

    if (!business.trim()) {
      formErrors.business = 'Business Justification field is required';
    }

    if (!claimtype.trim()) {
      formErrors.claimtype = 'Claim Type is required';
    }

    if (!transport.trim()) {
      formErrors.transport = 'Transport Type is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const data = new FormData();
      data.append('employeeid', employeeId);
      data.append('from', from);
      data.append('to', to);
      data.append('startdate', startdate);
      data.append('enddate', enddate);
      data.append('days', days);
      data.append('budget', budget);
      data.append('business', business);
      data.append('reportingTo', JSON.stringify(reportingTo));
      data.append('claimtype', claimtype);
      data.append('transport', transport);
      data.append('attachments', attachments[0]);

      const response = await axios.post('http://localhost:3001/travel/createData', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        setEmployeeId('');
        setFrom('');
        setTo('');
        setStartdate('');
        setEnddate('');
        setDays('');
        setBudget('');
        setBusiness('');
        setReportingTo('');
        setClaimtype('');
        setTransport('');
        setAttachments([]);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchingCorrect = async () => {
      const response = employeeContextData.data;
      if (response && response.length > 0) {
        const filteredData = response.filter((item) => item.employeeid === authId);
        console.log('filteredData', filteredData);
        const employeeIds = filteredData.map((data) => data._id);
        setEmployeeId(employeeIds[0]);
        console.log(employeeIds[0]);
      }
    };

    fetchingCorrect();
  }, [authId, employeeContextData.data]);

  return (
    <div style={{ padding: '0px', margin: '0px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '15px',
            marginTop: '8px'
          }}
        >
          Request Form
        </div>
        <div style={{ cursor: 'pointer', color: 'blue' }}>
          <CancelIcon onClick={handleClose} />
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '0px' }}>
        <Grid container spacing={2} justifyContent="space-evenly" display="flex" maxWidth="498px">
          <Grid item xs={5}>
            <TextField
              id="filled-basic"
              label="From"
              variant="filled"
              value={from}
              onChange={(e) => handleFrom(e)}
              helperText={errors.from}
              error={!!errors.from}
              inputProps={{ style: { height: '10px' } }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="filled-basic"
              label="To"
              variant="filled"
              value={to}
              onChange={(e) => handleTo(e)}
              helperText={errors.to}
              error={!!errors.to}
              inputProps={{ style: { height: '10px' } }}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              id="filled-basic"
              variant="filled"
              type="date"
              value={startdate}
              onChange={(e) => handleStartdate(e)}
              helperText={errors.startdate}
              error={!!errors.startdate}
              inputProps={{ style: { height: '10px', width: '160px' } }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="filled-basic"
              variant="filled"
              type="date"
              value={enddate}
              onChange={(e) => handleEnddate(e)}
              helperText={errors.enddate}
              error={!!errors.enddate}
              inputProps={{ style: { height: '10px', width: '160px' } }}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              id="filled-basic"
              label="Days"
              type="number"
              variant="filled"
              value={days}
              // onChange={(e) => handleDays(e)}
              helperText={errors.days}
              error={!!errors.days}
              inputProps={{ style: { height: '10px' } }}
            />
          </Grid>

          <Grid item xs={5} style={{ marginBottom: 10 }}>
            <TextField
              id="filled-basic"
              label="Estimated Budget"
              variant="filled"
              value={budget}
              onChange={(e) => handleBudget(e)}
              helperText={errors.budget}
              error={!!errors.budget}
              fullwidth
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                style: { height: '45px', marginRight: '7px' }
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={5} style={{ marginBottom: 10, marginLeft: '26px', marginRight: '33px' }}>
          <TextField
            id="filled-basic"
            label="Business Justification"
            variant="filled"
            value={business}
            onChange={(e) => handleBusiness(e)}
            helperText={errors.business}
            error={!!errors.business}
            fullWidth
            inputProps={{ style: { height: '10px' } }}
          />
        </Grid>
        {/* 
        <Grid item xs={5} style={{ marginBottom: 20, marginLeft: '26px', marginRight: '33px' }}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Autocomplete
                      multiple
                      id="filled-basic"
                      variant="filled"
                      options={employeeContextData.data}
                      getOptionLabel={(option) => option.name}
                      defaultValue={[]}
                      onChange={handleReportingTo}
                      filterSelectedOptions
                      renderInput={(params) => <TextField {...params} label="Reporting to" placeholder="Add" />}
                    />        
                </FormControl>
       </Grid> */}

        <Grid item xs={12}>
          <FormControl sx={{ minWidth: '100%' }}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={employeeContextData.data}
              getOptionLabel={(option) => option.name}
              defaultValue={[]}
              onChange={handleReportingTo}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Requesting to" placeholder="Add" />}
            />
          </FormControl>
        </Grid> 

        {/* <Grid item xs={12}>

  <FormControl sx={{ minWidth: '100%' }}>
    <TextField
      id="filled-select-currency-native"
      select
      label="Native select"
      defaultValue={[]}
      SelectProps={{
        native: true,
      }}
      variant="filled"
    >
      {reportingTo.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  </FormControl>
</Grid> */}

        <Grid container spacing={2} justifyContent="space-evenly" display="flex" maxWidth="498px">
          <Grid item xs={5}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              value={claimtype}
              onChange={(e) => handleClaimtype(e)}
              helperText={errors.claimtype}
              error={!!errors.claimtype}
            >
              Claim Type
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="Claim" style={{ marginBottom: '0px' }} control={<Radio size="small" />} label="Claim" />
                <FormControlLabel value="Need Advance" control={<Radio size="small" />} label="Need Advance" />
              </RadioGroup>
            </FormLabel>
          </Grid>

          <Grid item xs={5} style={{ marginBottom: '5px' }}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              value={transport}
              onChange={(e) => handleTransport(e)}
              helperText={errors.transport}
              error={!!errors.transport}
            >
              Mode of Transport
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="Own Vehicle" control={<Radio size="small" />} label="Own Vehicle" />
                <FormControlLabel value="Public Vehicle" control={<Radio size="small" />} label="Public Transport" />
              </RadioGroup>
            </FormLabel>
          </Grid>
        </Grid>

        <Grid justifyContent="flex-start" display="flex" maxWidth="498px" marginLeft="20px" marginBottom="8px">
          <FileUpload
            mode="basic"
            chooseOptions={{ label: 'Attachments', icon: 'pi pi-fw pi-plus' }}
            multiple
            customUpload
            uploadHandler={handleFile}
          />
        </Grid>

        <Grid style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5px', marginBottom: '0px' }}>
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
