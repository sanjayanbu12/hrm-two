import React, { useState, useEffect } from 'react'

import MainCard from 'ui-component/cards/MainCard'
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  Grid,
  TableHead,
  TableContainer,
  Paper,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
} from '@mui/material'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import { GridDeleteIcon, GridSearchIcon } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import { Edit } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'
const RecruitmentTable = () => {
  const [RecruitmentList, setRecruitmentList] = useState([])
  const [Loader, setLoader] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [Search, setSearch] = useState('')
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    fetchdata()
  }, [])
  const fetchdata = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/rec/getRec')
      const newData = response.data.getData
      setRecruitmentList(newData)
      setLoader(false)
      console.log(newData + ' this is the new data')
    } catch (error) {
      console.log('Error retrieving user data:', error)
    }
  }
  const handleView = id => {
    const job = RecruitmentList.find(item => item._id === id)
    setSelectedJob(job)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const filteredjob = RecruitmentList.filter(job => {
    const lowersearchText = Search.toLowerCase()
    return Object.values(job).some(value => value && value.toString().toLowerCase().includes(lowersearchText))
  })
  const handleEdit = id => {
    navigate(`/recruitmentform/${id}`)
  }
  const handleDelete = id => {
    handleClose()
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure you want to delete this recruitment?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://hrm-backend-square.onrender.com/rec/getRec/${id}`)
          await fetchdata()
          handleClose()
         
          Swal.fire({
            icon: 'success',
            text: 'Recruitment deleted successfully.'
          })
        } catch (error) {
          console.log('Error deleting recruitment:', error)
        }
      }
    })
  }
  return (
    <MainCard title='Recruitment Table'>
      {Loader ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Box sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: '700px', mb: 2, display: 'flex' }}>
            <TextField
              sx={{ width: '300px' }}
              label='Search'
              variant='outlined'
              color='info'
              value={Search}
              onChange={handleSearch}
              size='small'
             
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                 <GridSearchIcon color='primary' />
                  </InputAdornment>
                )
              }}
            />
            <Button
              onClick={() => {
                navigate('/recruitmentform')
              }}
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
            >
              <AddIcon />
              Add New
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {RecruitmentList.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Job Role</TableCell>
                        <TableCell>No of Openings</TableCell>
                        <TableCell>Application Count</TableCell>
                        <TableCell>Selected</TableCell>
                        <TableCell>Worktype</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {RecruitmentList.length > 0 && filteredjob.length > 0 ? (
                        RecruitmentList.map &&
                        filteredjob.map(x => (
                          <TableRow key={x._id}>
                            <TableCell>{x.uuid}</TableCell>
                            <TableCell>{x.Jobrole}</TableCell>
                            <TableCell>{x.Openings}</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>{x.Worktype}</TableCell>
                            <TableCell>{x.Location}</TableCell>
                            <TableCell>{x.Deadline}</TableCell>
                         <TableCell align="left"  sx={{ '&:hover': { cursor: 'pointer' } }}>
                           <Box sx={{display:'flex',justifyContent:'center',gap:'15px'}}>
                                <Tooltip title='Click to View'>
                                  <VisibilityIcon fontSize='small' onClick={() => {
                                handleView(x._id)
                              }}
                             color='success'/>
                                </Tooltip>
                               <Tooltip title='Edit'><Edit fontSize='small' color="primary" onClick={()=>handleEdit(x._id)}/></Tooltip>
                               <Tooltip title='Delete'><GridDeleteIcon fontSize='small' onClick={()=>handleDelete(x._id)} color='error'/></Tooltip>
                               </Box> </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align='center'>
                            No data found
                          </TableCell>
                        </TableRow>
                      )}{' '}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>NO DATA</p>
              )}
            </Grid>
          </Grid>
        </div>
      )}

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        {selectedJob && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
              <DialogTitle variant='h2'>RecruitmentForm Details</DialogTitle>
            </Box>
            <DialogContent>
              <Typography sx={{ lineHeight: '4', fontSize: '20px' }}>
                <b> Job Role</b>
                <b style={{ marginLeft: '200px', paddingRight: '10px' }}>:</b>
                {selectedJob.Jobrole}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b>No. of Openings</b>
                <b style={{ marginLeft: '178px', paddingRight: '10px' }}>:</b> {selectedJob.Openings}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Company</b>
                <b style={{ marginLeft: '220px', paddingRight: '10px' }}>:</b> {selectedJob.Company}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Location</b>
                <b style={{ marginLeft: '225px', paddingRight: '10px' }}>:</b> {selectedJob.Location}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Worktype</b>
                <b style={{ marginLeft: '221px', paddingRight: '10px' }}>:</b> {selectedJob.Worktype}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Qualification</b>
                <b style={{ marginLeft: '200px', paddingRight: '10px' }}>:</b> {selectedJob.Education}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Year of Passing</b>
                <b style={{ marginLeft: '180px', paddingRight: '10px' }}>:</b>{' '}
                {!selectedJob.Year ? <span>Not Mentioned </span> : selectedJob.Year}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Experience</b>
                <b style={{ marginLeft: '211px', paddingRight: '10px' }}>:</b> {selectedJob.Experience} Years
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Requirements</b>
                <b style={{ marginLeft: '193px', paddingRight: '10px' }}>:</b> {selectedJob.Requirements}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Description</b>
                <b style={{ marginLeft: '210px', paddingRight: '10px' }}>:</b> {selectedJob.Description}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Last Date to Apply</b>
                <b style={{ marginLeft: '168px', paddingRight: '10px' }}>:</b> {selectedJob.Deadline}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Application Count</b>
                <b style={{ marginLeft: '170px', paddingRight: '10px' }}>:</b>
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Selected</b>
                <b style={{ marginLeft: '228px', paddingRight: '10px' }}>:</b>
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b>Remaining</b>
                <b style={{ marginLeft: '215px', paddingRight: '10px' }}>:</b>
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </MainCard>
  )
}

export default RecruitmentTable
