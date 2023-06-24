import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';

const Jobdetails = () => {
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
    <MainCard title="Job Details">
      <Card>
        {cardData.map((item, index) => (
          <Card
            onClick={() => {
              navigate('/jobs');
            }}
            key={index}
            sx={{ mb: 1.5 }}
          >
            <CardContent>
              <Typography sx={{ lineHeight: '1.5' }} variant="h1" component="h4">
                Jobrole: {item.Jobrole}
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h1">
                No.of.Openings :{item.Openings}
              </Typography>
              <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
                Company :{item.Company}
              </Typography>
              <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
                Location:{item.Location}
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
                Worktype: {item.Worktype}
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
                Qualification : {item.Education}
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
                Experience: {item.Experience} Years
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
                Requirements: {item.Requirements}
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
                Description: {item.Description}
              </Typography>
              <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
                Last Date to Apply: {item.Deadline}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Card>
    </MainCard>
  );
};

export default Jobdetails;
