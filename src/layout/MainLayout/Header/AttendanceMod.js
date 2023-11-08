import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CoffeeSharpIcon from '@mui/icons-material/CoffeeSharp';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';


const AttendanceMod = () => {
  const authId = useSelector((state) => state.customization.authId);
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

    // Extract the array of _id values from the response
    const underid = response.map((data) => data._id);
    console.log("getting first id", underid);

    // Check if authId exists in the response array and get the _id of the last matching item
    const authIdToFind = authId; // Replace with your authId value
    const matchingItem = response.reverse().find((data) => data.authId === authIdToFind); 
    // Reverse the array and find the first matching item

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

  const zoomInStyle = {
    transform: checkInDisabled ? 'scale(0.6)' : 'scale(1)',
    transition: 'transform 0.1s'
  };

  const zoomOutStyle = {
    transform: checkOutDisabled ? 'scale(0.6)' : 'scale(1)',
    transition: 'transform 0.1s'
  };
  const breakStyle = {
    transform: breakDisabled ? 'scale(0.6)' : 'scale(1)',
    transition: 'transform 0.1s'
  };

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
      <Button
        icon={<LightModeIcon sx={{ fontSize: '20px', mr: '8px', mt: '3px' }} />}
        label="Check In"
        severity="success"
        disabled={checkInDisabled}
        onClick={handleCheckInClick}
        style={zoomInStyle} // Apply zoom-in style when needed
      />
      <Button
        icon={<NightsStayIcon sx={{ fontSize: '20px', mr: '8px', mt: '3px' }} />}
        style={zoomOutStyle}
        label="Check Out"
        severity="danger"
        disabled={checkOutDisabled}
        onClick={handleCheckOutClick}
      />
      <Button
        icon={
          breakButtonLabel === 'Break' ? (
            <CoffeeSharpIcon sx={{ fontSize: '20px', mr: '8px', mt: '3px' }} />
          ) : (
            <MeetingRoomSharpIcon sx={{ mr: '8px', mt: '3px' }} />
          )
        }
        label={breakButtonLabel}
        severity="warning"
        onClick={handleBreakClick}
        disabled={breakDisabled}
        style={{ marginLeft: '12px', ...breakStyle }}
      />
    </>
  );
};

export default AttendanceMod;
