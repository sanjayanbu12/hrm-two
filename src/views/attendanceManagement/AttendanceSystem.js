import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const AttendanceSystem = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
  };

  const handleCheckOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckOutTime(currentTime);
  };

  return (
    <MainCard title="Attendance Regulation">
      <div>
        <h2>Check-in Time: {checkInTime || 'Not Checked In'}</h2>
        <h2>Check-out Time: {checkOutTime || 'Not Checked Out'}</h2>
      </div>
      <div>
        {!checkInTime && (
          <button onClick={handleCheckIn}>Check In</button>
        )}
        {checkInTime && !checkOutTime && (
          <button onClick={handleCheckOut}>Check Out</button>
        )}
      </div>
    </MainCard>
  );
};

export default AttendanceSystem;
