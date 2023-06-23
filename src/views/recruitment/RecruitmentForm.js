import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, Box, Button, MenuItem, Select, FormControl, InputLabel, InputAdornment, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import validationSchema from '../recruitment/RecruitmentValidation';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

const RecruitmentForm = () => {
  const theme = useTheme();
  const [Jobrole, setJobrole] = useState('');
  const [Openings, setOpenings] = useState('');
  const [Company, setCompany] = useState('');
  const [Status, setStatus] = useState('');
  const [Description, setDescription] = useState('');
  const [Requirements, setRequirements] = useState('');
  const [Experience, setExperience] = useState('');
  const [Deadline, setDeadline] = useState('');
  const [Worktype, setWorktype] = useState('');
  const [Skills, setSkills] = useState('');
  const [Education, setEducation] = useState('');
  const [errors, setErrors] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRequirements = (e) => {
    setRequirements(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Requirements: ''
    }));
  };
  const handleWorktype = (e) => {
    setWorktype(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Experirence: ''
    }));
  };
  const handleJobrole = (e) => {
    setJobrole(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Jobrole: ''
    }));
  };
  const handleOpenings = (e) => {
    setOpenings(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Openings: ''
    }));
  };
  const handleCompany = (e) => {
    setCompany(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Company: ''
    }));
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Status: ''
    }));
  };
  const handleEducation = (e) => {
    setEducation(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Status: ''
    }));
  };
  const handleSkills = (e) => {
    setSkills(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Status: ''
    }));
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Description: ''
    }));
  };
  const handleExperience = (e) => {
    setExperience(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Experience: ''
    }));
  };
  const handleDeadline = (e) => {
    setDeadline(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Deadline: ''
    }));
  };
  useEffect(() => {
    fetch('http://localhost:3002/recruitform/' + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setJobrole(resp.Jobrole);
        setOpenings(resp.Openings);
        setCompany(resp.Company);
        setStatus(resp.Status);
        setDescription(resp.Description);
        setRequirements(resp.Requirements);
        setExperience(resp.Experience);
        setDeadline(resp.Deadline);
        setWorktype(resp.Worktype);
        setSkills(resp.Skills);
        setEducation(resp.Education);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const finalSubmit = async () => {
    if (id) {
      try {
        const updatedtask = {
          Jobrole,
          Openings,
          Company,
          Status,
          Description,
          Requirements,
          Experience,
          Deadline,
          Worktype,
          Skills,
          Education
        };

        await validationSchema.validate(
          {
            Jobrole,
            Openings,
            Company,
            Status,
            Description,
            Requirements,
            Experience,
            Deadline,
            Worktype,
            Skills,
            Education
          },
          { abortEarly: false }
        );
        await axios.put('http://localhost:3002/recruitform/' + id, updatedtask);
        setJobrole('');
        setOpenings('');
        setCompany('');
        setStatus('');
        setDescription('');
        setRequirements('');
        setExperience('');
        setDeadline('');
        setWorktype('');
        setSkills('');
        setEducation('');

        Swal.fire({
          icon: 'success',
          text: 'Updated Successfully'
        }).then(() => {
          navigate('/RecruitmentTable');
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
          Jobrole,
          Openings,
          Company,
          Status,
          Description,
          Requirements,
          Experience,
          Deadline,
          Worktype,
          Skills,
          Education
        };
        console.log('task', task);

        await validationSchema.validate(
          {
            Jobrole,
            Openings,
            Company,
            Status,
            Description,
            Requirements,
            Experience,
            Deadline,
            Worktype,
            Skills,
            Education
          },
          { abortEarly: false }
        );
        await axios.post('http://localhost:3002/recruitform', task);

        setJobrole('');
        setOpenings('');
        setCompany('');
        setStatus('');
        setDescription('');
        setRequirements('');
        setExperience('');
        setDeadline('');
        setWorktype('');
        setSkills('');
        setEducation('');
        Swal.fire({
          icon: 'success',
          text: 'Add Recruitment'
        }).then(() => {
          navigate('/RecruitmentTable');
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
    <MainCard title="Recruitment Form">
      <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Worktype}>
                <InputLabel id="demo-simple-select-label">Jobrole</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Jobrole"
                  value={Jobrole}
                  // error={errors && errors.Status}
                  // helperText={errors && errors.Status}
                  onChange={(e) => handleJobrole(e)}
                >
                  <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Software Associate">Software Associate</MenuItem>
                  <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Worktype}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="No of Openings"
                variant="outlined"
                value={Openings}
                type="number"
                error={errors && errors.Openings}
                helperText={errors && errors.Openings}
                onChange={(e) => handleOpenings(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Worktype}>
                <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Work Type"
                  value={Worktype}
                  // error={errors && errors.Status}
                  // helperText={errors && errors.Status}
                  onChange={(e) => handleWorktype(e)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Full time">Full Time</MenuItem>
                  <MenuItem value="Trainee">Trainee</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Worktype}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Company}>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Company"
                  value={Company}
                  // error={errors && errors.Company}
                  // helperText={errors && errors.Company}
                  onChange={(e) => handleCompany(e)}
                >
                  <MenuItem value="Sns Square">SNS Square</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Company}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-start-adornment"
                label="Deadline"
                variant="outlined"
                type="date"
                value={Deadline}
                error={errors && errors.Deadline}
                helperText={errors && errors.Deadline}
                onChange={(e) => handleDeadline(e)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Status}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value={Status}
                  // error={errors && errors.Status}
                  // helperText={errors && errors.Status}
                  onChange={(e) => handleStatus(e)}
                >
                  <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                  <MenuItem value="Progress">Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Status}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Description}>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Education"
                  value={Education}
                  type="value"
                  error={errors && errors.Description}
                  helperText={errors && errors.Description}
                  onChange={(e) => handleEducation(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Experience"
                variant="outlined"
                value={Experience}
                type="number"
                error={errors && errors.Experience}
                helperText={errors && errors.Experience}
                onChange={(e) => handleExperience(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Requirements"
                variant="outlined"
                value={Requirements}
                type="value"
                error={errors && errors.Requirements}
                helperText={errors && errors.Requirements}
                onChange={(e) => handleRequirements(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Description}>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Skills"
                  value={Skills}
                  type="value"
                  error={errors && errors.Description}
                  helperText={errors && errors.Description}
                  onChange={(e) => handleSkills(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Description}>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Description"
                  value={Description}
                  type="value"
                  error={errors && errors.Description}
                  helperText={errors && errors.Description}
                  onChange={(e) => handleDescription(e)}
                />
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
                  align: 'center',
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
export default RecruitmentForm;
