import MainCard from 'ui-component/cards/MainCard'
import {
  Grid,
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  FormHelperText,
  Tooltip,
  Autocomplete
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import axios from 'axios'
import validationSchema from '../recruitment/RecruitmentValidation'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
const RecruitmentForm = () => {
  const theme = useTheme()
  const [Jobrole, setJobrole] = useState('')
  const [Openings, setOpenings] = useState('')
  const [Company, setCompany] = useState('')
  const [Description, setDescription] = useState('')
  const [ApplicationLink, setApplicationLink] = useState('')
  const [ExperienceFrom, setExperienceFrom] = useState('')
  const [ExperienceTo, setExperienceTo] = useState('')
  const [Deadline, setDeadline] = useState('')
  const [Worktype, setWorktype] = useState('')
  const [Skills, setSkills] = useState('')
  const [Education, setEducation] = useState('')
  const [Location, setLocation] = useState('')
  const [Year, setYear] = useState('')
  const [errors, setErrors] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const Skill = [
    'JavaScript',
    'React.js',
    'Node.js',
    'AngularJS',
    'Vue.js',
    'Java',
    'Spring Framework',
    'Hibernate',
    'Apache Struts',
    'JavaFX',
    'Python',
    'Django',
    'Flask',
    'NumPy',
    'Pandas',
    'C#',
    'ASP.NET',
    '.NET Core',
    'Unity',
    'Xamarin',
    'Ruby',
    'Ruby on Rails',
    'Sinatra',
    'RSpec',
    'Capybara',
    'PHP',
    'Laravel',
    'Symfony',
    'CodeIgniter',
    'WordPress',
    'Swift',
    'iOS app development',
    'macOS app development',
    'SwiftUI',
    'Kotlin',
    'Android app development',
    'Kotlin Multiplatform',
    'TypeScript',
    'Angular',
    'Vue.js',
    'React Native',
    'Deno',
    'Go',
    'Google Cloud Platform',
    'Docker',
    'Kubernetes',
    'Rust',
    'Systems programming',
    'Web development',
    'Networking',
    'C/C++',
    'Embedded systems',
    'Game development',
    'Operating systems',
    'SQL',
    'Database management',
    'Querying and manipulating data',
    'HTML/CSS',
    'Web development',
    'Front-end design',
    'MATLAB',
    'Numerical computing',
    'Data analysis',
    'R',
    'Statistical computing',
    'Data visualization',
    'Machine learning'
  ]
  const Educations = [
    'BCA',
    'MCA',
    'BBA',
    'MBA',
    'B.Tech',
    'M.Tech',
    'B.Sc.',
    'M.Sc',
    'BE',
    'ME',
    'Any Computer Streams',
    'Any UG',
    'Any PG',
    'Others'
  ]
  const Locations = ['Coimbatore', 'Chennai', 'Bengaluru']
  const Years = []
  for (let year = 2000; year <= 2050; year++) {
    Years.push(year)
  }

  const handleApplicationLink = e => {
    setApplicationLink(e.target.value)
    setErrors(prev => ({
      ...prev,
      ApplicationLink: ''
    }))
  }
  const handleLocation = (e, Value1) => {
    setLocation(Value1.join(','))
    setErrors(prev => ({
      ...prev,
      Location: ''
    }))
  }
  const handleWorktype = e => {
    setWorktype(e.target.value)
    setErrors(prev => ({
      ...prev,
      Worktype: ''
    }))
  }
  const handleJobrole = e => {
    setJobrole(e.target.value)
    setErrors(prev => ({
      ...prev,
      Jobrole: ''
    }))
  }
  const handleOpenings = e => {
    const Open = e.target.value
    if (0 > Open) {
      setErrors(prev => ({
        ...prev,
        Openings: 'Select above 0 '
      }))
    } else {
      setOpenings(Open)
      setErrors(prev => ({
        ...prev,
        Openings: ''
      }))
    }
  }

  const handleCompany = e => {
    setCompany(e.target.value)
    setErrors(prev => ({
      ...prev,
      Company: ''
    }))
  }

  const handleEducation = (e, newValue) => {
    setEducation(newValue.join(','))
    setErrors(prev => ({
      ...prev,
      Education: ''
    }))
  }
  const handleYear = (e, Value2) => {
    setYear(Value2.join(','))
    setErrors(prev => ({
      ...prev,
      Year: ''
    }))
  }
  const handleSkills = (e, value) => {
    setSkills(value.join(','))
    setErrors(prev => ({
      ...prev,
      Skills: ''
    }))
  }
  const handleDescription = e => {
    setDescription(e.target.value)
    setErrors(prev => ({
      ...prev,
      Description: ''
    }))
  }
  const handleExperienceFrom = e => {
    setExperienceFrom(e.target.value)
    setErrors(prev => ({
      ...prev,
      ExperienceFrom: ''
    }))
  }

  const handleExperienceTo = e => {
    const experience = e.target.value
    if (experience < ExperienceFrom) {
      setErrors(prev => ({
        ...prev,
        ExperienceTo: 'Experience To should be higher than Experience From.'
      }))
    } else {
      setExperienceTo(experience)
      setErrors(prev => ({
        ...prev,
        ExperienceTo: ''
      }))
    }
  }
  const handleDeadline = e => {
    const selectedDate = e.target.value
    const currentDate = new Date().toISOString().split('T')[0]
    if (selectedDate < currentDate) {
      setErrors(prev => ({
        ...prev,
        Deadline: 'Please select a future date.'
      }))
    } else {
      setDeadline(selectedDate)
      setErrors(prev => ({
        ...prev,
        Deadline: ''
      }))
    }
  }
  useEffect(() => {
    axios
      .get('https://hrm-backend-square.onrender.com/rec/getRec/' + id)
      .then(res => {
        console.log('This is res data', res.data.data)

        const responseData = res.data.data
        console.log(responseData)
        setJobrole(responseData.Jobrole)
        setOpenings(responseData.Openings)
        setCompany(responseData.Company)
        setDescription(responseData.Description)
        setApplicationLink(responseData.ApplicationLink)
        setExperienceFrom(responseData.ExperienceFrom)
        setExperienceTo(responseData.ExperienceTo)
        setDeadline(responseData.Deadline)
        setWorktype(responseData.Worktype)
        setSkills(responseData.Skills.join(','))
        setEducation(responseData.Education.join(','))
        setYear(responseData.Year.join(','))
        setLocation(responseData.Location)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [id])

  const finalSubmit = async () => {
    if (id) {
      try {
        const updatedtask = {
          Jobrole,
          Openings,
          Company,
          Description,
          ApplicationLink,
          ExperienceFrom,
          ExperienceTo,
          Deadline,
          Worktype,
          Skills,
          Education,
          Year,
          Location
        }

        await validationSchema.validate(
          {
            Jobrole,
            Openings,
            Company,
            Description,
            ApplicationLink,
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
        )
        await axios.put('https://hrm-backend-square.onrender.com/rec/getRec/' + id, updatedtask)
        setJobrole('')
        setOpenings('')
        setCompany('')
        setDescription('')
        setApplicationLink('')
        setExperienceFrom('')
        setDeadline('')
        setWorktype('')
        setSkills('')
        setEducation('')
        setYear('')
        setLocation('')

        Swal.fire({
          icon: 'success',
          text: 'Updated Successfully'
        }).then(() => {
          navigate('/JobTable')
        })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors = {}
          error.inner.forEach(err => {
            validationErrors[err.path] = err.message
            console.log(validationErrors)
          })
          setErrors(validationErrors)
        } else {
          console.log(error)
        }
      }
    } else {
      try {
        const task = {
          Jobrole,
          Openings,
          Company,
          Description,
          ApplicationLink,
          ExperienceFrom,
          ExperienceTo,
          Deadline,
          Worktype,
          Skills,
          Education,
          Year,
          Location
        }
        console.log('task', task)

        await validationSchema.validate(
          {
            Jobrole,
            Openings,
            Company,
            ApplicationLink,
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
        )
        await axios.post('https://hrm-backend-square.onrender.com/rec/createRec', task)

        setJobrole('')
        setOpenings('')
        setCompany('')
        setDescription('')
        setApplicationLink('')
        setExperienceFrom('')
        setExperienceTo('')
        setDeadline('')
        setWorktype('')
        setSkills('')
        setEducation('')
        setYear('')
        setLocation('')
        Swal.fire({
          icon: 'success',
          text: 'Add Recruitment'
        }).then(() => {
          navigate('/JobTable')
        })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors = {}
          error.inner.forEach(err => {
            validationErrors[err.path] = err.message
            console.log(validationErrors)
          })
          setErrors(validationErrors)
        } else {
          console.log(error)
        }
      }
    }
  }

  return (
    <MainCard title='Job Description Form'>
      <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <TextField
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Jobrole'
                  value={Jobrole}
                  error={errors && errors.Jobrole}
                  helperText={errors && errors.Jobrole}
                  onChange={e => handleJobrole(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id='outlined-basic'
                label='No of Openings'
                variant='outlined'
                value={Openings}
                type='number'
                error={errors && errors.Openings}
                helperText={errors && errors.Openings}
                onChange={e => handleOpenings(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Worktype}>
                <InputLabel id='demo-simple-select-label'>Work Type</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Work Type'
                  value={Worktype}
                  // error={errors && errors.Status}
                  // helperText={errors && errors.Status}
                  onChange={e => handleWorktype(e)}
                >
                  <MenuItem value=''></MenuItem>
                  <MenuItem value='Internship'>Internship</MenuItem>
                  <MenuItem value='Full time'>Full Time</MenuItem>
                  <MenuItem value='Trainee'>Trainee</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Worktype}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Company}>
                <InputLabel id='demo-simple-select-label'>Company</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Company'
                  value={Company}
                  // error={errors && errors.Company}
                  // helperText={errors && errors.Company}
                  onChange={e => handleCompany(e)}
                >
                  <MenuItem value='Sns Square'>SNS Square</MenuItem>
                </Select>
                <FormHelperText>{errors && errors.Company}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Location}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <Autocomplete
                  multiple
                  options={Locations}
                  limitTags={1}
                  disableCloseOnSelect
                  value={Location ? String(Location).split(',') : []}
                  onChange={(e, Value1) => handleLocation(e, Value1)}
                  renderInput={params => <TextField {...params} label='Location' value={Location} error={errors && errors.Location} />}
                />
                <FormHelperText>{errors && errors.Location}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ minWidth: '100%' }}
                id='outlined-start-adornment'
                label='Deadline'
                variant='outlined'
                type='date'
                value={Deadline}
                error={errors && errors.Deadline}
                helperText={errors && errors.Deadline}
                onChange={e => handleDeadline(e)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Education}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <Autocomplete
                  multiple
                  options={Educations}
                  limitTags={2}
                  disableCloseOnSelect
                  value={Education ? String(Education).split(',') : []}
                  onChange={(e, newValue) => handleEducation(e, newValue)}
                  renderInput={params => <TextField {...params} label='Education' value={Education} error={errors && errors.Education} />}
                />
                <FormHelperText>{errors && errors.Education}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Year}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <Autocomplete
                  multiple
                  options={Years}
                  limitTags={2}
                  disableCloseOnSelect
                  value={Year ? String(Year).split(',') : []}
                  onChange={(e, Value2) => handleYear(e, Value2)}
                  renderInput={params => <TextField {...params} label='Year of Passing' value={Year} error={errors && errors.Year} />}
                />
                <FormHelperText>{errors && errors.Year}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.ExperienceFrom}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <TextField
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Experience From'
                  type='number'
                  value={ExperienceFrom}
                  error={errors && errors.ExperienceFrom}
                  helperText={errors && errors.ExperienceFrom}
                  onChange={e => handleExperienceFrom(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.ExperienceTo}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <TextField
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Experience To'
                  type='number'
                  value={ExperienceTo}
                  error={errors && errors.ExperienceTo}
                  helperText={errors && errors.ExperienceTo}
                  onChange={e => handleExperienceTo(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: '100%' }} error={errors && errors.Skills}>
                <InputLabel id='demo-simple-select-label'></InputLabel>
                <Autocomplete
                  multiple
                  options={Skill}
                  limitTags={2}
                  disableCloseOnSelect
                  value={Skills ? String(Skills).split(',') : []}
                  onChange={(e, Value) => handleSkills(e, Value)}
                  renderInput={params => <TextField {...params} label='Skills' value={Skills} error={errors && errors.Skills} />}
                />
                <FormHelperText>{errors && errors.Skills}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ minWidth: '100%' }}
                id='outlined-basic'
                label='ApplicationLink'
                variant='outlined'
                value={ApplicationLink}
                type='Value'
                error={errors && errors.ApplicationLink}
                helperText={errors && errors.ApplicationLink}
                onChange={e => handleApplicationLink(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: '1000px', height: '100px' }}>
                <TextField
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Description'
                  value={Description}
                  type='value'
                  multiline
                  rows={3}
                  onChange={e => handleDescription(e)}
                />
              <FormHelperText>{errors && errors.skills}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '850px', marginTop: '20px' }}>
          <Button
            variant='contained'
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
            onClick={e => finalSubmit(e)}
          >
            {id ? 'Update' : 'Save'}
          </Button>{' '}
          <Button
            onClick={() => {
              navigate('/jobtable')
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
            <Tooltip title='view table'>
              <WysiwygIcon />
            </Tooltip>
          </Button>
        </Box>
      </form>
    </MainCard>
  )
}
export default RecruitmentForm
