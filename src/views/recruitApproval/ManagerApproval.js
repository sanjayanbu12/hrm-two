import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { defaultOptions1, defaultOptions, responsiveOptions, cardAnimation } from './Const';
import MainCard from 'ui-component/cards/MainCard';
import { Carousel } from 'primereact/carousel';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

const ManagerApproval = () => {
  const [loading, setLoading] = useState(true);
  const [data, setRecData] = useState([]);
  const navigate = useNavigate();
  const { recruitmentContextData } = useContext(ApiContext);
  useEffect(() => {
    fetchData();
  }, [recruitmentContextData]);
  const fetchData = async () => {
    const res = await recruitmentContextData;
    const filteredData = res.data.getData.filter((data) => {
      const orgApproval = data.orgData.some((orgItem) => orgItem.approved === true);
      const overallApproval = data.jobApproved === false;
      return orgApproval && overallApproval;
    });
    setRecData(filteredData);
    setLoading(false);
  };
  const handleClick = (id) => {
    navigate(`/recruitmentview/${id}`);
  };
  const jobTemplete = (item) => {
    return (
      <motion.div
        key={item._id}
        variants={cardAnimation}
        initial="hidden"
        animate="show"
        transition={{ stiffness: 50, type: 'spring', delay: 0.2 }}
      >
        <Card raised={true} sx={{ width: '90%', margin: '20px', height: '300px' }}>
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
    );
  };
  return (
    <MainCard title="Job Requests">
      {!loading ? (
        data.length > 0 ? (
          <Carousel value={data} numVisible={2} numScroll={2} responsiveOptions={responsiveOptions} itemTemplate={jobTemplete} />
        ) : (
          <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lottie options={defaultOptions} height={500} width={500} />
          </Box>
        )
      ) : (
        <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lottie options={defaultOptions1} height={100} width={100} />
        </Box>
      )}
    </MainCard>
  );
};

export default ManagerApproval;
