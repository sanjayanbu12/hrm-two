import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Jobdetails = () => {
  const [Carddata, setCarddata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:3002/recruitform')
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setCarddata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return (
    <div>
      <h1>Job Details</h1>
      {Carddata && (
        <Card
          onClick={() => {
            navigate('/jobs');
          }}
          sx={{ mb: 1.5 }}
        >
          <CardContent>
            <Typography sx={{ lineHeight: '1.5' }} variant="h1" component="h4">
              Jobrole: {Carddata.id}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h1">
              No.of.Openings :{Carddata.Openings}
            </Typography>
            <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
              Company :{Carddata.Company}
            </Typography>
            <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
              Location:{Carddata.Location}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
              Worktype: {Carddata.Worktype}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
              Qualification : {Carddata.Education}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
              Experience: {Carddata.Experience} Years
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
              Requirements: {Carddata.Requirements}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
              Description: {Carddata.Description}
            </Typography>
            <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
              Last Date to Apply: {Carddata.Deadline}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Jobdetails;
