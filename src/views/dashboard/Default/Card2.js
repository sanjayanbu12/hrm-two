import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme,  } from '@mui/material/styles';
import { Box, Grid, Typography, } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { useEffect } from 'react';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import * as style from './style';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//   backgroundColor: '#12486B',
//   color: '#fff',
//   overflow: 'hidden',
//   position: 'relative',
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     background: theme.palette.secondary[800],
//     borderRadius: 15 ,
//     // top: -85,
//     // right: -95,
//     [theme.breakpoints.down('sm')]: {
//       top: -105,
//       right: -140
//     }
//   },
//   '&:before': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     // background: theme.palette.secondary[800],
//     borderRadius:100,
//     top: -125,
//     right: -15,
//     opacity: 0.5,
//     [theme.breakpoints.down('sm')]: {
//       top: -155,
//       right: -70
//     }
//   }
// }));

const Card2 = ({ isLoading }) => {
 
  
  const [employee, setEmployee] = useState("");
  console.log("count",employee);
  const [employeeCount, setEmployeeCount] = useState(0);
  const {employeeContextData}=useContext(ApiContext)
  const fetchEmployee = async () => {
    try {
      const res =employeeContextData
      const today = new Date();
      const allEmployeeData = res.data.map(matchingEmployee => {
        const clockData = matchingEmployee.clockid || [];
        return clockData.map(clockData => ({
          name: matchingEmployee.name,
          date: clockData.date,
          checkInTime: clockData.checkInTime,
          checkOutTime: clockData.checkOutTime,
          breakin: clockData.break.map(data => data.breakin),
          breakout: (clockData.checkInTime, clockData.checkOutTime, clockData.break),
        }));
      });
      const flattenedEmployeeData = [].concat(...allEmployeeData);
      const todayData = flattenedEmployeeData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === today.toDateString();
      });
  
      setEmployee(todayData); 
      setEmployeeCount(todayData.length); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [employeeContextData]);

  const theme = useTheme();
 

  const [timeValue, setTimeValue] = useState(false);
  console.log(timeValue)
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };
console.log(handleChangeTime)


  
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        // <Card elevation={0}>
        // <CardWrapper border={false} content={false}>
        <style.MovieCard style={{backgroundColor:"rgba(0, 0, 0, 0.87)"}}>
          <style.ContentAddNew>

  
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {/* <Button
                      disableElevation
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      PRESENT
                    </Button> */}
                    <Typography sx={{fontSize:"15px",fontWeight:'bold'}}> TODAY PRESENT</Typography> 
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        {/* {timeValue ? (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>15</Typography>
                        ) : ( */}
                        {(
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}> {employeeCount}</Typography>
                        )} 
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.primary[100]
                          }}
                        >
                          {/* Projects */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          </style.ContentAddNew>
        </style.MovieCard>
      )}
    </>
  );
};

Card2.propTypes = {
  isLoading: PropTypes.bool
};

export default Card2;