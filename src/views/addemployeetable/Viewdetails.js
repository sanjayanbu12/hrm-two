import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'ui-component/cards/MainCard';

const Viewdetails = () => {
  const [employeedetails, setEmployeeDetails] = useState();
  const { employeeid } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/api/getemployee/${employeeid}`);
      setEmployeeDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  // const Edit = (id) => {
  //   navigate(`/newemployee/${id}`);
  // };

  const formatteddob = employeedetails?.dob
    ? new Date(employeedetails.dob).toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
    : '';
  const formattedjoin = employeedetails?.join
    ? new Date(employeedetails.join).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  const back = () => {
    navigate(`/basictable`);
  };

  if (!employeedetails) {
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
      <MainCard title="Employee Details">
        {/* <Button
          onClick={() => Edit(employeedetails._id)}
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
        </Button> */}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gridGap: '15px',marginLeft:'60px' }}>
          <div >
            <p><b>Employee ID</b></p>
            <p>{employeedetails.employeeid}</p>
          </div>
          <div>
            <p><b>Title</b></p>
            <p>{employeedetails.title}</p>
          </div>
          <div>
            <p><b>First Name</b></p>
            <p>{employeedetails.name}</p>
          </div>
          <div>
            <p><b>Last Name</b></p>
            <p>{employeedetails.lastname}</p>
          </div>
          <div>
            <p><b>Gender</b></p>
            <p>{employeedetails.gender}</p>
          </div>
          <div>
            <p><b>Mobile</b></p>
            <p>{employeedetails.mob}</p>
          </div>
          <div>
            <p><b>Alternate Mobile</b></p>
            <p>{employeedetails.altmob}</p>
          </div>
          <div>
            <p><b>Email</b></p>
            <p>{employeedetails.email}</p>
          </div>
          <div>
            <p><b>Date of Birth</b></p>
            <p>{formatteddob}</p>
          </div>
          <div>
            <p><b>Blood Group</b></p>
            <p>{employeedetails.bloodgroup}</p>
          </div>
          <div>
            <p><b>Father`s Name</b></p>
            <p>{employeedetails.fathername}</p>
          </div>
          <div>
            <p><b>Nationality</b></p>
            <p>{employeedetails.nationality}</p>
          </div>
          <div>
            <p><b>Religion</b></p>
            <p>{employeedetails.religion}</p>
          </div>
          <div>
            <p><b>Reporting To</b></p>
            <p>{employeedetails.report}</p>
          </div>
          <div>
            <p><b>Joined Date</b></p>
            <p>{formattedjoin}</p>
          </div>
          <div>
            <p><b>Designation</b></p>
            <p>{employeedetails.desi}</p>
          </div>
          <div>
            <p><b>Department</b></p>
            <p>{employeedetails.dept}</p>
          </div>
          <div>
            <p><b>Work Type</b></p>
            <p>{employeedetails.type}</p>
          </div>
          <div>
            <p><b>Permanent Address</b></p>
            <p>{employeedetails.peraddress}</p>
          </div>
          <div>
            <p><b>Temporary Address</b></p>
            <p>{employeedetails.temaddress}</p>
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

export default Viewdetails;
