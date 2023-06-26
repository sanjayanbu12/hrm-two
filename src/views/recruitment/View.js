import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const View = () => {
  const [Carddata, setCarddata] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://hrm-backend-square.onrender.com/rec/getRec/${id}`)
      .then((resp) => {
        setCarddata(resp.data.data);
        console.log(resp.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  return (
    <div>
      <h1>Details</h1>
      <Card
        onClick={() => {
          navigate('/recruitmenttable');
        }}
        sx={{ mb: 3, padding: '15px' }}
      >
        <CardContent>
          <Typography sx={{ lineHeight: '1.5' }} variant="h1" component="h4">
            Jobrole: {Carddata.Jobrole}
          </Typography>
          <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h1">
            No.of.Openings: {Carddata.Openings}
          </Typography>
          <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
            Company: {Carddata.Company}
          </Typography>
          <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
            Location: {Carddata.Location}
          </Typography>
          <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
            Worktype: {Carddata.Worktype}
          </Typography>
          <Typography sx={{ lineHeight: '1.5' }} variant="h5" component="h4">
            Qualification: {Carddata.Education}
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
    </div>
  );
};

export default View;
