import React from 'react';
import { Card, CardWrapper } from 'react-swipeable-cards';

const leaveData = [
  { id: 1, name: 'Ajay', position: 'Developer' },
  { id: 2, name: 'Sanjay', position: 'Manager' },
  { id: 3, name: 'Kishore', position: 'Designer' },
];

const LeaveToday = () => {
  const handleSwipe = (id, direction) => {
    console.log(`Swiped ${direction} on employee with ID: ${id}`);
  };

  const cardStyle = {
    width: '280px',
    height: '180px',
    background: '#F8F8F8',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'grab',
    marginBottom: '20px',
  };

  const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const leaveSymbolStyle = {
    fontSize: '40px',
    marginTop: '10px',
    color: 'purple', // or 'violet'
  };
  
  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const cardNameStyle = {
    fontSize: '22px',
  };

  const cardPositionStyle = {
    fontSize: '16px',
    color: '#888888',
  };

  return (
    <div>
      <h2>Leave Today</h2>
      {leaveData.length === 0 ? (
        <p>No employees on leave today.</p>
      ) : (
        <CardWrapper>
          {leaveData.map((employee) => (
            <Card
              key={employee.id}
              style={cardStyle}
              onSwipeLeft={() => handleSwipe(employee.id, 'left')}
              onSwipeRight={() => handleSwipe(employee.id, 'right')}
            >
              <div style={cardContentStyle}>
                <span style={leaveSymbolStyle}>&#10004;</span>
                <h3 style={cardTitleStyle}>On Leave Today</h3>
                <h2 style={cardNameStyle}>{employee.name}</h2>
                <p style={cardPositionStyle}>{employee.position}</p>
              </div>
            </Card>
          ))}
        </CardWrapper>
      )}
    </div>
  );
};

export default LeaveToday;