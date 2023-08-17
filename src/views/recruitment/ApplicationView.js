// import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import axios from 'axios'



const ApplicationView = () => {

  const [selectedJob, setSelectedJob] = useState();
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    fetchData()
  }, []);
  console.log(id + " selected job id");

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/${id}`)
      const Job = res.data.data;
      const abc = JSON.stringify(Job)
      setSelectedJob(JSON.parse(abc))

      console.log(Job + "Data")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(selectedJob + " selected Data")

  const formatDate = (date) => {
    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day}-${month}-${year}`
  }
  
  
  return (
    
  <div>
    <MainCard title=" Candidate Application View" variant='h2' align='left'>

    <Button    onClick={() => {
              navigate('/applicationtracker');
            }}
        sx={{
          position: 'absolute',
          top: '140px',
          right: '50px',
          color: '#5e35b1',
          '&:hover': {
            backgroundColor: '#ede7f6',
          },
        }}
        
      >
       Back
      </Button>


      {selectedJob && (
        <>
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              background: '#0efcfc',
              marginBottom: '1px'
            }}
          >
          </Box> */}
          

         
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Job Role</b>
                <b style={{ marginLeft: '223px', paddingRight: '12px' }}>:</b>
                {selectedJob.position}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b>Name</b>
                <b style={{ marginLeft: '242px', paddingRight: '10px' }}>:</b> {selectedJob.name}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Email</b>
                <b style={{ marginLeft: '244px', paddingRight: '10px' }}>:</b> {selectedJob.email}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Phone</b>
                <b style={{ marginLeft: '240px', paddingRight: '10px' }}>:</b> {selectedJob.phone}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Qualification</b>
                <b style={{ marginLeft: '202px', paddingRight: '10px' }}>:</b> {selectedJob.qualification}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Experience</b>
                <b style={{ marginLeft: '212px', paddingRight: '10px' }}>:</b> {selectedJob.experience} years
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Skills</b>
                <b style={{ marginLeft: '247px', paddingRight: '10px' }}>:</b> {selectedJob.skills}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                <b> Applied Date</b>
                <b style={{ marginLeft: '200px', paddingRight: '12px' }}>:</b>
                {formatDate(selectedJob.createdAt)}
              </Typography>
           

        </>
      )}
    </MainCard>
    </div>
  )
}
export default ApplicationView