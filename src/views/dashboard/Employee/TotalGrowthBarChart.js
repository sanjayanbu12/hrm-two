import React, { useState } from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './dashboard.css';
// import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TotalGrowthBarChart = () => {
  const total= 20;
  const totalEmployees = 11;

  const [presentDropdownVisible, setPresentDropdownVisible] = useState(false);
  const [absentDropdownVisible, setAbsentDropdownVisible] = useState(false);
  const presentEmployees = [
    { id: 1, name: 'Kannan', role: 'Business Developer' },
    { id: 2, name: 'Sanjay', role: 'Cloud Computing' },
    { id: 2, name: 'Prakashraj', role: 'Software Testing' },
    { id: 1, name: 'Varadharajan', role: 'Business Developer' },
    { id: 2, name: 'Subramani', role: 'Cloud Computing' },
    { id: 2, name: 'Ajay', role: 'Full Stack Developer' },
    { id: 1, name: 'Sridhar', role: 'Front end developer' },
    { id: 2, name: 'Ajay', role: 'Front end developer' },
    { id: 2, name: 'Naveena', role: 'Software Associate' }
  ];

  const absentEmployees = [
    { id: 3, name: 'Kishore', role: 'Business Development' },
    { id: 4, name: 'Sundar', role: 'Human Resources Management' }
  ];

  const toggleDropdown = (type) => {
    if (type === 'present') {
      setPresentDropdownVisible(!presentDropdownVisible);
    } else if (type === 'absent') {
      setAbsentDropdownVisible(!absentDropdownVisible);
    }
  };

  const renderEmployeeDropdown = (employees) => {
    return (
      <div
        style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '10px'
        }}
      >
        {employees.map((employee) => (
          <div key={employee.id} className="employee">
            {employee.name} - {employee.role}
          </div>
        ))}
      </div>
    );
  };

  const calculateTotalEmployees = () => {
    const totalPresent = presentEmployees.length;
    const totalAbsent = absentEmployees.length;
    const total = totalPresent + totalAbsent;
    return { total, totalPresent, totalAbsent };
  };
  const navigate = useNavigate();
  const totalEmployeeCounts = calculateTotalEmployees();
  return (
    <>
      <div className="dashboard">
        {
          <Card
            sx={{
              width: 250,
              height: 150,
              background: 'lightblue',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                EMPLOYEES
              </Typography>
              <Typography variant="h5" component="div" style={{ marginTop: '20px'}}>
                {total}
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Twenty Five
              </Typography> */}
              <Typography style={{ marginTop: '30px', cursor: 'pointer' }} onClick={() => navigate(`/newemployee`)}>
                Employee List
              </Typography>
            </CardContent>
          </Card>
        }
        {
          <Card
            sx={{
              width: 250,
              height: 150,
              background: 'lightgreen',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Recruitment
              </Typography>
              <Typography variant="h5" component="div" style={{ marginTop: '20px'}}>
              No of Openings-02
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{marginTop:'10px'}}>
              10
              </Typography> */}
              <Typography style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => navigate(`/jobtable`)}>
                HI
              </Typography>
            </CardContent>
          </Card>
        }
      </div>

      <div className="dashboard1">
        {
          <div
            style={{
              // color: 'black',
              width: '250px',
              height: '150px',
              backgroundColor: '#f5f5f5',

            }}
          >
            <div
              style={{
                backgroundColor: '#3498db', 
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                width: '250px',
                transition: 'box-shadow 0.3s, transform 0.3s',
                height: '150px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h1
                // style={{
                //   marginTop: 0,
                //   color: '#333333',
                //   fontSize: '16px',
                //   marginBottom: '20px'
                // }}
                style={{
                  marginTop: 0,
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  
                }}      
              >
                Attendance Card
              </h1>
              <div
                // style={{
                //   marginBottom: '20px',
                //   color: 'black',
                //   fontSize: '14px',
                //   fontWeight: 'bold'
                // }}
                style={{
                
                  fontSize: '14px',
                 fontWeight: 'bold',
                  marginBottom: '20px',
                }}
      
              >
                Total Employees: {totalEmployees}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px',
                  fontSize: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    // style={{
                    //   display: 'flex',
                    //   alignItems: 'center',
                    //   color: '#6c5ce7',
                    //   cursor: 'pointer',
                    //   backgroundColor: '#f3eefb',
                    //   border: 'none',
                    //   borderRadius: '8px',
                    //   padding: '5px 5px',
                    //   transition: 'background-color 0.3s',
                    //   fontSize: '14px'
                    // }}

                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff',
                      cursor: 'pointer',
                      backgroundColor: '#27ae60', 
                      border: 'none',
                      borderRadius: '8px',
                      padding: '5px 5px',
                      transition: 'background-color 0.3s',
                      fontSize: '14px',
                    }}
      
                    onClick={() => toggleDropdown('present')}
                  >
                    <FaCheckCircle size={24} style={{ marginRight: '10px' }} />
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}
                    >
                      Present-
                    </span>
                    {totalEmployeeCounts.totalPresent}
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button
                    // style={{
                    //   display: 'flex',
                    //   alignItems: 'center',
                    //   color: '#74b9ff',
                    //   cursor: 'pointer',
                    //   backgroundColor: '#e8f6fe',
                    //   border: 'none',
                    //   borderRadius: '8px',
                    //   padding: '5px',
                    //   transition: 'background-color 0.3s',
                    //   fontSize: '14px'
                    // }}

                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff',
                      cursor: 'pointer',
                      backgroundColor: '#e74c3c', 
                      border: 'none',
                      borderRadius: '8px',
                      padding: '5px 5px',
                      transition: 'background-color 0.3s',
                      fontSize: '14px',
                    }}
      
                    onClick={() => toggleDropdown('absent')}
                  >
                    <FaTimesCircle size={24} style={{ marginRight: '10px' }} />
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}
                    >
                      Absent-
                    </span>
                    {totalEmployeeCounts.totalAbsent}
                  </button>
                </div>
              </div>
              <div>
                {presentDropdownVisible && (
                  <div
                    className="present-dropdown visible"
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '4px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      padding: '10px',
                      fontSize: '14px'
                    }}
                  >
                    {renderEmployeeDropdown(presentEmployees)}
                  </div>
                )}
                {absentDropdownVisible && (
                  <div
                    className="absent-dropdown visible"
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '4px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      padding: '10px',
                      fontSize: '14px'
                    }}
                  >
                    {renderEmployeeDropdown(absentEmployees)}
                  </div>
                )}
              </div>
              {/* <div
          style={{
            marginTop: '5px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ffffff', 
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#555555';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#ffffff'; 
          }}
        >
          {totalEmployeeCounts.totalPresent} Present, {totalEmployeeCounts.totalAbsent} Absent out of {totalEmployeeCounts.total} Total Employees
        </div> */}
            </div>
          </div>
        }

        {
          <Card
            sx={{
              width: 250,
              height: 150,
              background: 'linear-gradient(135deg, lightgrey, grey)',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Projects Ongoing
              </Typography>
              <Typography variant="h5" component="div" style={{ marginTop: '20px'}}>
                02
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                02
              </Typography> */}
              <Typography style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => navigate(`/basictable`)}>
                HI
              </Typography>
            </CardContent>
          </Card>
        }
      </div>
    </>
  );
};

export default TotalGrowthBarChart;
