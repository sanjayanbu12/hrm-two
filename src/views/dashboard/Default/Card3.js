import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Typography, Card } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { useState } from 'react';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

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
      right: -140
    }
  }
}));

const Card3 = ({ isLoading }) => {
  const theme = useTheme();
  const {recruitmentContextData}=useContext(ApiContext)
  const [Openening, setOpening] = useState('');

  const totalopeen = async () => {
 try {
  const res = await recruitmentContextData
  const count = res.data.getData.length;
  setOpening(count);
  console.log('count', count);
 } catch (error) {
  console.log(error)
 }
  };
  useEffect(() => {
    totalopeen();
  },[recruitmentContextData]);

  // const handleChangeTime = (event, newValue) => {
  //   // Your code for handling time change.
  // };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <Card elevation={0}>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>JOB VACANCY</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 0.75 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Typography
                            sx={{
                              fontSize: '2.125rem',
                              fontWeight: 500,
                              mr: 1,
                              mt: 1.75,
                              mb: 0.75
                            }}
                          >
                            {Openening}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              fontWeight: 500,
                              color: theme.palette.primary[100]
                            }}
                          ></Typography>
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

Card3.propTypes = {
  isLoading: PropTypes.bool
};

export default Card3;
