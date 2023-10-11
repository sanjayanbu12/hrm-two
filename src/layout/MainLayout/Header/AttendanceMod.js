import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const AttendanceMod = () => {
    const authId = useSelector((state) => state.customization.authId);
    const [employee, setEmployee] = useState('');
    const[clockid,setClockid]=useState('');
    const [checkInDisabled, setCheckInDisabled] = useState(false);
    const [checkOutDisabled, setCheckOutDisabled] = useState(true);
    const [breakDisabled, setBreakDisabled] = useState(true);
    const [breakButtonLabel, setBreakButtonLabel] = useState('Break');
    const[parclock,setParclock]=useState("");
    console.log("zzz",parclock)

    console.log("clockid",clockid)

    const fetchEmployee = async () => {
        try {
            const res = await axios.get("https://hrm-backend-square.onrender.com/api/allemployee");
            const matchingEmployee = res.data.find(emp => emp.employeeid === authId);
            if (matchingEmployee) {
                setEmployee(matchingEmployee);
            } else {
                console.log("Employee not found for authId:", authId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, []);
    

    const handleCheckInClick = async () => {
        const currentDate = new Date();
        const checkInData = {
            date: currentDate.toISOString(),
            checkInTime: currentDate.toISOString(), 
            employeeId: employee._id,
            authId: authId
        };
        try {
            const response = await axios.post("https://hrm-backend-square.onrender.com/clock/create", checkInData);
            setParclock(response.data.savedData)
            if (response.status === 200) {
                console.log("Check-in successful!");
                setCheckInDisabled(true);
                setCheckOutDisabled(false);
                setBreakDisabled(false);
               
            } else {
                console.log("Failed to check in.");
            }
        } catch (error) {
            console.error("Error while checking in:", error);
        }
    };
    const handleBreakClick = async () => {
        if (breakButtonLabel === 'Break') {
            setCheckOutDisabled(true);
        } else if (breakButtonLabel === 'In') {
            setCheckOutDisabled(false);
        }
        setBreakButtonLabel((currentLabel) => (currentLabel === 'Break' ? 'In' : 'Break'));
    };


    const getdata = async () => {
        try {
            console.log("ww", employee._id);
            const resp = await axios.get(`https://hrm-backend-square.onrender.com/api/getemployee/${employee._id}`);
            const particulr=resp.data.clockid;
            console.log("zzz",particulr)
            const fetchClock=resp.data.clockid
            setClockid(fetchClock)
            if (Array.isArray(particulr) && particulr.length > 0) {
                const extractedIds = particulr.map(item => item._id);
                console.log("zxc",extractedIds)
            } else {
                console.log("particulr is not an array or is empty");    
              }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    }

useEffect(()=>{
    getdata();
},[employee])
 

    const handleCheckOutClick = async() => {    
        const currentDate = new Date();
    
        try {
            const response = await axios.put(`https://hrm-backend-square.onrender.com/clock/update/${parclock._id}`,{ checkOutTime:currentDate.toISOString()});
            if (response.status === 200) {
                console.log("Check-Out successful!");
                setCheckInDisabled(false);
                setCheckOutDisabled(true);
                setBreakDisabled(true);
                
            } else {
                console.log("Failed to check in.");
            }
        } catch (error) {
            console.error("Error while checking in:", error);
        }
    };

    const zoomInStyle = {
        transform: checkInDisabled ? 'scale(0.6)' : 'scale(1)',
        transition: 'transform 0.1s',
    };

    const zoomOutStyle = {
        transform: checkOutDisabled ? 'scale(0.6)' : 'scale(1)',
        transition: 'transform 0.1s',
    };
    const breakStyle = {
        transform: breakDisabled ? 'scale(0.6)' : 'scale(1)',
        transition: 'transform 0.1s',
    };

  
    return (
        <>
            <Button
                label="Check In"
                severity="success"
                disabled={checkInDisabled}
                onClick={handleCheckInClick}
                style={zoomInStyle} // Apply zoom-in style when needed
            />
            <Button
                style={zoomOutStyle }
                label="Check Out"
                severity="danger"
                disabled={checkOutDisabled}
                onClick={handleCheckOutClick}
              
            />
   <Button
      label={breakButtonLabel}
    severity="warning"
    onClick={handleBreakClick}
    disabled={breakDisabled}
    style={{ marginLeft: '12px', ...breakStyle }}
/>
        </>
    )
}

export default AttendanceMod;