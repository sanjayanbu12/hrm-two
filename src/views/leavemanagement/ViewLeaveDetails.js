import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'ui-component/cards/MainCard';

const ViewLeaveDetails = () => {
  const [leaveDetails, setLeaveDetails] = useState();
  const { leaveId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`);
      setLeaveDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const Edit = (id) => {
    navigate(`/requestleave/${id}`);
  };

  const formattedStartDate = leaveDetails?.startDate
    ? new Date(leaveDetails.startDate).toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
    : '';

  const formattedEndDate = leaveDetails?.endDate
    ? new Date(leaveDetails.endDate).toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
    : '';

  const back = () => {
    navigate(`/leavetable`);
  };

  if (!leaveDetails) {
    return (
      <div>
        <Stack
          sx={{ color: 'grey.500', width: '100%', height: '80vh', justifyContent: 'center', alignItems: 'center' }}
          spacing={9}
          direction="row"
        >
          <CircularProgress color="secondary" />
        </Stack>
      </div>
    );
  }

  return (
    <div>
      <MainCard title="Leave Details">
        <Button
          onClick={() => Edit(leaveDetails.employeeId)}
          sx={{
            position: 'absolute',
            top: '140px',
            right: '50px',
            color: '#5e35b1',
            '&:hover': {
              backgroundColor: '#ede7f6'
            }
          }}
        >
          Edit
        </Button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gridGap: '15px',marginLeft:'60px' }}>
          <div>
            <p><b>Employee ID</b></p>
            <p>{leaveDetails.employeeId}</p>
          </div>
          <div>
            <p><b>Employee Name</b></p>
            <p>{leaveDetails.employeeName}</p>
          </div>
          <div>
            <p><b>Leave Type</b></p>
            <p>{leaveDetails.leaveType}</p>
          </div>
          <div>
            <p><b>Start Date</b></p>
            <p>{formattedStartDate}</p>
          </div>
          <div>
            <p><b>End Date</b></p>
            <p>{formattedEndDate}</p>
          </div>
          <div>
            <p><b>Number of Days</b></p>
            <p>{leaveDetails.numberOfDays}</p>
          </div>
          <div>
            <p><b>Attachments</b></p>
            <p>{leaveDetails.attachments}</p>
          </div>
          <div>
            <p><b>Reason</b></p>
            <p>{leaveDetails.reason}</p>
          </div>
          <div>
            <p><b>Status</b></p>
            <p>{leaveDetails.status}</p>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            top: 20,
            right: 10,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            sx={{
              color: '#5e35b1',
              '&:hover': {
                backgroundColor: '#ede7f6'
              }
            }}
            onClick={back}
          >
            Back
          </Button>
        </div>
      </MainCard>
    </div>
  );
};

export default ViewLeaveDetails;
