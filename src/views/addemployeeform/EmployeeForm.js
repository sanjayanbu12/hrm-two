import MainCard from 'ui-component/cards/MainCard';
import {
  Grid,
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { validationSchema } from './Validation';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { updatevalidationSchema } from './updateValidate';
import Card from '@mui/material/Card';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useContext } from 'react';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
const EmployeeForm = () => {
  const theme = useTheme();
  const [name, setName] = useState([]);
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [dept, setDept] = useState('');
  const [desi, setDesi] = useState('');
  const [email, seteMail] = useState('');
  const [mob, setMob] = useState('');
  const [altmob, setaltMob] = useState('');
  const [peraddress, setperAddress] = useState('');
  const [temaddress, settemAddress] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [join, setJoin] = useState('');
  const [report, setReport] = useState([]);
  const [dob, setDob] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState('');
  const [fathername, setFathername] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [nationality, setNationality] = useState('');
  const [regData, setRegData] = useState([]);
  const [edata, setedata] = useState([]);
  const [AuthData, setAuthData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { formStatus, setStatus } = useContext(FormSubmittedContext);
  useEffect(() => {
    fetchEmployeesData();
  }, []);
  useEffect(() => {
    fetchRegData();
  }, []);
  useEffect(() => {
    fetchAuthData();
  }, []);
  const handleEmail = (e) => {
    seteMail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: ''
    }));
  };
  const handleName = (e) => {
    console.log(e.target.value);
    const selectedValue = e.target.value;
    const [id, name] = selectedValue.split(',');
    setName({ id, name });
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

  const handleemergencyContact = (e) => {
    setEmergencyContact(e.target.value);
    setErrors((prev) => ({
      ...prev,
      emergencyContact: ''
    }));
  };

  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      const employees = response.data;
      setedata(employees);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAuthData = async () => {
    const res = await axios.get('https://hrm-backend-square.onrender.com/auth/getalldata');
    setAuthData(res.data.user);
    console.log(res.data.user.filter((data) => data.isEmployee === false));
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
    const selectedValue = e.target.value;
    const [reportId, reportName] = selectedValue.split(',');
    setReport({ id: reportId, name: reportName });
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
  const handleType = (e) => {
    setType(e.target.value);
    setErrors((prev) => ({
      ...prev,
      type: ''
    }));
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
  const fetchRegData = async () => {
    const res = await axios.get('https://hrm-backend-square.onrender.com/auth/getalldata');
    setRegData(res.data.user);
  };
  useEffect(() => {
    fetch('https://hrm-backend-square.onrender.com/api/getemployee/' + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setLastname(data.lastname);
        setGender(data.gender);
        setDept(data.dept);
        setDesi(data.desi);
        seteMail(data.email);
        setPassword(data.password);
        setconfirmPassword(data.confirmPassword);
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
        setType(data.type);
        setEmergencyContact(data.type);
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
          report: {
            name: report.name,
            id: report.id
          },
          fathername,
          nationality,
          religion,
          type,
          title,
          emergencyContact
        };

        await updatevalidationSchema.validate(
          {
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
            type,
            emergencyContact
          },
          { abortEarly: false }
        );
        await axios.put('https://hrm-backend-square.onrender.com/api/updateemployee/' + id, updatedtask);

        setName('');
        setLastname('');
        setGender('');
        setDept('');
        setDesi('');
        seteMail('');
        setMob('');
        setaltMob(''),
        setperAddress(''),
        settemAddress(''), 
        setBloodgroup(''), 
        setJoin('');
        setReport('');
        setDob('');
        setFathername('');
        setNationality('');
        setType('');
        setEmergencyContact('');

        Swal.fire({
          icon: 'success',
          text: 'Employee Updated Successfully'
        }).then(() => {
          navigate('/basictable');
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
          name: name.name,
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
          fathername,
          nationality,
          type,
          emergencyContact

          // employeeid: 'ID: ' + Math.floor(Math.random() * 100000)
        };
        console.log('task', task);

        await validationSchema.validate(
          {
            name,
            lastname,
            gender,
            altmob,
            dept,
            desi,
            email,
            mob,
            peraddress,
            temaddress,
            bloodgroup,
            join,
            report,
            dob,
            fathername,
            nationality,
            type,
            emergencyContact
          },
          { abortEarly: false }
        );
        const res = await axios.post('https://hrm-backend-square.onrender.com/api/addemployee', task);
        const newEmployeeId = res.data.data._id; 
        const empId = res.data.data.employeeid;
        await axios.put(`https://hrm-backend-square.onrender.com/auth/updateauth/${name.id}`, { employeeId: empId, isEmployee: true });
        if (report.id) {
          const reportUpdateData = {
            report: {
              name: res.data.data.name,
              id: newEmployeeId
            }
          };
          console.log(report.id);
          await axios.put(`https://hrm-backend-square.onrender.com/api/updateemployee/${report.id}`, reportUpdateData);
          await axios.put(`https://hrm-backend-square.onrender.com/api/updateemployee/${newEmployeeId}`, {
            isReported: true
          });
        }
        setName('');
        setLastname('');
        setGender('');
        setDept('');
        setDesi('');
        seteMail('');
        setMob('');
        setaltMob(''),
        setperAddress(''),
        settemAddress(''),
        setBloodgroup(''),
        setJoin('');
        setReport('');
        setDob('');
        setFathername('');
        setNationality('');
        setType('');
        setEmergencyContact('');
        Swal.fire({
          icon: 'success',
          text: 'Employee Information Created Sucessfully'
        }).then(() => {
          setStatus(!formStatus);
          navigate('/basictable');
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
    <Card>
      <MainCard title="Employee Information">
        <form>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} style={{ marginBottom: 10 }}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-label">First Name</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="First Name" onChange={(e) => handleName(e)}>
                    {AuthData.filter((item) => item.isEmployee === false).map((item) => (
                      <MenuItem key={item._id} value={`${item._id},${item.firstname}`}>
                        {item.firstname}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>{errors && errors.name}</FormHelperText>
                </FormControl>
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

              <Grid item xs={4} style={{ marginBottom: 10 }}>
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

              <Grid item xs={4} style={{ marginBottom: 10 }}>
                <TextField
                  sx={{ minWidth: '100%' }}
                  id="outlined-basic"
                  label="Email"
                  placeholder='john@gmail.com'
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

              <Grid item xs={4} style={{ marginBottom: 10 }}>
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
                  label="Emergency Contact"
                  variant="outlined"
                  value={emergencyContact}
                  error={errors && errors.emergencyContact}
                  helperText={errors && errors.emergencyContact}
                  onChange={(e) => handleemergencyContact(e)}
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

              <Grid item xs={4} style={{ marginBottom: 10 }}>
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
                    <MenuItem value="Front-End Developer">Front-End Developer</MenuItem>
                    <MenuItem value="Back-End Developer">Back-End Developer</MenuItem>
                    <MenuItem value="AWS">AWS</MenuItem>
                    <MenuItem value="Figma">Figma</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                  </Select>
                  <FormHelperText>{errors && errors.desi}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={4} style={{ marginBottom: 10 }}>
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

              {edata.length < 1 ? (
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-label">Reporting To</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Reporting To"
                      value={report.id ? `${report.id},${report.name}` : ''}
                      error={errors && errors.report}
                      helperText={errors && errors.report}
                      onChange={(e) => handleReport(e)}
                    >
                      {regData.map((item) => (
                        <MenuItem key={item._id} value={`${item._id},${item.firstname}`}>
                          {item.firstname}
                        </MenuItem>
                      ))}
                    </Select>

                    <FormHelperText>{errors && errors.report}</FormHelperText>
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-label">Reporting to</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Reporting To"
                      value={report.id ? `${report.id},${report.name}` : ''}
                      error={errors && errors.report}
                      helperText={errors && errors.report}
                      onChange={(e) => handleReport(e)}
                    >
                      {edata.map((item) => (
                        <MenuItem key={item._id} value={`${item._id},${item.name}`}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

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
        </form>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
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
          </Button>
          <Button
            onClick={() => {
              navigate('/basictable');
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
            <Tooltip title="Employee List">
              <WysiwygIcon />
            </Tooltip>
          </Button>
        </Box>
      </MainCard>
    </Card>
  );
};

export default EmployeeForm;
