import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box,  Grid, Typography, Card } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import axios from 'axios';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#12486B',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  
}));

const Card1 = ({ isLoading }) => {
  const theme = useTheme();

  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        const response = await axios.get(
          'https://hrm-backend-square.onrender.com/api/allemployee'
        );
        if (response.data) {
          const total = response.data.length;
          setTotalEmployees(total);
        }
      } catch (error) {
        console.error('Error fetching total employees:', error);
      }
    };

    fetchTotalEmployees(); 
  }, []);

  // const handleChangeTime = (event, newValue) => {
  //   // Your code for handling time change.
  // };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <Card elevation={10}>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      
                      <Typography sx={{fontSize:"15px",fontWeight:'bold'}}>TOTAL EMPLOYEES</Typography> 
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 0.75 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          {totalEmployees !== 0 ? ( 
                            <Typography
                              sx={{
                                fontSize: '2.125rem',
                                fontWeight: 500,
                                mr: 1,
                                mt: 1.75,
                                mb: 0.75,
                              }}
                            >
                              {totalEmployees}
                            </Typography>
                          ) : (
                            // Display a loading message or placeholder if data is not available yet.
                            <Typography
                              sx={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: theme.palette.primary[100],
                              }}
                            >
                              Loading...
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              fontWeight: 500,
                              color: theme.palette.primary[100],
                            }}
                          >
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardWrapper>
        </Card>
      )}
    </>
  );
};

Card1.propTypes = {
  isLoading: PropTypes.bool,
};

export default Card1;
