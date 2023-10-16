import React from 'react';
import { useSelector } from 'react-redux';
import { StyledContainer, StyledCard, parentStyle, StyledTypography } from './styled';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from 'primereact/button';
const LeaveApproval = () => {
  const userId = useSelector((state) => state.customization.userId);
  const [leaveData, setLeaveData] = useState([]);
  console.log(userId);
  const fetchLeave = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
      setLeaveData(response.data.filter((leave) => leave.reportingto.status === false));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeave();
  }, []);
  return (
    <div>
      <StyledContainer title="Leave Request">
        <Grid container spacing={2} rowSpacing={3} style={parentStyle}>
          {leaveData.map((leave) => (
            <Grid key={leave._id} xs={12} sm={6} md={6} lg={6}>
              <StyledCard key={leave._id}>
                <StyledTypography variant="h4">
                  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {leave.employeeName}
                </StyledTypography>
                <StyledTypography variant="h4">
                  EmployeeId &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{leave.employeeId}
                </StyledTypography>
                <StyledTypography variant="h4">
                  Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{leave.leaveType}
                </StyledTypography>
                <StyledTypography variant="h4">
                  Days &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{leave.numberOfDays}
                </StyledTypography>

                <>
                <Button text raised style={{marginRight:12}} icon="pi pi-check" rounded outlined aria-label="Filter" />
                <Button text raised icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
                </>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </div>
  );
};

export default LeaveApproval;
