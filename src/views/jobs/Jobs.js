import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Jobs = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3002/recruitform')
      .then((res) => {
        setCardData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log('Error retrieving user data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Job List</h1>
      {cardData.map((item, index) => (
        <Card
          onClick={() => {
            navigate('/RecruitmentTable');
          }}
          key={index}
          sx={{ mb: 1.5 }}
        >
          <CardContent>
            <Typography sx={{ lineHeight: '1.5' }} variant="h1" component="h4">
              Jobrole: {item.Jobrole}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="P" component="h1">
              No.of.Openings :{item.Openings}
            </Typography>
            <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
              Skills :{item.Skills}
            </Typography>
            <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
              Experirence :{item.Experience} Years
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
