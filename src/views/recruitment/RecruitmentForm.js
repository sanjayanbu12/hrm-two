import MainCard from 'ui-component/cards/MainCard';
import {Grid,TextField,Box,Button,MenuItem,Select,FormControl,InputLabel,InputAdornment,FormHelperText,Tooltip,Autocomplete} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import validationSchema from '../recruitment/RecruitmentValidation';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { Skill } from './Consts';
import { Educations } from './Consts';
import {Locations} from './Consts';

const RecruitmentForm = () => {
  const theme = useTheme();
  const [Jobrole, setJobrole] = useState('');
  const [Openings, setOpenings] = useState('');
  const [Company, setCompany] = useState('');
  const [Description, setDescription] = useState('');
  const [ApplicationLink, setApplicationLink] = useState('');
  const [Othereducation, setOthereducation] = useState('');
  const [ExperienceFrom, setExperienceFrom] = useState('');
  const [ExperienceTo, setExperienceTo] = useState('');
  const [Deadline, setDeadline] = useState('');
  const [Worktype, setWorktype] = useState('');
  const [Skills, setSkills] = useState('');
  const [Clientname, setClientname] = useState('');
  const [Clientcompany, setClientcompany] = useState('');
  const [Hrname, setHrname] = useState('');
  const [Hrcontact, setHrcontact] = useState('');
  const [proct, setproct] = useState([]);
  const [Interviewrounds, setInterviewrounds] = useState('');
   const [Interview, setInterview] = useState([]);
   const [orgData, setOrgData] = useState([]);
  const [Education, setEducation] = useState('');
  const [Location, setLocation] = useState('');
  const [Emp, setEmp] = useState([]);
  const [Year, setYear] = useState('');
  const [errors, setErrors] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
 
  const handleApplicationLink = (e) => {
    setApplicationLink(e.target.value);
    setErrors((prev) => ({
      ...prev,
      ApplicationLink: ''
    }));
  };
  const handleLocation = (e, value) => {
    setLocation(value.join(','));
    setErrors((prev) => ({
      ...prev,
      Location: ''
    }));
  };

  const handleWorktype = (e) => {
    setWorktype(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Worktype: ''
    }));
  };

  const handleJobrole = (e) => {
    setJobrole(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Jobrole: ''
    }));
  };

  const handleClientname = (e) => {
    setClientname(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Clientname: ''
    }));
  };

  const handleClientcompany = (e) => {
    setClientcompany(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Clientcompany: ''
    }));
  };

  const handleHrname = (e,value) => {
    setHrname(value.join(','));
    setErrors((prev) => ({
      ...prev,
      Hrname: ''
    }));
  };
  const handleProct = (e,value) => {
    const selectedData = value.map(item => ({
      name: item.name,
      id: item.id
    }));
    setproct(selectedData)
    console.log(proct)
    setErrors((prev) => ({
      ...prev,
      Hrname: ''
    }));
  };

  const handleHrcontact = (e) => {
    const inputValue = e.target.value;
    const validInput = /^(\+91\s)?\d{0,10}$/.test(inputValue);
    if (validInput || inputValue === '') {
      setHrcontact(inputValue);
      setErrors((prevErrors) => ({ ...prevErrors, Hrcontact: '' }));
    } else {
      setErrors({ Hrcontact: 'Please enter a valid 10-digit phone number' });
    }
  };
  
  const handleInterview = (e, index) => {
    const newInterview = [...Interview];
    newInterview[index] = e.target.value;
    setInterview(newInterview);
    setErrors((prev) => ({
      ...prev,
      Interview: ''
    }));
  };

  const handleInterviewrounds = (e) => {
    const round = parseInt(e.target.value, 10);
    if (round > 0 && round <=7) {
      setInterviewrounds(round);
      setErrors((prev) => ({
        ...prev,
        Interviewrounds: ''
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        Interviewrounds: 'Select 1 to 7'
      }));
    }
  };

  const handleOpenings = (e) => {
    const Open = e.target.value;
    if (0 >= Open) {
      setErrors((prev) => ({
        ...prev,
        Openings: 'Select above 0 '
      }));
    } else {
      setOpenings(Open);
      setErrors((prev) => ({
        ...prev,
        Openings: ''
      }));
    }
  };

  const handleCompany = e => {
    setCompany(e.target.value)
    setErrors(prev => ({
      ...prev,
      Company: ''
    }));
  };

  const handleEducation = (e, newValue) => {
    setEducation(newValue.join(','));
    setErrors((prev) => ({
      ...prev,
      Education: ''
    }));
  };

  const handleOthereducation = (e) => {
    setOthereducation(e.target.value);
  };
  
  
  const handleYear = (e) => {
    setYear(e.target.value);
    setErrors((prev) => ({
      ...prev,
    Year: ''
    }));
  };

  const handleSkills = (e, value) => {
    setSkills(value.join(','));
    setErrors((prev) => ({
      ...prev,
      skills: ''
    }));
  };
  
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrors((prev) => ({
      ...prev,
      Description: ''
    }));
  };
  const handleExperienceFrom = (e) => {
    const a=e.target.value;
    if(0<=a){
    setExperienceFrom(a);
    setErrors((prev) => ({
      ...prev,
      ExperienceFrom: ''
    }));
  }
  else{
    setErrors((prev) => ({
      ...prev,
      ExperienceFrom: 'Select 0 and above'
    }));
  }
  };

  const handleExperienceTo = (e) => {
    const experience = e.target.value;
    if (experience <= ExperienceFrom) {
      setErrors((prev) => ({
        ...prev,
        ExperienceTo: 'Experience To should be higher than Experience From.'
      }));
    } else {
      setExperienceTo(experience);
      setErrors((prev) => ({
        ...prev,
        ExperienceTo: ''
      }));
    }
  };
  const handleDeadline = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
    if (selectedDate < currentDate) {
      setErrors((prev) => ({
        ...prev,
        Deadline: 'Please select a future date.'
      }));
    } else {
      setDeadline(selectedDate);
      setErrors((prev) => ({
        ...prev,
        Deadline: ''
      }));
    }
  };
useEffect(()=>{
  fetchEmp()
},[]);
useEffect(()=>{
  fetchOrgData()
},[]);

const fetchOrgData = async () =>{
  const response = await axios.get('https://hrm-backend-square.onrender.com/org/getorg');
  setOrgData(response.data.orgData.map(x=>x.hrName))
  console.log(response.data.orgData.map(x=>x.hrName))
}
const fetchEmp=async()=>{
  try {
    const res =await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
    console.log(res)
     setEmp(res.data.reverse());
     console.log(Emp)
  } catch (error) {
    console.log(error);
  }
}
const Emplist=Emp.map((item)=>item.name)
console.log(Emplist)


  useEffect(() => {
    axios
      .get('https://hrm-backend-square.onrender.com/rec/getRec/' + id)
      .then((res) => {
        console.log('This is res data', res.data.data);

        const responseData = res.data.data;
        console.log(responseData);
        setJobrole(responseData.Jobrole);
        setClientname(responseData.Clientname);
        setClientcompany(responseData.Clientcompany);
        setHrname(responseData.Hrname.join(','));
        setHrcontact(responseData.Hrcontact);
        setInterview(responseData.Interview);
        setInterviewrounds(responseData.Interviewrounds);
        setOpenings(responseData.Openings);
        setCompany(responseData.Company);
        setDescription(responseData.Description);
        setApplicationLink(responseData.ApplicationLink);
        setOthereducation(responseData.Othereducation);
        setExperienceFrom(responseData.ExperienceFrom);
        setExperienceTo(responseData.ExperienceTo);
        setDeadline(responseData.Deadline);
        setWorktype(responseData.Worktype);
        setSkills(responseData.Skills.join(','));
        setEducation(responseData.Education.join(','));
        setYear(responseData.Year.join(','));
        setLocation(responseData.Location);
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
          Clientname,
          Clientcompany,
          Hrname,
          Hrcontact,
          Interview,
          Interviewrounds,
          Openings,
          Company,
          Description,
          ApplicationLink,
          Othereducation,
          ExperienceFrom,
          ExperienceTo,
          Deadline,
          Worktype,
          Skills,
          Education,
          Year,
          Location
        };

        await validationSchema.validate(
          {
            Jobrole,
            Clientname,
            Clientcompany,
            Hrname,
            Hrcontact,
            Interview,
            Interviewrounds,
            Openings,
            Company,
            Description,
            ApplicationLink,
            Othereducation,
            ExperienceFrom,
            ExperienceTo,
            Deadline,
            Worktype,
            Skills,
            Education,
            Year,
            Location
          },
          {
            abortEarly: false
          }
        );
        await axios.put('https://hrm-backend-square.onrender.com/rec/getRec/' + id, updatedtask);
        setJobrole('');
        setClientname('');
        setClientcompany('');
        setHrname('');
        setHrcontact('');
        setInterview('');
        setInterviewrounds('');
        setOpenings('');
        setCompany('');
        setDescription('');
        setApplicationLink('');
        setOthereducation('');
        setExperienceFrom('');
        setDeadline('');
        setWorktype('');
        setSkills('');
        setEducation('');
        setYear('');
        setLocation('');

        Swal.fire({
          icon: 'success',
          text: 'Updated Successfully'
        }).then(() => {
          navigate('/JobTable');
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
          Clientname,
          Clientcompany,
          Hrname,
          Hrcontact,
          Interview,
          Interviewrounds,
          Openings,
          Company,
          Description,
          ApplicationLink,
          Othereducation,
          ExperienceFrom,
          ExperienceTo,
          Deadline,
          Worktype,
          Skills,
          Education,
          Year,
          Location,
          orgData:proct
        };
        console.log('task', task);

        await validationSchema.validate(
          {
            Jobrole,
            Clientname,
            Clientcompany,
            Hrname,
            Hrcontact,
            Interview,
            Interviewrounds,
            Openings,
            Company,
            ApplicationLink,
            Othereducation,
            ExperienceFrom,
            ExperienceTo,
            Deadline,
            Worktype,
            Skills,
            Education,
            Year,
            Location
          },
          { abortEarly: false }
        );
        await axios.post('https://hrm-backend-square.onrender.com/rec/createRec', task);

        setJobrole('');
        setClientname('');
        setClientcompany('');
        setHrname('');
        setHrcontact('');
        setInterview('');
        setInterviewrounds('');
        setOpenings('');
        setCompany('');
        setDescription('');
        setApplicationLink('');
        setOthereducation('');
        setExperienceFrom('');
        setExperienceTo('');
        setDeadline('');
        setWorktype('');
        setSkills('');
        setEducation('');
        setYear('');
        setLocation('');
        Swal.fire({
          icon: 'success',
          text: 'Add Recruitment'
        }).then(() => {
          navigate('/JobTable');
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
    <MainCard>
    <MainCard title="Job Posting Form">
      <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Jobrole"
                  value={Jobrole}
                  error={errors && errors.Jobrole}
                  helperText={errors && errors.Jobrole}
                  onChange={(e) => handleJobrole(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  <MenuItem value="Part time">Part time</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Worktype}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Company}>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Company"
                  value={Company}
                  onChange={(e) => handleCompany(e)}
                >
                  <MenuItem value="Sns Square">SNS Square</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Company}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Location}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Autocomplete
                  multiple
                  options={Locations}
                  limitTags={1}
                  disableCloseOnSelect
                  value={Location ? String(Location).split(',') : []}
                  onChange={(e, value) => handleLocation(e, value)}
                  renderInput={(params) => <TextField {...params} label="Location" value={Location} error={errors && errors.Location} />}
                />
                <FormHelperText>{errors && errors.Location}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
  <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Education}>
    <InputLabel id="demo-simple-select-label"></InputLabel>
    <Autocomplete
      multiple
      options={Educations}
      limitTags={1}
      disableCloseOnSelect
      value={Education.includes('Others') ? ['Others'] :  Education ? String(Education).split(',') : []}
      onChange={(e, newValue) => handleEducation(e, newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Education"
          value={Education.includes('Others') ? 'Others' : Education}
          error={errors && errors.Education}
        />
      )}
    />
    <FormHelperText>{errors && errors.Education}</FormHelperText>
  </FormControl>
</Grid>

 {Education && Education.includes('Others') &&(
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Other"
                  value={Othereducation}
                  error={errors && errors.Jobrole}
                  helperText={errors && errors.Jobrole}
                  onChange={(e) => handleOthereducation(e)}
                />
              </FormControl>
            </Grid>
 )}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Year}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Year of Passing"
                  value={Year}
                  type='text'
                  error={errors && errors.Year}
                  helperText={errors && errors.Year}
                  onChange={(e) => handleYear(e)}
                  onInput={(e) => {
                    // Remove non-numeric characters
                    e.target.value = e.target.value.replace(/[^0-9,]/g, '');
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.ExperienceFrom}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Experience From"
                  type="number"
                  value={ExperienceFrom}
                  error={errors && errors.ExperienceFrom}
                  helperText={errors && errors.ExperienceFrom}
                  onChange={(e) => handleExperienceFrom(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.ExperienceTo}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Experience To"
                  type="number"
                  value={ExperienceTo}
                  error={errors && errors.ExperienceTo}
                  helperText={errors && errors.ExperienceTo}
                  onChange={(e) => handleExperienceTo(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Skills}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Autocomplete
                  multiple
                  options={Skill}
                  limitTags={1}
                  disableCloseOnSelect
                  value={Skills ? String(Skills).split(',') : []}
                  onChange={(e, Value) => handleSkills(e, Value)}
                  renderInput={(params) => <TextField {...params} label="Skills" value={Skills} error={errors && errors.Skills} />}
                />
                <FormHelperText>{errors && errors.Skills}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                label="Application Link"
                variant="outlined"
                value={ApplicationLink}
                type="Value"
                error={errors && errors.ApplicationLink}
                helperText={errors && errors.ApplicationLink}
                onChange={(e) => handleApplicationLink(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Description"
                  value={Description}
                  multiline
                  rows={3}
                  onChange={(e) => handleDescription(e)}
                />
                <FormHelperText>{errors && errors.skills}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </form>
    </MainCard>
    <MainCard title="Interviewer Details" style={{marginTop:'20px'}}>
    <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Client Name"
                  value={Clientname}
                  error={errors && errors.Clientname}
                  helperText={errors && errors.Clientname}
                  onChange={(e) => handleClientname(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Client Company"
                  value={Clientcompany}
                  error={errors && errors.Clientcompany}
                  helperText={errors && errors.Clientcompany}
                  onChange={(e) => handleClientcompany(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Hrname}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Autocomplete
                  multiple
                  options={Emplist}
                  limitTags={1}
                  disableCloseOnSelect
                  value={Hrname ? String(Hrname).split(',') : []}
                  onChange={(e, value) => handleHrname(e, value)}
                  renderInput={(params) => <TextField {...params} label="HR Name" value={Hrname} error={errors && errors.Hrname} />}
                />
                <FormHelperText>{errors && errors.Hrname}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
  <FormControl sx={{ minWidth: '100%' }}>
    <InputLabel id="demo-simple-select-label"></InputLabel>
    {orgData && orgData[0] ? (
      <Autocomplete
        multiple
        id="tags-outlined"
        options={orgData[0]}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        onChange={handleProct}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Add Employees" placeholder="Add" />}
      />
    ) : (
      <div>Loading or no data available.</div>
    )}
  </FormControl>
</Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="HR Contact No"
                  type='tel'
                  value={Hrcontact}
                  error={errors && errors.Hrcontact}
                  helperText={errors && errors.Hrcontact}
                  inputProps={{
                    maxLength:10,
                  }}
                  onChange={(e) => handleHrcontact(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="No of Interview Rounds"
                  value={Interviewrounds}
                  type='number'
                  error={errors && errors.Interviewrounds}
                  helperText={errors && errors.Interviewrounds}
                  onChange={(e) => handleInterviewrounds(e)}
                />
              </FormControl>
            </Grid>
        {Array.from({ length: Interviewrounds }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <FormControl sx={{ minWidth: '100%' }}>
              <InputLabel id={`interview-label-${index}`}></InputLabel>
              <TextField
                labelId={`interview-label-${index}`}
                id={`interview-textfield-${index}`}
                label={`Interview Rounds ${index + 1}`}
                value={Interview[index] || ''}
                // error={errors && errors.Interview}
                // helperText={errors && errors.Interview}
                onChange={(e) => handleInterview(e, index)}
              />
            </FormControl>
          </Grid>
        ))}
            </Grid>
            </Box>
          </form>
    </MainCard>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            variant="contained"
            sx={{
              width: '300px',
              height: '40px',
              borderRadius: '10px',
              padding: 0.6,
              background: '#673ab7',
              color: '#efebe9',
              '&:hover': {
                color: theme.palette.secondary.light,
                background: '#673ab7'
              }
            }}
            onClick={(e) => finalSubmit(e)}
          >
            {id ? 'Update' : 'Save'}
          </Button>{' '}
          <Button
            onClick={() => {
              navigate('/jobtable');
            }}
            sx={{
              width: '100px',
              height: '40px',
              borderRadius: '10px',
              padding: 0.6,
              background: '#673ab7',
              color: '#f5f5f5',
              '&:hover': {
                background: '#673ab7',
                color: '#f5f5f5'
              }
            }}
          >
            <Tooltip title="view table">
              <WysiwygIcon />
            </Tooltip>
          </Button>
        </Box>
    </MainCard>
  );
};
export default RecruitmentForm;