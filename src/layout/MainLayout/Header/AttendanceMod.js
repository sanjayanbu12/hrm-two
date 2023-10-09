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
            setParclock(response.data.savedData._id)
            if (response.status === 200) {
                console.log("Check-in successful!");
                setCheckInDisabled(true);
                setCheckOutDisabled(false);
            } else {
                console.log("Failed to check in.");
            }
        } catch (error) {
            console.error("Error while checking in:", error);
        }
    };
    const getdata = async () => {
        try {
            console.log("ww", employee._id);
            const resp = await axios.get(`https://hrm-backend-square.onrender.com/api/getemployee/${employee._id}`);
            const fetchClock=resp.data.clockid
            setClockid(fetchClock)
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
            const response = await axios.put(`https://hrm-backend-square.onrender.com/clock/update/${parclock}`,{ checkOutTime:currentDate.toISOString()});
            if (response.status === 200) {
                console.log("Check-Out successful!");
                setCheckInDisabled(false);
                setCheckOutDisabled(true);
            } else {
                console.log("Failed to check in.");
            }
        } catch (error) {
            console.error("Error while checking in:", error);
        }

      
    };

    // Define inline styles for zoom-in and zoom-out animations
    const zoomInStyle = {
        transform: checkInDisabled ? 'scale(0.6)' : 'scale(1)',
        transition: 'transform 0.1s',
    };

    const zoomOutStyle = {
        transform: checkOutDisabled ? 'scale(0.6)' : 'scale(1)',
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
        </>
    )
}

export default AttendanceMod;