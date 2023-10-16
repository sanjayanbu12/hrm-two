import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CoffeeSharpIcon from '@mui/icons-material/CoffeeSharp';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import Cookies from 'js-cookie';

const AttendanceMod = () => {
    const authId = useSelector((state) => state.customization.authId);
    const [employee, setEmployee] = useState('');
    const[clockid,setClockid]=useState('');
    const [checkInDisabled, setCheckInDisabled] = useState(false);
    const [checkOutDisabled, setCheckOutDisabled] = useState(true);
    const [breakDisabled, setBreakDisabled] = useState(true);
    const [breakButtonLabel, setBreakButtonLabel] = useState('Break');
    const[breakinID,setBreackinId]=useState("");
    console.log("breack in id",breakinID)
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

        const lastCheckInDate = Cookies.get('lastCheckInDate');
        const currentDate = new Date().toLocaleDateString();

        if (lastCheckInDate === currentDate) {
            setCheckInDisabled(true); 
        }

        fetchEmployee();
    }, []);
    

    const handleCheckInClick = async () => {
       
        if (!checkInDisabled) {
            const currentDate = new Date();
    
            // Create the check-in data
            const checkInData = {
                date: currentDate.toISOString(),
                checkInTime: currentDate.toISOString(),
                employeeId: employee._id,
                authId: authId
            };
    
            try {
                // Send a POST request to create the check-in record
                const response = await axios.post("https://hrm-backend-square.onrender.com/clock/create", checkInData);
                setParclock(response.data.savedData);
    
                if (response.status === 200) {
                    console.log("Check-in successful!");
    
                    // Disable the "Check In" button
                    setCheckInDisabled(true);
    
                    // Enable the "Check Out" and "Break" buttons
                    setCheckOutDisabled(false);
                    setBreakDisabled(false);
    
                    // Store the check-in date in a cookie to prevent further check-ins on the same day
                    const currentDate = new Date().toLocaleDateString();
                    Cookies.set('lastCheckInDate', currentDate, { expires: 1 }); // Cookie expires after 1 day
                } else {
                    console.log("Failed to check in");
                }
            } catch (error) {
                console.error("Error while checking in:", error);
            }
        } else {
            console.log("You have already checked in today.");
        }
    };
    const handleBreakClick = async () => {
        if (breakButtonLabel === 'Break') {
            const currentDate = new Date();
            try {
                const response = await axios.post(`https://hrm-backend-square.onrender.com/break/create`,
                { breakin:currentDate.toISOString(),
                attid :parclock._id
                });
                setBreackinId(response.data.savedData._id)
                
                if (response.status === 200) {
                    console.log("Break in successful!",response);
                } else {
                    console.log("Failed to Break in.");
                }

            } catch (error) {
                console.log(error)
            }

            setCheckOutDisabled(true);
        } else if (breakButtonLabel === 'In') {
            const currentDate = new Date();
            try {
                const response = await axios.put(`https://hrm-backend-square.onrender.com/break/update/${breakinID}`,
                { breakout:currentDate.toISOString(),
                    })
                    if (response.status === 200) {
                        console.log("Break Out successful!",response);
                    } else {
                        console.log("Failed to Break Out");
                    }
                
            } catch (error) {
                
            }


            setCheckOutDisabled(false);
        }
        setBreakButtonLabel((currentLabel) => (currentLabel === 'Break' ? 'In' : 'Break'));
    };


    const getdata = async () => {
        try {
            console.log("ww", employee._id);
            const resp = await axios.get(`https://hrm-backend-square.onrender.com/api/getemployee/${employee._id}`);
            console.log("Total employee data",resp)
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
           icon ={ <LightModeIcon sx={{ fontSize:'20px',mr:'8px',mt:'3px'}}/>}
                label="Check In"
                severity="success"
                disabled={checkInDisabled}
                onClick={handleCheckInClick}
                style={zoomInStyle} // Apply zoom-in style when needed
            />
            <Button
            icon = {<NightsStayIcon sx={{ fontSize:'20px',mr:'8px',mt:'3px'}}/>}
                style={zoomOutStyle }
                label="Check Out"
                severity="danger"
                disabled={checkOutDisabled}
                onClick={handleCheckOutClick}
              
            />
   <Button
    icon={breakButtonLabel==="Break"?<CoffeeSharpIcon sx={{ fontSize:'20px',mr:'8px',mt:'3px'}}/>:<MeetingRoomSharpIcon sx={{mr:'8px',mt:'3px'}}/>}
      label={breakButtonLabel}
    severity="warning"
    onClick={handleBreakClick}
    disabled={breakDisabled}
    style={{ marginLeft: '12px', ...breakStyle }}
/>
        </>
    )
}

export default AttendanceMod;