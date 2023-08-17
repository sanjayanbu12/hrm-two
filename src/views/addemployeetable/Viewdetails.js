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

  const Edit = (id) => {
    navigate(`/newemployee/${id}`);
  };

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
    navigate(`/Addemployeetable`);
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
      <MainCard title="Employee Information">
        <Button
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
        </Button>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>
          <div style={{ marginLeft: '20px' }}>
            <p>
              <b>Employee ID</b>
            </p>
            <p>{employeedetails.employeeid}</p>
          </div>
          <div style={{ marginLeft: '110px' }}>
            <p>
              <b>Title</b>
            </p>
            <p>{employeedetails.title}</p>
          </div>
          <div style={{ marginLeft: '245px' }}>
            <p>
              <b>First Name</b>
            </p>
            <p>{employeedetails.name}</p>
          </div>
          <div style={{ marginLeft: '160px' }}>
            <p>
              <b>Last Name</b>
            </p>
            <p>{employeedetails.lastname}</p>
          </div>
          <div style={{ marginLeft: '210px' }}>
            <p>
              <b>Gender</b>
            </p>
            <p>{employeedetails.gender}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>
          <div style={{ marginLeft: '20px' }}>
            <p>
              <b>Mobile</b>
            </p>
            <p>{employeedetails.mob}</p>
          </div>
          <div style={{ marginLeft: '110px' }}>
            <p>
              <b>Email</b>
            </p>
            <p>{employeedetails.email}</p>
          </div>

          <div style={{ marginLeft: '170px' }}>
            <p>
              <b>Date of Birth</b>
            </p>
            <p>{formatteddob}</p>
          </div>
          <div style={{ marginLeft: '150px' }}>
            <p>
              <b>Blood Group</b>
            </p>
            <p>{employeedetails.bloodgroup}</p>
          </div>
          <div style={{ marginLeft: '195px' }}>
            <p>
              <b>Father`s Name</b>
            </p>
            <p>{employeedetails.fathername}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>
          <div style={{ marginLeft: '20px' }}>
            <p>
              <b>Nationality</b>
            </p>
            <p>{employeedetails.nationality}</p>
          </div>

          <div style={{ marginLeft: '120px' }}>
            <p>
              <b>Place of Birth</b>
            </p>
            <p>{employeedetails.placeofbirth}</p>
          </div>

          <div style={{ marginLeft: '190px' }}>
            <p>
              <b>Religion</b>
            </p>
            <p>{employeedetails.religion}</p>
          </div>
          <div style={{ marginLeft: '170px' }}>
            <p>
              <b>Personal Email</b>
            </p>
            <p>{employeedetails.peremail}</p>
          </div>

          <div style={{ marginLeft: '185px' }}>
            <p>
              <b>Joined Date</b>
            </p>
            <p>{formattedjoin}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginLeft: '20px' }}>
            <p>
              <b>Status</b>
            </p>
            <p>{employeedetails.status}</p>
          </div>

          <div style={{ marginLeft: '150px' }}>
            <p>
              <b>Designation</b>
            </p>
            <p>{employeedetails.desi}</p>
          </div>
          <div style={{ marginLeft: '150px' }}>
            <p>
              <b>Department</b>
            </p>
            <p>{employeedetails.dept}</p>
          </div>
          {/* </div> */}
          {/* 
        </MainCard> */}

          {/* <MainCard title="Personal Information"> */}

          <div style={{ marginLeft: '150px' }}>
            <p>
              <b>Permanent Address</b>
            </p>
            <p>{employeedetails.peraddress}</p>
          </div>
          <div style={{ marginLeft: '150px' }}>
            <p>
              <b>Temporary Address</b>
            </p>
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
