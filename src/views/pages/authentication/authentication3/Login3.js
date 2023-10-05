import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logos from 'ui-component/Logos';
import Lottie from 'react-lottie';
import lottie1 from './Lotties/Lottie4.json'
import lottie2 from './Lotties/Lottie6.json'
// import Logo from 'ui-component/Logo';


// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const lt1={
    animationData: lottie1,
  }
  const lt2={
    animationData: lottie2,
  }
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Lottie  style={{ marginTop:'360px'}} options={lt1} height="300px" width="300px" />

            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Link to="#">
                      <Logos />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center">
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Hi, Welcome Back
                            {/* Sign in */}
                          </Typography>
                          {/* <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter your credentials to continue
                          </Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                        <Typography
                          component={Link}
                          to="/pages/register/register3"
                          variant="subtitle1"
                          sx={{ textDecoration: 'none', color: theme.palette.secondary.dark }}
                        >
                          Signup
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
            <Lottie
   style={{ marginTop:'400px'}}
  options={lt2}
  height='300px'
  width='300px'  
/>

          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
