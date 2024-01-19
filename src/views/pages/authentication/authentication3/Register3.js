// import { Link } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// // project imports
// import AuthWrapper1 from '../AuthWrapper1';
// import AuthCardWrapper from '../AuthCardWrapper';
// // import Logo from 'ui-component/Logo';
import AuthRegister from '../auth-forms/AuthRegister';
// import Logos from 'ui-component/Logos';
// import Lottie from 'react-lottie';
// import lottie1 from './Lotties/Lottie9';
// import lottie2 from './Lotties/Lottie8';

// // assets

// // ===============================|| AUTH3 - REGISTER ||=============================== //

// const Register = () => {
//   const theme = useTheme();
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

//   const lt1={
//     animationData: lottie1,
//   }
//   const lt2={
//     animationData: lottie2,
//   }

//   return (
//     <AuthWrapper1 sx={{ overflow:'hidden' }}>

//       <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>

//         <Grid item xs={12}>

//           <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
//           <Lottie   options={lt1} height="400px" width="300px" />
//               <AuthCardWrapper>
//                 <Grid container spacing={2} alignItems="center" justifyContent="center">
//                 <Grid >
//                     <Link to="#">
//                       <Logos />
//                     </Link>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
//                       <Grid item>
//                         <Stack alignItems="center" justifyContent="center" spacing={1}>
//                           <Typography color={theme.palette.secondary.main} variant={matchDownSM ? 'h3' : 'h2'}>
//                             Sign up
//                           </Typography>
//                           <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
//                             Enter your credentials to continue
//                           </Typography>
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <AuthRegister />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Divider />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid item container direction="column" alignItems="center" xs={12}>
//                       <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
//                         Already have an account?
//                         <Typography
//                           component={Link}
//                           to="/pages/login/login3"
//                           variant="subtitle1"
//                           sx={{ textDecoration: 'none', color: theme.palette.secondary.dark }}
//                         >
//                           Signin
//                         </Typography>
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>

//               </AuthCardWrapper>
//               <Lottie style={{marginTop:'70px'}}   options={lt2} height="400px" width="300px" />
//           </Grid>
//         </Grid>
//       </Grid>
//     </AuthWrapper1>
//   );
// };

// export default Register;

import React from 'react';
import { useEffect } from 'react';
// import { useHistory } from "react-router-dom";
// import { login } from "../../../Services/userService";
// import AccountCircle from '../../../Images/UserCircle'
// import EmailIcon from '../../../Images/Letter';
// import BackIcon from '../../../Images/RoundArrowLeft'
// import PassKeyIcon from '../../../Images/LockKeyhole';
import  SidePhoto from '../../../../assets/images/Signin_Sidephoto.svg';
// import { ReactComponent as GoogleIcon }  from '../../../Images/GoogleIcon.svg';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../../../../assets/images/icons/BackIcon.svg';
// import gestion from "../../landing/images/Gestion_Logo_Black.svg";

// import Background from "../../Background";

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const TypographyContent = styled.div`
  color: #737373;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 154.5%; /* 23.175px */
`;

const TypographyBold = styled.div`
  margin-top: '-2px';
  color: #b799ff;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 154.5%; /* 30.9px */
  transition: 0.3s;
`;

export const RightsideWrapper = styled(Grid)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Register = () => {
  useEffect(() => {
    document.title = 'Log in to SET';
  }, []);

  return (
    <>
      <Grid container style={{ height: '100vh', width: '100vw', borderRadius: '15px' }}>
        <Grid item xs={12} lg={7} style={{ width: '100%', height: '100vh' }}>
          <Grid container style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
            {/* <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
              <img src={gestion} style={{ }} alt="logo" />
            </Grid> */}
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <Link to = "../" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <BackIcon />
                <TypographyContent style={{ marginLeft: '10px', marginTop: '2px' }}>Back</TypographyContent>
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={7}>
                  <TypographyBold style={{ fontSize: '30px', fontWeight: '600', color: '#222222' }}>Get Started Now</TypographyBold>
                </Grid>
                <Grid item xs={7}>
                  <TypographyContent style={{ fontSize: '15px' }}>Enter your credentials to access your account</TypographyContent>
                </Grid>
                <Grid item xs={7} style={{ marginTop: '60px' }}>
                  <AuthRegister />
                  {/* <Link fontSize="0.85rem" onClick={() => history.push("/login")}>
             Already have an account? Log In
           </Link> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <RightsideWrapper item xs={5}>
          <Grid
            container
            style={{
              backgroundColor: '#222222',
              borderRadius: '15px',
              padding: '10px',
              width: '95%',
              height: '95%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
              <Grid item xs={10} style={{ marginTop: '0px' }}>
                <TypographyBold style={{ color: 'white', fontWeight: '600', fontSize: '30px' }}>
                  The Simplest way to manage your workspace
                </TypographyBold>
                <TypographyContent style={{ color: 'white', fontWeight: '400', fontSize: '14px', marginTop: '10px' }}>
                  Enter your credentials to access to your account
                </TypographyContent>
              </Grid>
              <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-85px' }}>
                <img src={SidePhoto} style={{width:"75%"}} alt='sidephoto'/>
              </Grid>
            </Grid>
          </RightsideWrapper>
      </Grid>
    </>
  );
};

export default Register;
