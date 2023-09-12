import { Button, Typography } from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { LinkedIn, Twitter } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { HrBtn } from './StyledConst';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
const RecruitmentView = () => {
  const [selectedJob, setSelectedJob] = useState();
  const [selectedAts, setSelectedAts] = useState([]);
  const [Selected, setSelected] = useState(0);
  const [Loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const authId = useSelector((state) => state.customization.authId);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(selectedJob);
  }, [selectedJob]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec/${id}`);
      console.log(res.data.data.orgData.find((data) => data.employeeId === authId));
      const Job = res.data.data;
      const abc = JSON.stringify(Job);
      setSelectedJob(JSON.parse(abc));
    } catch (error) {
      console.log(error);
    }
  };
  let jobrole = '';
  if (selectedJob) {
    jobrole = selectedJob.Jobrole;
  }
  console.log(jobrole);

  useEffect(() => {
    fetchApp();
  }, [selectedJob, selectedAts]);
  const accept = () => {
    hanldeApprove();
    toast.current.show({
      severity: 'success',
      summary: 'Confirmed',
      detail: 'You Have Given Acceptance To This JobRole Redirecting.....',
      life: 3000
    });
  };

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };
  const fetchApp = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/`);
      const Job1 = res.data.getData.filter((job) => job.position == jobrole);
      const Job2 = res.data.getData.filter((job) => job.position == jobrole && job.Status === 'Selected');
      setSelectedAts(Job1.length);
      setSelected(Job2.length);
      setLoader(false);
      console.log(Job1.length + ' is selected');
    } catch (error) {
      console.log(error);
    }
  };

  const handleTwitterShare = () => {
    if (selectedJob) {
      const shareText = `Check out this job opportunity
        Jobrole : ${selectedJob.Jobrole} at ${selectedJob.Company}
        Location: ${selectedJob.Location} ;
        Job opening: ${selectedJob.Openings};
        ApplicationLink:${selectedJob.ApplicationLink}`;
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

      window.open(shareUrl, '_blank');
    }
  };

  const handleLinkedInShare = async () => {
    if (selectedJob) {
      const shareText = `Check out this job opportunity:\n
          Job Role: ${selectedJob.Jobrole}\n
          Company: ${selectedJob.Company}\n
          Location: ${selectedJob.Location}\n
          Job Opening: ${selectedJob.Openings}\n
          Application Link: ${selectedJob.ApplicationLink}`;

      const apiUrl = 'https://api.linkedin.com/v2/ugcPosts';
      const accessToken = ''; // Replace with your actual access token

      const requestBody = {
        content: {
          title: 'Shared Job Opportunity',
          description: shareText
        },
        visibility: {
          code: 'anyone'
        }
      };

      try {
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Job opportunity shared on LinkedIn:', response);
      } catch (error) {
        console.error('Error sharing on LinkedIn:', error);
      }
    }
  };

  const hanldeApprove = async () => {
    try {
      const userApproval = selectedJob.orgData.find((data) => data.employeeId === authId);
      if (userApproval) {
        userApproval.approved = true;
      }
      const updatedOrgData = selectedJob.orgData.map((data) => ({
        ...data,
        approved: data._id === userApproval._id ? true : data.approved
      }));
      const updatedData = {
        ...selectedJob,
        orgData: updatedOrgData
      };
      await axios.put('https://hrm-backend-square.onrender.com/rec/getRec/' + id, updatedData);
      setTimeout(() => {
        navigate(`/hrapproval/${authId}`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const hanldeApproveMan = async () => {
    const res = await axios.put('https://hrm-backend-square.onrender.com/rec/getRec/' + id, {
      jobApproved:true
    });
    console.log(res);
  };

  return (
    <div>
      {Loader ? (
        <div className="spinner" style={{ position: 'absolute', bottom: '40%', right: '45%' }} />
      ) : (
        <MainCard title="Job Details" variant="h2" align="left">
          <Button
            onClick={() => {
              navigate('/jobtable');
            }}
            sx={{
              position: 'absolute',
              top: '128px',
              right: '50px',
              color: '#5e35b1',
              '&:hover': {
                backgroundColor: '#ede7f6'
              }
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
                backgroundColor: '#e7f2fe'
              }
            }}
          ></LinkedIn>

          <Twitter
            onClick={handleTwitterShare}
            sx={{
              position: 'absolute',
              top: '134px',
              right: '150px',
              color: '#1877F2',
              '&:hover': {
                backgroundColor: '#e7f2fe'
              }
            }}
          ></Twitter>

          {selectedJob && (
            <div>
              <Typography sx={{ lineHeight: '4', textTransform: 'capitalize' }} variant="p" component="p">
                <b> Job Role</b>
                <b style={{ marginLeft: '223px', paddingRight: '10px' }}>:</b>
                {selectedJob.Jobrole}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b>No. of Openings</b>
                <b style={{ marginLeft: '178px', paddingRight: '10px' }}>:</b> {selectedJob.Openings}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Company</b>
                <b style={{ marginLeft: '220px', paddingRight: '10px' }}>:</b> {selectedJob.Company}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Location</b>
                <b style={{ marginLeft: '225px', paddingRight: '10px' }}>:</b> {selectedJob.Location}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Worktype</b>
                <b style={{ marginLeft: '221px', paddingRight: '10px' }}>:</b> {selectedJob.Worktype}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Qualification</b>
                <b style={{ marginLeft: '200px', paddingRight: '10px' }}>:</b>
                {selectedJob.Education.includes('Others') ? selectedJob.Othereducation : selectedJob.Education}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Year of Passing</b>
                <b style={{ marginLeft: '180px', paddingRight: '10px' }}>:</b>{' '}
                {!selectedJob.Year ? <span>Not Mentioned </span> : selectedJob.Year}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Skills</b>
                <b style={{ marginLeft: '245px', paddingRight: '10px' }}>:</b> {selectedJob.Skills}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Experience</b>
                <b style={{ marginLeft: '211px', paddingRight: '10px' }}>:</b> {selectedJob.ExperienceFrom} to {selectedJob.ExperienceTo}{' '}
                Years
              </Typography>
              {selectedJob.Description ?(
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Description</b>
                <b style={{ marginLeft: '210px', paddingRight: '12px' }}>:</b>
                {selectedJob.Description}
              </Typography>): null}
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> ApplicationLink</b>
                <b style={{ marginLeft: '184px', paddingRight: '12px' }}>:</b>
                {selectedJob.ApplicationLink}
              </Typography>
              {selectedJob.Clientname ? (
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Client Name </b>
                <b style={{ marginLeft: '203px', paddingRight: '10px' }}>:</b> {selectedJob.Clientname}
              </Typography>) : null}
              {selectedJob.Clientcompany ? (
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Client Company </b>
                <b style={{ marginLeft: '181px', paddingRight: '10px' }}>:</b> {selectedJob.Clientcompany}
              </Typography>): null}
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> HR Name</b>
                <b style={{ marginLeft: '225px', paddingRight: '10px' }}>:</b> {selectedJob.Hrname}
              </Typography>
              {selectedJob.Hrcontact ? (
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> HR Contact</b>
                <b style={{ marginLeft: '214px', paddingRight: '10px' }}>:</b> {selectedJob.Hrcontact}
              </Typography>) :null} 
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> No of Interview Rounds</b>
                <b style={{ marginLeft: '139px', paddingRight: '10px' }}>:</b> {selectedJob.Interviewrounds}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Interview Details</b>
                <b style={{ marginLeft: '180px', paddingRight: '10px' }}>:</b>{' '}
                {selectedJob.Interview.map((interview, index) => (
                  <span key={index}>
                    {interview} {index !== selectedJob.Interview.length - 1 && <span>,</span>}
                  </span>
                ))}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Last Date to Apply</b>
                <b style={{ marginLeft: '171px', paddingRight: '10px' }}>:</b> {selectedJob.Deadline}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Application Count</b>
                <b style={{ marginLeft: '173px', paddingRight: '10px' }}>:</b> {selectedAts}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Selected</b>
                <b style={{ marginLeft: '231px', paddingRight: '10px' }}>:</b> {Selected}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
                <b> Remaining</b>
                <b style={{ marginLeft: '218px', paddingRight: '10px' }}>:</b> {`${selectedJob.Openings - Selected}`}
              </Typography>

              <>
                <Toast ref={toast} position="bottom-center" />
                <ConfirmDialog
                  visible={visible}
                  onHide={() => setVisible(false)}
                  message="Are you certain you wish to approve this job posting?"
                  header="Confirmation"
                  icon="pi pi-exclamation-triangle"
                  accept={accept}
                  reject={reject}
                />
                <div className="card flex justify-content-center">
                  <ButtonGroup>
                    {selectedJob.orgData.filter((item) => item.employeeId === authId) && (
                      <HrBtn
                        size="small"
                        variant="secondary"
                        disabled={selectedJob.orgData.find((data) => data.employeeId === authId && data.approved === true)}
                        onClick={() => setVisible(true)}
                        icon="pi pi-check"
                        label="Confirm"
                      >
                        {selectedJob.orgData.find((data) => data.employeeId === authId && data.approved === true)
                          ? 'Waiting For Others To Approve'
                          : 'Approve'}
                      </HrBtn>
                    )}
                    <Button size="small" onClick={hanldeApproveMan}>
                      ApproveByManager
                    </Button>
                  </ButtonGroup>
                </div>
              </>
            </div>
          )}
        </MainCard>
      )}
    </div>
  );
};
export default RecruitmentView;
