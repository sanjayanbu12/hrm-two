import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {  useParams,useNavigate } from 'react-router';
import axios from 'axios';
import { Button,Stack} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'ui-component/cards/MainCard';



const Viewdetails = () => {
  const [employeedetails, setEmployeeDetails] = useState();
  const { employeeid } = useParams();
  useEffect(() => {
    fetchData()
    }, []);
  console.log(employeeid);
  const fetchData=async()=>{  
    try {
      const res=await axios.get(`https://hrm-backend-square.onrender.com/api/getemployee/${employeeid}`)
      setEmployeeDetails(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  const navigate=useNavigate()
  const Edit = (id) => {
    navigate(`/newemployee/${id}`);
  };

  const back = () => {
    navigate(`/Addemployeetable`);
  };

  if (!employeedetails) {
    return (
      <div>
        {' '}
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

    <Button onClick={() => Edit(employeedetails._id)}
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
        Edit 
      </Button>

    {employeedetails && (
      <div>
        <p><b>Employee ID:</b> {employeedetails.employeeid}</p>
        <p><b>First Name:</b> {employeedetails.name}</p>
        <p><b>Last Name:</b> {employeedetails.lastname}</p>
        <p><b>Gender:</b> {employeedetails.gender}</p>
        <p><b>Email:</b> {employeedetails.email}</p>
        <p><b>Date of Birth:</b> {employeedetails.dob}</p>
        <p><b>Mobile Number:</b> {employeedetails.mob}</p>
        <p><b>Alternate Mobile Number:</b> {employeedetails.altmob}</p>
        <p><b>Department:</b> {employeedetails.dept}</p>
        <p><b>Permanent Address:</b> {employeedetails.peraddress}</p>
        <p><b>Blood Group:</b> {employeedetails.bloodgroup}</p>
        <p><b>Joining Date:</b> {employeedetails.join}</p>
        <p><b>Work Type:</b> {employeedetails.type}</p>


<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
        sx={{
          color: '#5e35b1',
          '&:hover': {
            backgroundColor: '#ede7f6',
          },
        }}
        onClick={back}
      >
        Back
      </Button>
      </div>

      </div>
    )}
    </MainCard>
  </div>
  
  );
};

export default Viewdetails;
