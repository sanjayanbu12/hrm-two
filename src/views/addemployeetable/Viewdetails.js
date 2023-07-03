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
        <p><b>Employee ID<span style={{  position: 'absolute',left:'490px'}}>:</span></b><span style={{ position: 'absolute', left:'510px' }}>{employeedetails.employeeid}</span></p>
        <p><b>First Name<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.name}</span></p>
        <p><b>Last Name<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.lastname}</span></p>
        <p><b>Gender<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.gender}</span></p>
        <p><b>Email<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.email}</span></p>
        <p><b>Date of Birth<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.dob}</span></p>
        <p><b>Mobile Number<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.mob}</span></p>
        <p><b>Alternate Mobile Number<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.altmob}</span></p>
        <p><b>Department<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.dept}</span></p>

        <p><b>Permanent Address<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.peraddress}</span></p>
       
        <p><b>Blood Group<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.bloodgroup}</span></p>

        <p><b>Joining Date<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.join}</span></p>

        <p><b>Work Type<span style={{  position: 'absolute',left:'490px'}}>:</span></b> <span style={{ position: 'absolute', left:'510px' }}>{employeedetails.type}</span></p>


<div style={{
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'flex-end',
  }}
>
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
