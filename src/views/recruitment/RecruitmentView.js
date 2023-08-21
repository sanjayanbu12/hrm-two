
import { Button, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import axios from 'axios'
import {  Facebook, LinkedIn } from '@mui/icons-material'





const RecruitmentView = () => {

  const [selectedJob, setSelectedJob] = useState();
  const { id } = useParams();
  const navigate =useNavigate();

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

      console.log(d + " Data")
    } catch (error) {
      console.log(error)
    }
  }
    // const handleTwitterShare = () => {
    //   if (selectedJob) {
    //     const shareText = `Check out this job opportunity
    //     jobrole : ${selectedJob.Jobrole} at ${selectedJob.Company} 
    //     Location: ${selectedJob.Location} 
    //     Job opening: ${selectedJob.Openings}`;
    //     const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        
    //     window.open(shareUrl, '_blank');
    //   }
    // }      
  
    const handleLinkedInShare = () => {
      if (selectedJob) {
        const shareText = `Check out this job opportunity: ${selectedJob.Jobrole} at ${selectedJob.Company}`;
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          window.location.href
        )}&title=${encodeURIComponent(selectedJob.Jobrole)}&summary=${encodeURIComponent(
          shareText
        )}`;
        
        window.open(shareUrl, '_blank');
      }
    }
    
    const hanldeApprove = async()=>{
      const res=await axios.put('https://hrm-backend-square.onrender.com/rec/getRec/' + id,{
        approvalstatus: {
          hr: true
      },
      })
      console.log(res)
    }
     
  const handleFacebookShare = () => {
    if (selectedJob) {
      const shareText = `Check out this job opportunity: ${selectedJob.Jobrole} at ${selectedJob.Company}`;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}&quote=${encodeURIComponent(shareText)}`;

      window.open(shareUrl, '_blank');
    }
  };

  return (
    
  <div>
    <MainCard title="Job Details" variant='h2' align='left'>

    <Button    onClick={() => {
              navigate('/jobtable');
            }}
        sx={{
          position: 'absolute',
          top: '128px',
          right: '50px',
          color: '#5e35b1',
          '&:hover': {
            backgroundColor: '#ede7f6',
          },
        }}
        
      >
       Back
      </Button>
      <LinkedIn
          onClick={handleLinkedInShare}
          sx={{
            position: 'absolute',
            top: '134px',
            right: '120px',
            color: '#1877F2', 
            '&:hover': {
              backgroundColor: '#e7f2fe',
            },
          }}
        >
          </LinkedIn >
    
      <Facebook
          onClick={handleFacebookShare}
          sx={{
            position: 'absolute',
            top: '134px',
            right: '150px',
            color: '#1877F2', 
            '&:hover': {
              backgroundColor: '#e7f2fe',
            },
          }}
        >
          </Facebook >
       

     
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
                    <b style={{ marginLeft: '200px', paddingRight: '10px' }}>:</b>
                    {selectedJob.Education.includes('Others') ? selectedJob.Othereducation : selectedJob.Education}
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
                    <b style={{ marginLeft: '210px', paddingRight: '12px' }}>:</b>
                    {selectedJob.Description}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Client Name     </b>
                    <b style={{ marginLeft: '203px', paddingRight: '10px' }}>:</b> {selectedJob.Clientname}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Client Company </b>
                    <b style={{ marginLeft: '181px', paddingRight: '10px' }}>:</b> {selectedJob.Clientcompany}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> HR Name</b>
                    <b style={{ marginLeft: '225px', paddingRight: '10px' }}>:</b> {selectedJob.Hrname}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> HR Contact</b>
                    <b style={{ marginLeft: '214px', paddingRight: '10px' }}>:</b> {selectedJob.Hrcontact}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> No of Interview Rounds</b>
                    <b style={{ marginLeft: '139px', paddingRight: '10px' }}>:</b> {selectedJob.Interviewrounds}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Interview Details</b>
                    <b style={{ marginLeft: '180px', paddingRight: '10px' }}>:</b> {selectedJob.Interview}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Last Date to Apply</b>
                    <b style={{ marginLeft: '171px', paddingRight: '10px' }}>:</b> {selectedJob.Deadline}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Application Count</b>
                    <b style={{ marginLeft: '173px', paddingRight: '10px' }}>:</b> {selectedJob.ApplicationCount}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Selected</b>
                    <b style={{ marginLeft: '231px', paddingRight: '10px' }}>:</b> {selectedJob.SelectedCount}
                  </Typography>
                  <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                    <b> Remaining</b>
                    <b style={{ marginLeft: '218px', paddingRight: '10px' }}>:</b> {selectedJob.RemainingCount}
                  </Typography>
                  <Button size='small' onClick={hanldeApprove}>Approve</Button>
               </div>
              
        )}
 
    </MainCard>
    </div>
  )
}
export default RecruitmentView;