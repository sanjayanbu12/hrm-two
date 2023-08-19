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
 
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Pagination,
  Popover,
  MenuItem,
  Menu
} from '@mui/material'
import axios from 'axios'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import { GridArrowDownwardIcon, GridArrowUpwardIcon, GridDeleteIcon, GridMenuIcon, GridSearchIcon } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import { AddCircleOutlineOutlined, DownloadForOfflineOutlined, Edit } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { CSVLink } from 'react-csv'

const BasicRecruittable = () => {
  const [recruitmentList, setRecruitmentList] = useState([])
  const [loader, setLoader] = useState(true)
  const [selectedJob, setSelectedJob] = useState(null)
  const [search, setSearch] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const theme = useTheme()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl1, setAnchorEl1] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/rec/getRec')
      const newData = response.data.getData
      setRecruitmentList(newData.reverse())
      setLoader(false)
      console.log(newData + ' this is the new data')
    } catch (error) {
      console.log('Error retrieving user data:', error)
    }
  }

  const handleView= (id) => {
    console.log(id + 'job id');
    const selectedId = recruitmentList.find((item) => item.id === id);
    navigate(`/views/${id}`, { state: { data: selectedId } });
  };
  

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const handleSort = () => {
    const sortedList = [...recruitmentList]
    sortedList.sort((a, b) => {
      const jobIDA = parseInt(a.uuid)
      const jobIDB = parseInt(b.uuid)
      if (jobIDA < jobIDB) {
        return -1
      }
      if (jobIDA > jobIDB) {
        return 1
      }
      return 0
    })
    sortDirection === 'asc'
    sortedList.reverse()

    setRecruitmentList(sortedList)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const handleEdit = id => {
    navigate(`/jobform/${id}`)
  }

  const handleDelete = id => {
   

    const deletejob = recruitmentList.find(item => item._id == id)

    const Text = `Confirming removal of this  <span style="color: red; text-transform: capitalize;">${deletejob.Jobrole}</span> opening from this list, permanently?`

    Swal.fire({
      icon: 'warning',
      html: Text,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://hrm-backend-square.onrender.com/rec/getRec/${id}`)
          await fetchData()
         
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

  const handleClick = (id, e) => {
    const job = recruitmentList.find(item => item._id === id)
    setSelectedJob(job)
    setAnchorEl(e.currentTarget)
  }

  const handleJobRoleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = e => {
    setAnchorEl1(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl1(null)
  }

  const filteredJobs = recruitmentList.filter(job => {
    const lowerSearchText = search.toLowerCase()
    return Object.values(job).some(value => value && value.toString().toLowerCase().includes(lowerSearchText))
  })

  const handlePageChange = (e, value) => {
    setCurrentPage(value)
  }

  const indexOfLastJob = currentPage * rowsPerPage
  const indexOfFirstJob = indexOfLastJob - rowsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  return (
    <MainCard title='Job Description Table'>
        {loader ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ) : (
      <div>
        <Box display="flex" alignItems="center" justifyContent="flex-end"> 
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} md={6} lg={6}> 
              <TextField
                sx={{
                  width: '57px',
                  height: '0px',
                  marginLeft:'22px',
                  transition: 'width 2s ease-in-out',
                  '&:hover': { width: '240px' }
                }}
                label="Search"
                variant="outlined"
                color="info"
                value={search}
                onChange={handleSearch}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <GridSearchIcon color="primary" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid xs={12} sm={3} md={2} lg={2}> 
            <Tooltip title="Menu">
              <GridMenuIcon 
                onClick={handleOpenMenu}
                sx={{
                  fontSize: '10',
                  width: '40px',
                  height: '35px',
                  borderRadius: '8px',
                  marginLeft:'360px',
                  padding: 0.6,
                  background: '#ede7f6',
                  color: '#5e35b1',
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.secondary.light,
                    background: '#5e35b1',
                    
                  }
                }}
              ></GridMenuIcon></Tooltip>
              <Menu
                  sx={{ marginLeft: '10px','&:hover': { cursor: 'pointer' }}}
                  anchorEl={anchorEl1}
                  open={Boolean(anchorEl1)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'center',
                    horizontal: 'Right'
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate('/jobform')
                    }}
                  >
                    <AddCircleOutlineOutlined fontSize='small' sx={{ marginRight: '10px' }} />
                    Add New
                  </MenuItem>
                  <CSVLink data={recruitmentList} style={{textDecoration:'none',color:'black'}}>
                  <MenuItem >

                    <DownloadForOfflineOutlined fontSize='small' color='success' sx={{ marginRight: '10px' }} />
                    Export Excel
                  </MenuItem></CSVLink>
                  <MenuItem>
                    <DownloadForOfflineOutlined fontSize='small' color='primary' sx={{ marginRight: '10px' }} />
                    Export Pdf
                  </MenuItem>
                </Menu>
            </Grid>
          </Grid>
        </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {recruitmentList.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell width={120}>
                          <Button color='inherit' onClick={handleSort}>
                            Job ID{' '}
                            {sortDirection === 'desc' ? (
                              <GridArrowUpwardIcon fontSize='small' />
                            ) : (
                              <GridArrowDownwardIcon fontSize='small' />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>Job Role</TableCell>
                        <TableCell>No of Openings</TableCell>
                        <TableCell>Worktype</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentJobs.length > 0 ? (
                        currentJobs.map(x => (
                          <TableRow key={x._id}>
                            <TableCell>{x.uuid}</TableCell>
                            <TableCell
                              onClick={e => handleClick(x._id, e)}
                              sx={{
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                '&:hover': { color: 'black' }
                              }}
                            >
                              {x.Jobrole}
                            </TableCell>
                            <TableCell>{x.Openings}</TableCell>
                            <TableCell>{x.Worktype}</TableCell>
                            <TableCell>{x.Location}</TableCell>
                            <TableCell>{new Date(x.Deadline).toLocaleDateString('en-GB')}</TableCell>
                            <TableCell align='left' sx={{ '&:hover': { cursor: 'pointer' } }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  gap: '15px'
                                }}
                              >
                                <Tooltip title='Click to View'>
                                  <VisibilityIcon
                                    fontSize='small'
                                    onClick={() => {
                                      handleView(x._id)
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title='Edit'>
                                  <Edit fontSize='small' color='primary' onClick={() => handleEdit(x._id)} />
                                </Tooltip>
                                <Tooltip title='Delete'>
                                  <GridDeleteIcon fontSize='small' onClick={() => handleDelete(x._id)} color='error' />
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align='center'>
                            No data found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Pagination
                    count={Math.ceil(filteredJobs.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                      marginTop: '10px',
                      marginBottom: '10px',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  />
                </TableContainer>
              ) : (
                <p>NO DATA</p>
              )}
            </Grid>
          </Grid>
        </div>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleJobRoleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box sx={{ padding: '10px' }}>
          <Typography>
            <b>Application Count</b>
            <b style={{ marginLeft: '48px', paddingRight: '10px' }}>:</b>20
            {selectedJob && selectedJob.ApplicationCount}
          </Typography>
          <Typography>
            <b>Selected</b>
            <b style={{ marginLeft: '105px', paddingRight: '10px' }}>:</b>10
            {selectedJob && selectedJob.SelectedCount}
          </Typography>
          <Typography>
            <b>Remaining </b>
            <b style={{ marginLeft: '89px', paddingRight: '10px' }}>:</b>10 {selectedJob && selectedJob.RemainingCount}
          </Typography>
        </Box>
      </Popover>
    </MainCard>
  )
}

export default BasicRecruittable;
