import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, Box, Button, MenuItem, Select, FormControl, InputLabel, InputAdornment, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { validationSchema } from './Validation';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

const EmployeeForm = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [company, setCompany] = useState('');
  const [dept, setDept] = useState('');
  const [desi, setDesi] = useState('');
  const [mail, setMail] = useState('');
  const [mob, setMob] = useState('');
  const [join, setJoin] = useState('');
  const [report, setReport] = useState('');
  const [dob, setDob] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setMail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      mail: ''
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
  const handleCompany = (e) => {
    setCompany(e.target.value);
    setErrors((prev) => ({
      ...prev,
      company: ''
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

  const handleJoin = (e) => {
    setJoin(e.target.value);
    setErrors((prev) => ({
      ...prev,
      join: ''
    }));
  };
  const handleReport = (e) => {
    setReport(e.target.value);
    setErrors((prev) => ({
      ...prev,
      report: ''
    }));
  };
  const handleDob = (e) => {
    setDob(e.target.value);
    setErrors((prev) => ({
      ...prev,
      dob: ''
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
    fetch('https://hrm-backend-square.onrender.com/api/getEmployee' + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setName(resp.name);
        setLastname(resp.lastname);
        setCompany(resp.company);
        setDept(resp.dept);
        setDesi(resp.desi);
        setMail(resp.mail);
        setMob(resp.mob);
        setJoin(resp.join);
        setReport(resp.report);
        setDob(resp.dob);
        setType(resp.type);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const finalSubmit = async () => {
    if (id) {
      try {
        const updatedtask = {
          name,
          lastname,
          company,
          dept,
          desi,
          mail,
          mob,
          join,
          report,
          dob,
          type
        };

        await validationSchema.validate(
          {
            name,
            lastname,
            company,
            dept,
            desi,
            mail,
            mob,
            join,
            report,
            dob,
            type
          },
          { abortEarly: false }
        );
        await axios.put('https://hrm-backend-square.onrender.com/api/updateEmployee/' + id, updatedtask);

        setName('');
        setLastname('');
        setCompany('');
        setDept('');
        setDesi('');
        setMail('');
        setMob('');
        setJoin('');
        setReport('');
        setDob('');
        setType('');

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
          name,
          lastname,
          gender,
          dept,
          desi,
          mail,
          mob,
          join,
          report,
          dob,
          type,
          employeeid:"ID: "+Math.floor(Math.random()*100000)
        };
        console.log('task', task);

        await validationSchema.validate(
          {
            name,
            lastname,
            company,
            dept,
            desi,
            mail,
            mob,
            join,
            report,
            dob,
            type,
          },
          { abortEarly: false }
        );
        await axios.post('https://hrm-backend-square.onrender.com/api/createEmployee', task);

        setName('');
        setLastname('');
        setCompany('');
        setDept('');
        setDesi('');
        setMail('');
        setMob('');
        setJoin('');
        setReport('');
        setDob('');
        setType('');
        Swal.fire({
          icon: 'success',
          text: 'Employee Created Successfully'
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
    <MainCard title="Employee Self Services">
      <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
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


            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={mail}
                error={errors && errors.mail}
                helperText={errors && errors.mail}
                onChange={(e) => handleEmail(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.company}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  value={company}
                  // error={errors && errors.company}
                  // helperText={errors && errors.company}
                  onChange={(e) => handleCompany(e)}
                >
                  <MenuItem value="MALE">MALE</MenuItem>
                  <MenuItem value="FEMALE">FEMALE</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.company}</FormHelperText>
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
                  // error={errors && errors.dept}
                  // helperText={errors && errors.dept}
                  onChange={(e) => handleDept(e)}
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.dept}</FormHelperText>
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
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="DOB"
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
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  minWidth: '100%',
                  borderRadius: 2,
                  padding: 1.5,
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                  '&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
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