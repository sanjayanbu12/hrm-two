import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, Box, Button, MenuItem, Select, FormControl, InputLabel, InputAdornment, FormHelperText } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { validationSchema } from './Validation';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { updatevalidationSchema } from './updateValidate';
import TableViewIcon from '@mui/icons-material/TableView';

const EmployeeForm = () => {
  // const theme = useTheme();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [email, seteMail] = useState('');
  const [mob, setMob] = useState('');
  const [altmob, setaltMob] = useState('');
  const [peraddress, setperAddress] = useState('');
  const [temaddress, settemAddress] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [dept, setDept] = useState('');
  const [desi, setDesi] = useState('');
  const [join, setJoin] = useState('');
  const [report, setReport] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [fathername, setFathername] = useState('');
  const [nationality, setNationality] = useState('');
  const [placeofbirth, setPlaceofbirth] = useState('');
  const [religion, setReligion] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    seteMail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: ''
    }));
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setErrors((prev) => ({
      ...prev,
      title: ''
    }));
  };
  const handleName = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({
      ...prev,
      name: ''
    }));
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
    setErrors((prev) => ({
      ...prev,
      lastname: ''
    }));
  };
  const handleGender = (e) => {
    setGender(e.target.value);
    setErrors((prev) => ({
      ...prev,
      gender: ''
    }));
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
    setErrors((prev) => ({
      ...prev,
      status: ''
    }));
  };
  const handleDept = (e) => {
    setDept(e.target.value);
    setErrors((prev) => ({
      ...prev,
      dept: ''
    }));
  };
  const handleDesi = (e) => {
    setDesi(e.target.value);
    setErrors((prev) => ({
      ...prev,
      desi: ''
    }));
  };
  const handleMob = (e) => {
    setMob(e.target.value);
    setErrors((prev) => ({
      ...prev,
      mob: ''
    }));
  };
  const handleBloodgroup = (e) => {
    setBloodgroup(e.target.value);
    setErrors((prev) => ({
      ...prev,
      bloodgroup: ''
    }));
  };
  const handleperAddress = (e) => {
    setperAddress(e.target.value);
    setErrors((prev) => ({
      ...prev,
      peraddress: ''
    }));
  };
  const handletemAddress = (e) => {
    settemAddress(e.target.value);
    setErrors((prev) => ({
      ...prev,
      temaddress: ''
    }));
  };

  const handlealtMob = (e) => {
    setaltMob(e.target.value);
    setErrors((prev) => ({
      ...prev,
      altmob: ''
    }));
  };
  const handleJoin = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
    if (selectedDate < currentDate) {
      setErrors((prev) => ({
        ...prev,
        join: 'Please select a future date'
      }));
    } else {
      setJoin(selectedDate);
      setErrors((prev) => ({
        ...prev,
        join: ''
      }));
    }
  };

  const handleReport = (e) => {
    setReport(e.target.value);
    setErrors((prev) => ({
      ...prev,
      report: ''
    }));
  };
  const handleDob = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const age = currentDate.getFullYear() - selectedDateObj.getFullYear();

    if (age < 18) {
      setErrors((prev) => ({
        ...prev,
        dob: 'You must be at least 18 years old'
      }));
    } else {
      setDob(selectedDate);
      setErrors((prev) => ({
        ...prev,
        dob: ''
      }));
    }
  };
  const handleFathername = (e) => {
    setFathername(e.target.value);
    setErrors((prev) => ({
      ...prev,
      fathername: ''
    }));
  };
  const handleNationality = (e) => {
    setNationality(e.target.value);
    setErrors((prev) => ({
      ...prev,
      nationality: ''
    }));
  };
  const handlePlaceofbirth = (e) => {
    setPlaceofbirth(e.target.value);
    setErrors((prev) => ({
      ...prev,
      placeofbirth: ''
    }));
  };
  const handleReligion = (e) => {
    setReligion(e.target.value);
    setErrors((prev) => ({
      ...prev,
      religion: ''
    }));
  };
  const handleType = (e) => {
    setType(e.target.value);
    setErrors((prev) => ({
      ...prev,
      type: ''
    }));
  };

  useEffect(() => {
    fetch('https://hrm-backend-square.onrender.com/api/getemployee/' + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setName(data.name);
        setLastname(data.lastname);
        setGender(data.gender);
        setDept(data.dept);
        setDesi(data.desi);
        seteMail(data.email);
        setMob(data.mob);
        setaltMob(data.altmob);
        setperAddress(data.peraddress);
        settemAddress(data.temaddress);
        setBloodgroup(data.bloodgroup);
        setJoin(data.join);
        setReport(data.report);
        setDob(data.dob);
        setFathername(data.fathername);
        setNationality(data.nationality);
        setPlaceofbirth(data.placeofbirth);
        setReligion(data.religion);
        setType(data.type);
        setStatus(data.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const finalSubmit = async () => {
    if (id) {
      try {
        const updatedtask = {
          title,
          name,
          lastname,
          gender,
          email,
          dob,
          mob,
          altmob,
          dept,
          desi,
          peraddress,
          temaddress,
          bloodgroup,
          join,
          report,
          fathername,
          nationality,
          placeofbirth,
          religion,
          type,
          status
        };

        await updatevalidationSchema.validate(
          {
            title,
            name,
            lastname,
            gender,
            dept,
            desi,
            email,
           
            mob,
            altmob,
            peraddress,
            temaddress,
            bloodgroup,
            join,
            report,
            dob,
           
            fathername,
            nationality,
            placeofbirth,
            religion,
            type,
            status
          },
          { abortEarly: false }
        );
        await axios.put('https://hrm-backend-square.onrender.com/api/updateemployee/' + id, updatedtask);
        setTitle('');
        setName('');
        setLastname('');
        setGender('');
        setDept('');
        setDesi('');
        seteMail('');

        setMob('');
        setaltMob(''), setperAddress(''), settemAddress(''), setBloodgroup(''), setJoin('');
        setReport('');
        setDob('');
       
        setFathername('');
        setNationality('');
        setPlaceofbirth('');
        setReligion('');
        setType('');
        setStatus('');

        Swal.fire({
          icon: 'success',
          text: 'Employee Updated Successfully'
        }).then(() => {
          navigate('/Addemployeetable');
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors = {};
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
            console.log(validationErrors);
          });
          setErrors(validationErrors);
        } else {
          console.log(error);
        }
      }
    } else {
      try {
        const task = {
          title,
          name,
          lastname,
          gender,
          email,
          
          dob,
        
          fathername,
          nationality,
          mob,
          altmob,
          dept,
          desi,
          peraddress,
          temaddress,
          bloodgroup,
          join,
          report,
          placeofbirth,
          religion,
          type,
          status
          // employeeid: 'ID: ' + Math.floor(Math.random() * 100000)
        };
        console.log('task', task);

        await validationSchema.validate(
          {
            title,
            name,
            lastname,
            gender,
            altmob,
            dept,
            desi,
            email,
            peremail,
            mob,
            peraddress,
            temaddress,
            bloodgroup,
            join,
            report,
            dob,
            fathername,
            nationality,
            placeofbirth,
            religion,
            type,
            status
          },
          { abortEarly: false }
        );
        await axios.post('https://hrm-backend-square.onrender.com/api/addemployee', task);
        setTitle('');
        setName('');
        setLastname('');
        setGender('');
        setDept('');
        setDesi('');
        seteMail('');
       
        setMob('');
        setaltMob(''), setperAddress(''), settemAddress(''), setBloodgroup(''), setJoin('');
        setReport('');
        setDob('');
      
        setFathername('');
        setNationality('');
        setPlaceofbirth('');
        setReligion('');
        setType('');
        setStatus('');
        Swal.fire({
          icon: 'success',
          text: 'Employee Information'
        }).then(() => {
          navigate('/Addemployeetable');
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors = {};
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
            console.log(validationErrors);
          });
          setErrors(validationErrors);
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <MainCard title="Employee Information">
      <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
        <Button
          onClick={() => navigate(`/Addemployeetable`)}
          sx={{
            padding: 1.5,
            background: 'rgba(33, 150, 243, 0.04)',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '0px',
            marginBottom: '20px'
          }}
        >
          <TableViewIcon />
          Employee List
        </Button>
      </Box>
      <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.title}>
                <InputLabel id="demo-simple-select-label">Title</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Title"
                  value={title}
                  error={errors && errors.title}
                  helperText={errors && errors.title}
                  onChange={(e) => handleTitle(e)}
                >
                  <MenuItem value="MR">MR</MenuItem>
                  <MenuItem value="MRS">MRS</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.title}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                value={name}
                error={errors && errors.name}
                helperText={errors && errors.name}
                onChange={(e) => handleName(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={lastname}
                error={errors && errors.lastname}
                helperText={errors && errors.lastname}
                onChange={(e) => handleLastname(e)}
              />
            </Grid>

            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.gender}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  value={gender}
                  onChange={(e) => handleGender(e)}
                >
                  <MenuItem value="MALE">MALE</MenuItem>
                  <MenuItem value="FEMALE">FEMALE</MenuItem>
                  <MenuItem value="OTHERS">OTHERS</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.gender}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Mobile"
                variant="outlined"
                value={mob}
                error={errors && errors.mob}
                helperText={errors && errors.mob}
                onChange={(e) => handleMob(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label=" Alternate Mobile"
                variant="outlined"
                value={altmob}
                error={errors && errors.altmob}
                helperText={errors && errors.altmob}
                onChange={(e) => handlealtMob(e)}
              />
            </Grid>

            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                error={errors && errors.email}
                helperText={errors && errors.email}
                onChange={(e) => handleEmail(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Date Of Birth"
                variant="outlined"
                type="date"
                value={dob}
                error={errors && errors.dob}
                helperText={errors && errors.dob}
                onChange={(e) => handleDob(e)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.bloodgroup}>
                <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Blood Group"
                  value={bloodgroup}
                  error={errors && errors.bloodgroup}
                  helperText={errors && errors.bloodgroup}
                  onChange={(e) => handleBloodgroup(e)}
                >
                  <MenuItem value="A+VE">A+VE</MenuItem>
                  <MenuItem value="A-VE">A-VE</MenuItem>
                  <MenuItem value="B+VE">B+VE</MenuItem>
                  <MenuItem value="B-VE">B-VE</MenuItem>
                  <MenuItem value="O+VE">O+VE</MenuItem>
                  <MenuItem value="O-VE">O-VE</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.bloodgroup}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Father`s Name"
                variant="outlined"
                value={fathername}
                error={errors && errors.fathername}
                helperText={errors && errors.fathername}
                onChange={(e) => handleFathername(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Nationality"
                variant="outlined"
                value={nationality}
                error={errors && errors.nationality}
                helperText={errors && errors.nationality}
                onChange={(e) => handleNationality(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Place of Birth"
                variant="outlined"
                value={placeofbirth}
                error={errors && errors.placeofbirth}
                helperText={errors && errors.placeofbirth}
                onChange={(e) => handlePlaceofbirth(e)}
              />
            </Grid>

            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Religion"
                variant="outlined"
                value={religion}
                error={errors && errors.religion}
                helperText={errors && errors.religion}
                onChange={(e) => handleReligion(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-start-adornment"
                label="Joining Date"
                variant="outlined"
                type="date"
                value={join}
                error={errors && errors.join}
                helperText={errors && errors.join}
                onChange={(e) => handleJoin(e)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
              />
            </Grid>

            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.status}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value={status}
                  error={errors && errors.status}
                  helperText={errors && errors.status}
                  onChange={(e) => handleStatus(e)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.status}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.dept}>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Department"
                  value={dept}
                  error={errors && errors.dept}
                  helperText={errors && errors.dept}
                  onChange={(e) => handleDept(e)}
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Developing">Developing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.dept}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.desi}>
                <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Designation"
                  value={desi}
                  // error={errors && errors.desi}
                  // helperText={errors && errors.desi}
                  onChange={(e) => handleDesi(e)}
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Software Developer">Software Developer</MenuItem>
                  <MenuItem value="AWS">AWS</MenuItem>
                  <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                  <MenuItem value="Audit">Audit</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.desi}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: 25 }}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Permanent Address"
                variant="outlined"
                value={peraddress}
                error={errors && errors.peraddress}
                helperText={errors && errors.peraddress}
                onChange={(e) => handleperAddress(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Temporary Address"
                variant="outlined"
                value={temaddress}
                error={errors && errors.temaddress}
                helperText={errors && errors.temaddress}
                onChange={(e) => handletemAddress(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.report}>
                <InputLabel id="demo-simple-select-label">Reporting To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Reporting To"
                  value={report}
                  // error={errors && errors.report}
                  // helperText={errors && errors.report}
                  onChange={(e) => handleReport(e)}
                >
                  <MenuItem value="Jothi Mani">Jothi Mani</MenuItem>
                  <MenuItem value="Prem">Prem</MenuItem>
                  <MenuItem value="Priya">Priya</MenuItem>
                  <MenuItem value="Gayathri">Gayathri</MenuItem>
                  <MenuItem value="Harish">Harish</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.report}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.type}>
                <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Work Type"
                  value={type}
                  // error={errors && errors.type}
                  // helperText={errors && errors.type}
                  onChange={(e) => handleType(e)}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Contract work">Contract Work</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.type}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  minWidth: '100%',
                  // borderRadius: 2,
                  marginTop: '40px',
                  padding: 1.5,
                  // background: theme.palette.secondary.dark,
                  // color: theme.palette.secondary.light,
                  '&:hover': {
                    // background: theme.palette.secondary.dark,
                    // color: theme.palette.secondary.light
                  }
                }}
                onClick={(e) => finalSubmit(e)}
              >
                {id ? 'Update' : 'Save'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default EmployeeForm;