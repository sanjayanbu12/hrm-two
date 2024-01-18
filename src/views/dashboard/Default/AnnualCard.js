// import PropTypes from 'prop-types';
// import {  styled } from '@mui/material/styles';
// import { Box, Button, Grid, Typography, Card } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Dialog } from 'primereact/dialog';
// import { Dropdown } from 'primereact/dropdown';
// import { InputNumber } from 'primereact/inputnumber';
// import axios from 'axios';
// import { useContext } from 'react';
// import ApiContext from 'context/api/ApiContext';
// const CardWrapper = styled(MainCard)(({ theme }) => ({
//   backgroundColor: '#12486B',
//   color: '#fff',
//   overflow: 'hidden',
//   position: 'relative',
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     background: theme.palette.secondary[800],
//     borderRadius: 15,
//     [theme.breakpoints.down('sm')]: {
//       top: -105,
//       right: -140
//     }
//   }
// }));
// const AddDialog = styled(Dialog)`
//   && {
//     height: 300px;
//     width: 300px;
//     justify-content: center !important;
//     display: flex;
//   }
// `;
// const SumbitButton = styled(Button)`
//   && {
//     width: 100%;
//     background-color: #2196f3;
//     margin-top: 40px;
//     color: #ffff;
//   }
// `;
// const AnnualCard = ({ isLoading }) => {
//   const theme = useTheme();
//   const [open, setopen] = useState(false);
//   const [annualleave, setAnnualLeave] = useState('');

//   const [employeeId, setEmployeeId] = useState('');
//   const [selectemployee, setSelectemployee] = useState([]);

//   const EmployeeId = selectemployee._id;

//   const [allemployees, setAllemployees] = useState([]);
//   console.log(allemployees);
//   const [employeeleave, setEmployeeLeave] = useState('');
//   const employee = useSelector((state) => state.customization.authId);
//   const { employeeContextData } = useContext(ApiContext);

//   const handleSubmit = async () => {
//     try {
//       const apiUrl = `https://hrm-backend-square.onrender.com/api/updateemployee/${EmployeeId}`;
//       const response = await axios.put(apiUrl, { annualLeave: annualleave });
//       console.log(response.data);
//       setAnnualLeave('');
//       setSelectemployee([]);
//       setopen(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const fetchEmployeesData = async () => {
//     try {
//       const getall = employeeContextData;
//       const employees = getall.data;    
//       setAllemployees(employees);
//       const empId = employee;
//       const filteredEmployees = employees.filter((employee) => employee.employeeid === empId);
//       setEmployeeId(filteredEmployees.map((emp) => emp._id));
//       setEmployeeLeave(filteredEmployees.map((emp) => emp.annualLeave));
//       console.log(employeeId);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchEmployeesData();
//   }, [employeeContextData]);
//   return (
//     <>
//       {isLoading ? (
//         <SkeletonTotalOrderCard />
//       ) : (
//         <Card elevation={0}>
//           <CardWrapper border={false} content={false}>
//             <Box sx={{ p: 2.25 }}>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Grid container justifyContent="space-between">
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                       <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>ANNUAL LEAVE</Typography>
//                       <Button onClick={() => setopen(true)} sx={{ padding: '0px' }}>
//                         Add
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//                 <Grid item sx={{ mb: 0.75 }}>
//                   <Grid container alignItems="center">
//                     <Grid item xs={6}>
//                       <Grid container alignItems="center">
//                         <Grid item>
//                           {
//                             <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0 }}>
//                               {employeeleave ? employeeleave : ''}
//                             </Typography>
//                           }
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Typography
//                             sx={{
//                               fontSize: '1rem',
//                               fontWeight: 500,
//                               color: theme.palette.primary[100]
//                             }}
//                           ></Typography>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Box>
//           </CardWrapper>
//         </Card>
//       )}
//       <AddDialog header="Apply leave" visible={open} onHide={() => setopen(false)}>
//         <div>
//           <Dropdown
//             value={selectemployee}
//             onChange={(e) => setSelectemployee(e.value)}
//             options={allemployees}
//             optionLabel="name"
//             placeholder="Select Employee"
//             style={{ width: '100%', marginBottom: '20px' }}
//           />
//         </div>
//         <InputNumber
//           value={annualleave}
//           onValueChange={(e) => setAnnualLeave(e.target.value)}
//           mode="decimal"
//           showButtons
//           min={0}
//           max={100}
//           style={{ width: '100%' }}
//         />
//         <SumbitButton onClick={handleSubmit}>Add</SumbitButton>
//       </AddDialog>
//     </>
//   );
// };

// AnnualCard.propTypes = {
//   isLoading: PropTypes.bool
// };

// export default AnnualCard;

// import { Box, Button, Card, Grid, Typography } from '@mui/material';
import React,{useState,useEffect,useContext} from 'react'
import * as style from './style';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';


import { useSelector } from 'react-redux';
import axios from 'axios';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';

import ApiContext from 'context/api/ApiContext';


// import LightModeIcon from '@mui/icons-material/LightMode';
// import NightsStayIcon from '@mui/icons-material/NightsStay';
// import CoffeeSharpIcon from '@mui/icons-material/CoffeeSharp';
// import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import { Grid, Button } from '@mui/material';


const AnnualCard = ({ isLoading }) => {

  const authId = useSelector((state) => state.customization.authId);
  console.log("eee",authId)
  const [employee, setEmployee] = useState('');
  const [clockid, setClockid] = useState('');
  const [checkInDisabled, setCheckInDisabled] = useState(false);
  const [checkOutDisabled, setCheckOutDisabled] = useState(true);
  const [breakDisabled, setBreakDisabled] = useState(true);
  const [breakButtonLabel, setBreakButtonLabel] = useState('Break');
  const [breakinID, setBreackinId] = useState('');
  console.log('breack in id', breakinID);
  const [parclock, setParclock] = useState('');
  console.log('zzz', parclock);
  const [check, setCheck] = useState('');
  console.log('check', check);
  const { getattendance } = useContext(ApiContext);
  console.log("2nd attendance", getattendance);



  const { employeeContextData } = useContext(ApiContext);
  console.log("emoloyeeContextData",employeeContextData)
  const { formStatus, setStatus, att,setAtt } = useContext(FormSubmittedContext);

  console.log('clockid', clockid);

  const fetchEmployee = async () => {
    try {
      const res = await employeeContextData;
      const matchingEmployee = res.data.find((emp) => emp.employeeid === authId);
      if (matchingEmployee) {
        setEmployee(matchingEmployee);
      } else {
        console.log('Employee not found for authId:', authId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [employeeContextData]);

  const RectifyCheckout = async () => {
  try {
    const response = await getattendance;
    const underid = response.map((data) => data._id);
    console.log("getting first id", underid);
    const authIdToFind = authId; 
    const matchingItem = response.reverse().find((data) => data.authId === authIdToFind); 
    if (matchingItem) {
      const matchingItemId = matchingItem._id;
      console.log(`Found matching _id for authId`,matchingItemId);
      setParclock(matchingItemId);
    
    } else {
      console.log(`No matching item found for authId ${authIdToFind}`);
    }

const Checkbreak=response.find((data) => data.authId === authIdToFind); 
setBreackinId(Checkbreak.break.map((data) => data._id)[Checkbreak.break.length - 1]);



  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    RectifyCheckout();
  }, [getattendance]);

  const handleCheckInClick = async () => {
    const currentDate = new Date();
    const checkInData = {
      date: currentDate.toISOString(),
      checkInTime: currentDate.toISOString(),
      employeeId: employee._id,
      authId: authId
    };
    try {
      const response = await axios.post('https://hrm-backend-square.onrender.com/clock/create', checkInData);
      if (response.status === 200) {
        console.log('Check-in successful!');
        setStatus(!formStatus);
        setAtt(!att);
        setCheckInDisabled(true);
        setCheckOutDisabled(false);
        setBreakDisabled(false);
      } else {
        console.log('Failed to check in');
      }
    } catch (error) {
      console.error('Error while checking in:', error);
    }

  };
  const handleBreakClick = async () => {
    if (breakButtonLabel === 'Break') {
      const currentDate = new Date();
      try {
        const response = await axios.post(`https://hrm-backend-square.onrender.com/break/create`, {
          breakin: currentDate.toISOString(),
          attid: parclock
        });
        setStatus(!formStatus);
        setAtt(!att);
      
        

        if (response.status === 200) {
          console.log('Break in successful!', response);

        } else {
          console.log('Failed to Break in.');
        }
      } catch (error) {
        console.log(error);
      }
      setCheckOutDisabled(true);
    } else if (breakButtonLabel === 'In') {
      const currentDate = new Date();
      try {
        const response = await axios.put(`https://hrm-backend-square.onrender.com/break/update/${breakinID}`, {
          breakout: currentDate.toISOString()
        });
        if (response.status === 200) {
          console.log('Break Out successful!', response);
          handleStart ();
          setStatus(!formStatus);
        } else {
          console.log('Failed to Break Out');
        }
      } catch (error) {
        console.log(error);
      }
      setCheckOutDisabled(false);
    }
    setBreakButtonLabel((currentLabel) => (currentLabel === 'Break' ? 'In' : 'Break'));
  };

  const getdata = async () => {
    try {
      console.log('ww', employee._id);
      const resp = await axios.get(`https://hrm-backend-square.onrender.com/api/getemployee/${employee._id}`);
      console.log('Total employee data', resp);
      const particulr = resp.data.clockid;
      console.log('zzz', particulr);
      const fetchClock = resp.data.clockid;
      setClockid(fetchClock);
      if (Array.isArray(particulr) && particulr.length > 0) {
        const extractedIds = particulr.map((item) => item._id);
        console.log('zxc', extractedIds);
      } else {
        console.log('particulr is not an array or is empty');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, [employee]);

  

  // const zoomInStyle = {
  //   transform: checkInDisabled ? 'scale(0.6)' : 'scale(0.7)',
  //   transition: 'transform 0.1s'
  // };

  // const zoomOutStyle = {
  //   transform: checkOutDisabled ? 'scale(0.6)' : 'scale(0.7)',
  //   transition: 'transform 0.1s'
  // };
  // const breakStyle = {
  //   transform: breakDisabled ? 'scale(0.6)' : 'scale(0.7)',
  //   transition: 'transform 0.1s'
  // };

  const checkButton = async () => {
    try {
      const res = employeeContextData;
      const matchingEmployee = res.data.find((emp) => emp.employeeid === authId);

      if (matchingEmployee) {
        const clockData = matchingEmployee.clockid || [];
        const currentDate = new Date().toLocaleDateString();

        // Check if there is a checkInTime entry for today's date
        const hasCheckInForToday = clockData.some((clockData) => {
          return new Date(clockData.date).toLocaleDateString() === currentDate && clockData.checkInTime;
        });

        const hasCheckOutForToday = clockData.some((clockData) => {
          return new Date(clockData.date).toLocaleDateString() === currentDate && clockData.checkOutTime;
        });

        const flattenedEmployeeData = clockData.map((clockData) => ({
          name: matchingEmployee.name,
          date: clockData.date,
          checkInTime: clockData.checkInTime,
          checkOutTime: clockData.checkOutTime,
          breakin: clockData.break.map((data) => data.breakin),
          breakout: clockData.break.map((data) => data.breakout),
          workingHours: (clockData.checkInTime, clockData.checkOutTime, clockData.break)
        }));

        setCheck(flattenedEmployeeData);

        // Disable the "Check In" button if there is already a checkInTime for today
        setCheckInDisabled(hasCheckInForToday);

        // Enable the "Check Out" button if there is a checkInTime for today and the current breakButtonLabel is not "In"
        setCheckOutDisabled(!hasCheckInForToday || breakButtonLabel === 'In');
        setBreakDisabled(!hasCheckInForToday)
        // Disable all buttons if there is a checkOutTime for today
        if (hasCheckOutForToday) {
          setCheckInDisabled(true);
          setCheckOutDisabled(true);
          setBreakDisabled(true);
        }
      } else {
        console.log('Employee not found for authId:', authId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkButton();
  }, [employeeContextData]);

  const handleCheckOutClick = async () => {
    const currentDate = new Date();

    try {
      const response = await axios.put(`https://hrm-backend-square.onrender.com/clock/update/${parclock}`, {
        checkOutTime: currentDate.toISOString()
      });
      if (response.status === 200) {
        console.log('Check-Out successful!');
        // setCheckInDisabled(false);
        // setCheckInDisabled(hasCheckInForToday);
        setStatus(!formStatus);


        setCheckOutDisabled(true);
        setBreakDisabled(true);
      } else {
        console.log('Failed to check in.');
      }
    } catch (error) {
      console.error('Error while checking in:', error);
    }
  };
  console.log("checkin id ", parclock)





  return (
    <>
          {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        

        <style.MovieCard style={{backgroundColor:"black"}}>
          <style.Content>
            {checkInDisabled ? (<style.H1>CHECK IN</style.H1>): <style.H1></style.H1> } CHECK IN
           
            {/* <style.Infos >This is info</style.Infos> */}
            
            <style.Synopsis style={{transform:"translateY(35px)"}}>
              <Grid container style={{display:"flex", justifyContent:"space-evenly"}}>
               

           
              {checkInDisabled ?( 
          ''
      ):  
      <Grid item style={{width:"fit-content"}}>
      <Button
      // icon={<LightModeIcon sx={{ fontSize: '20px', mr: '8px', mt: '3px' }} />}
      // label="Check In"
      // severity="success"
      // disabled={checkInDisabled}
      variant='contained'
      size='small'
      onClick={handleCheckInClick}
      // style={zoomInStyle} // Apply zoom-in style when needed
    >Check In</Button> 
    </Grid>
    }

     {checkOutDisabled ?(
     ''
      ): 
      <Grid item style={{width:"fit-content"}}>
      <Button
      // icon={<NightsStayIcon sx={{ fontSize: '20px', mr: '8px', mt: '3px' }} />}
      // style={zoomOutStyle}
      // label="Check Out"
      // severity="danger"
      variant="contained"
      size='small'

      // disabled={checkOutDisabled}
      onClick={handleCheckOutClick}
    >Check Out</Button>
    </Grid>
    }
     {breakDisabled ? ( 
    ''
    ):  
    <Grid item style={{width:"fit-content"}}>
    <Button
    // icon={
    //   breakButtonLabel === 'Break' ? (
    //     <CoffeeSharpIcon sx={{ fontSize: '20px', mr: '8px', mt: '3px' }} />
    //   ) : (
    //     <MeetingRoomSharpIcon sx={{ mr: '8px', mt: '3px' }} />
    //   )
    // }
    size='small'

    variant="contained"
    onClick={handleBreakClick}
    // disabled={breakDisabled}
    // style={{  ...breakStyle }}
  >{breakButtonLabel}</Button> 
  </Grid>
  }
         </Grid>

              
              
            </style.Synopsis>

          </style.Content>
          
          </style.MovieCard>        

        // <Card elevation={0}>
        //   <CardWrapper border={false} content={false}>
        //     <Box sx={{ p: 2.25 }}>
        //       <Grid container direction="column">
        //         <Grid item>
        //           <Grid container justifyContent="space-between">
        //             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        //               <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>ANNUAL LEAVE</Typography>
        //               <Button  sx={{ padding: '0px' }}>
        //                 Add
        //               </Button>
        //             </div>
        //           </Grid>
        //         </Grid>
        //         <Grid item sx={{ mb: 0.75 }}>
        //           <Grid container alignItems="center">
        //             <Grid item xs={6}>
        //               <Grid container alignItems="center">
        //                 <Grid item>
        //                   {
        //                     <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0 }}>
        //                       {/* {employeeleave ? employeeleave : ''} */}
        //                     </Typography>
        //                   }
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                   <Typography
        //                     sx={{
        //                       fontSize: '1rem',
        //                       fontWeight: 500,
        //                       // color: theme.palette.primary[100]
        //                     }}
        //                   ></Typography>
        //                 </Grid>
        //               </Grid>
        //             </Grid>
        //           </Grid>
        //         </Grid>
        //       </Grid>
        //     </Box>
        //   </CardWrapper>
        // </Card>
      )}
  
    </>
  );
};

// AnnualCard.propTypes = {
//   isLoading: PropTypes.bool
// };
    

export default AnnualCard
