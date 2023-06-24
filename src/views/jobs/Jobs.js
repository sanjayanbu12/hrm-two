import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Jobs = () => {
  const [Carddata, setCarddata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3002/recruitform')
      .then((res) => {
        setCarddata(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log('Error retrieving user data:', error);
      });
  }, []);
  // const View = async (id) => {
  //   try {
  //     await axios.get(`http://localhost:3002/recruitform/${id}`);
  //     setCarddata(Carddata.filter((item) => item.id !== id));
  //     navigate('/jobdetails');
  //   } catch (error) {
  //     console.log('Error user data:', error);
  //   }
  // };
  return (
    <div>
      <h1>Job List </h1>
      {Carddata.map((item) => (
        <Card
          onClick={() => {
            navigate('/jobdetails');
          }}
          key={item.id}
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
              Skills :{item.Skills}
            </Typography>
            <Typography sx={{ lineHeight: '2' }} variant="h5" component="h3">
              Experience :{item.Experience} Years
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
