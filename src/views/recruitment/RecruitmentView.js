// import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import axios from 'axios'



const RecruitmentView = () => {

  const [selectedJob, setSelectedJob] = useState();
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    fetchData()
  }, []);
  console.log(id + " selected job id");

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec/${id}`)
      const Job = res.data.data;
      const abc = JSON.stringify(Job)
      setSelectedJob(JSON.parse(abc))

      console.log(Job + "Data")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(selectedJob + " selected Data")

  
  
  return (
    
  <div>
    <MainCard title="Job Details" variant='h2' align='left'>

    <Button    onClick={() => {
              navigate('/jobtable');
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
            <div>
        
                  <Typography sx={{ lineHeight: '4', textTransform: 'capitalize' }} variant='p' component='p'>
                    <b> Job Role</b>
                    <b style={{ marginLeft: '223px', paddingRight: '10px' }}>:</b>
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
                    <b style={{ marginLeft: '200px', paddingRight: '10px' }}>:</b>{' '}
                    {selectedJob.Education === 'Others' ? selectedJob.OtherEducation : selectedJob.Education}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Year of Passing</b>
                    <b style={{ marginLeft: '180px', paddingRight: '10px' }}>:</b>{' '}
                    {!selectedJob.Year ? <span>Not Mentioned </span> : selectedJob.Year}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Experience</b>
                    <b style={{ marginLeft: '211px', paddingRight: '10px' }}>:</b> {selectedJob.ExperienceFrom} to{' '}
                    {selectedJob.ExperienceTo} Years
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Description</b>
                    <b style={{ marginLeft: '210px', paddingRight: '10px' }}>:</b>
                    {selectedJob.Description}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> ApplicationLink</b>
                    <b style={{ marginLeft: '183px', paddingRight: '10px' }}>:</b> {selectedJob.ApplicationLink}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Last Date to Apply</b>
                    <b style={{ marginLeft: '168px', paddingRight: '10px' }}>:</b> {selectedJob.Deadline}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Application Count</b>
                    <b style={{ marginLeft: '170px', paddingRight: '10px' }}>:</b> {selectedJob.ApplicationCount}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Selected</b>
                    <b style={{ marginLeft: '228px', paddingRight: '10px' }}>:</b> {selectedJob.SelectedCount}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Remaining</b>
                    <b style={{ marginLeft: '215px', paddingRight: '10px' }}>:</b> {selectedJob.RemainingCount}
                  </Typography>
               </div>
        
        )}
 
    </MainCard>
    </div>
  )
}
export default RecruitmentView;