import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import MaterialTable from "material-table";
import Lottie from 'react-lottie';
import { Carousel } from 'primereact/carousel';
import { defaultOptions, defaultOptions1, responsiveOptions } from './Const';
import MainCard from 'ui-component/cards/MainCard';
const HrApproval = () => {
  const [data, setRecData] = useState([]);
  const [edata, setedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const authId = useSelector((state) => state.customization.authId);
  useEffect(() => {
    fetchData();
  }, [edata]);

  useEffect(() => {
    const fetchDataOnMount = async () => {
      try {
        const response = await axios.get('https://pulsehr-express-server.onrender.com/api/allemployee');
        setedata(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataOnMount();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get(`https://pulsehr-express-server.onrender.com/rec/getRec`);
      console.log(res.data.getData);

      const filteredData = res.data.getData.filter((item) => {
        // Check if any of the orgData items have approved set to false
        const hasFalseApproval = item.orgData.some((orgItem) => orgItem.approved === false);

        // Extract the HR IDs from orgData
        const hrIds = item.orgData.map((orgItem) => orgItem.id);

        // Filter edata based on HR IDs
        const edataId = edata.filter((d) => hrIds.includes(d._id));

        // Extract employee IDs from filtered edata
        const empIDs = edataId.map((z) => z.employeeid);

        // Add any additional conditions here if needed
        return empIDs.includes(authId) && empIDs.includes(id) && hasFalseApproval;
      });

      // If you want to log the filtered data:
      console.log(filteredData);

      // If you want to set the filtered data in your component's state:
      setRecData(filteredData);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    navigate(`/recruitmentview/${id}`);
  };
  const jobTemplete = (data) => {
    return (
      <>
        <Card raised={true} key={data._id} sx={{ width: '90%', margin: '20px', height: '300px' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography textAlign={'center'} sx={{ fontSize: 20 }} color="secondary" variant="h1" gutterBottom>
              {data.Company}
            </Typography>
            <Stack sx={{ margin: '0 auto' }} spacing={0.5}>
              <Typography variant="h5" component="div">
                <span style={{ marginRight: '20px' }}>
                  Role<span style={{ marginLeft: '85px' }}>:</span>
                </span>
                {data.Jobrole}
              </Typography>
              <Typography color="text.secondary">
                <Typography sx={{ display: 'inline' }} variant="h5" component="div">
                  Experience
                </Typography>
                <span style={{ marginRight: '20px', marginLeft: '38px' }}>:</span>
                <span style={{ marginLeft: '10px' }}>{data.ExperienceFrom}</span> - <span>{data.ExperienceTo} Years</span>
              </Typography>
              <Typography variant="h5" component="div">
                <span style={{ marginRight: '20px' }}>
                  Opeanings<span style={{ marginLeft: '44px', marginRight: '10px' }}>:</span>
                </span>
                {data.Openings}
              </Typography>
              <Typography variant="h5" component="div">
                <span style={{ marginRight: '20px' }}>
                  HR<span style={{ marginLeft: '92px', marginRight: '10px' }}>:</span>
                </span>
                {data.Hrname}
              </Typography>
              <Typography variant="h5" component="div">
                <span style={{ marginRight: '20px' }}>
                  Interviewrounds<span style={{ marginLeft: '10px', marginRight: '10px' }}>:</span>
                </span>
                {data.Interviewrounds}
              </Typography>
              <Button size="small" onClick={() => handleClick(data._id)}>
                View More
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </>
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
        <Box sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lottie options={defaultOptions1} height={100} width={100} />
        </Box>
      )}
    </MainCard>
  );
};

export default HrApproval;
