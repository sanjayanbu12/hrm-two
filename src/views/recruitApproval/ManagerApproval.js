import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
// import MaterialTable from "material-table";
const cardAnimation = {
  hidden: {
    scale: 0,
    opacity: 0,
    x: '-100vw'
  },
  show: {
    scale: 1,
    opacity: 1,
    x: 0
  }
};
const ManagerApproval = () => {
  const [data, setRecData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
    const filteredData = res.data.getData.filter((data) => {
      const orgApproval = data.orgData.some((orgItem) => orgItem.approved === true);
      const overallApproval = data.jobApproved === false;
      return orgApproval && overallApproval;
    });
    console.log(filteredData);
    setRecData(filteredData);
  };
  const handleClick = (id) => {
    navigate(`/recruitmentview/${id}`);
  };
  return (
    <Stack direction={'row'} spacing={10}>
      {data &&
        data.map((item) => (
          <motion.div
            key={item._id}
            variants={cardAnimation}
            initial="hidden"
            animate="show"
            transition={{ stiffness: 50, type: 'spring', delay: 0.2 }}
          >
            <Card raised={true} sx={{ minWidth: 375 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography textAlign={'center'} sx={{ fontSize: 20 }} color="secondary" variant="h1" gutterBottom>
                  {item.Company}
                </Typography>
                <Stack spacing={0.5}>
                  <Typography variant="h5" component="div">
                    <span style={{ marginRight: '20px' }}>
                      Role<span style={{ marginLeft: '85px' }}>:</span>
                    </span>{' '}
                    {item.Jobrole}
                  </Typography>
                  <Typography color="text.secondary">
                    <Typography sx={{ display: 'inline' }} variant="h5" component="div">
                      Experience{' '}
                    </Typography>
                    <span style={{ marginRight: '20px', marginLeft: '38px' }}>:</span>
                    <span style={{ marginLeft: '10px' }}>{item.ExperienceFrom}</span> - <span>{item.ExperienceTo} Years</span>
                  </Typography>
                  <Typography variant="h5" component="div">
                    <span style={{ marginRight: '20px' }}>
                      Opeanings<span style={{ marginLeft: '44px', marginRight: '10px' }}>:</span>
                    </span>{' '}
                    {item.Openings}
                  </Typography>
                  <Typography variant="h5" component="div">
                    <span style={{ marginRight: '20px' }}>
                      HR<span style={{ marginLeft: '92px', marginRight: '10px' }}>:</span>
                    </span>{' '}
                    {item.Hrname}
                  </Typography>
                  <Typography variant="h5" component="div">
                    <span style={{ marginRight: '20px' }}>
                      Interviewrounds<span style={{ marginLeft: '10px', marginRight: '10px' }}>:</span>
                    </span>{' '}
                    {item.Interviewrounds}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleClick(item._id)}>
                  View More
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
    </Stack>
  );
};

export default ManagerApproval;
