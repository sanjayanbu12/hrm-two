import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
// import Logo from 'ui-component/Logo';
import AuthRegister from '../auth-forms/AuthRegister';
import Logos from 'ui-component/Logos';
import Lottie from 'react-lottie';
import lottie1 from './Lotties/Lottie9';
import lottie2 from './Lotties/Lottie8';


// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const lt1={
    animationData: lottie1,
  }
  const lt2={
    animationData: lottie2,
  }

  return (
    <AuthWrapper1 sx={{ overflow:'hidden' }}>
   
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
     
        <Grid item xs={12}>
        
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
          <Lottie   options={lt1} height="400px" width="400px" />
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid >
                    <Link to="#">
                      <Logos /> 
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} variant={matchDownSM ? 'h3' : 'h2'}>
                            Sign up
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Already have an account?
                        <Typography
                          component={Link}
                          to="/pages/login/login3"
                          variant="subtitle1"
                          sx={{ textDecoration: 'none', color: theme.palette.secondary.dark }}
                        >
                          Signin
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              
              </AuthCardWrapper>
              <Lottie style={{marginTop:'70px'}}   options={lt2} height="400px" width="400px" />
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
