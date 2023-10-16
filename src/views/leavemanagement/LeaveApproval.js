import React from 'react';
import { useSelector } from 'react-redux';
import { StyledContainer, StyledCard, parentStyle, StyledTypography } from './styled';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from 'primereact/button';
import SwalComp from './SwalComp';
const LeaveApproval = () => {
  const authId = useSelector((state) => state.customization.authId);
  const [leaveData, setLeaveData] = useState([]);
  const [showSwal, setShowSwal] = useState(false);
  const [leaveId, setLeaveId] = useState(null);
  console.log(authId);
  const fetchLeave = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
      console.log(response.data.leaveRequests)
      setLeaveData(response.data.leaveRequests.filter((leave) => leave.reportingto.status === false));
    } catch (error) {
      console.log(error);
    }
  };
  const handleApprove = (id) => {
    setShowSwal(true);
    setLeaveId(id);
    fetchLeave();
  };
  useEffect(() => {
    fetchLeave();
  }, []);
  return (
    <div>
      <StyledContainer title="Leave Request">
        <Grid container spacing={2} rowSpacing={3} style={parentStyle}>
          {leaveData.map((leave) => (
            <Grid
              key={leave._id}
              xs={12}
              sm={leaveData.length < 2 ? 10 : 6}
              md={leaveData.length < 2 ? 10 : 6}
              lg={leaveData.length < 2 ? 10 : 6}
            >
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
                {authId === leave.reportingto.reporterid.employeeid && (
                  <>
                    <Button
                      text
                      raised
                      style={{ marginRight: 12 }}
                      icon="pi pi-check"
                      rounded
                      outlined
                      aria-label="Filter"
                      onClick={() => handleApprove(leave._id)}
                    />
                    <Button text raised icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
                  </>
                )}
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
      {showSwal && <SwalComp leaveId={leaveId} fetchLeave={fetchLeave} />}
    </div>
  );
};

export default LeaveApproval;
