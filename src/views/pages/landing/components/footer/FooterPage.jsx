import React from 'react';
import { SecondContainers } from '../Navbar/Styled';
import { Box, ButtonBase, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '../style/svgs/XIcon';
import '../Navbar/style.css';
import FooterImage from '../style/img/25579725_job_instructions.png';

const FooterPage = ({ scrollToSection, redirect, expanded, handleChange }) => {
  const navigate = useNavigate();
  const ProdctPage = () => {
    navigate('/product');
  };
  const PricingPage = () => {
    navigate('/pricing');
  };

  const year = new Date().getFullYear();

  return (
    <>
      <SecondContainers
        style={{ backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}
      >
        <Grid container>
          <Grid item lg={12} marginLeft={'70px'} display={'flex'} gap={10}>
            <Grid item>
              <Typography>Logo</Typography>
            </Grid>
            <Grid item display={'flex'} flexDirection={'column'} flexBasis={'100px'} gap={2}>
              <Typography fontSize={'15px'} marginBottom={'20px'}>Gestion</Typography>
              <ButtonBase
                disableRipple
                href="#"
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Home
              </ButtonBase>
              <ButtonBase
                disableRipple
                onClick={ProdctPage}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Product
              </ButtonBase>
              <ButtonBase
                disableRipple
                onClick={PricingPage}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Pricing
              </ButtonBase>
            </Grid>
            <Grid item display={'flex'} flexDirection={'column'} flexBasis={'100px'} gap={2}>
              <Typography fontSize={'15px'} marginBottom={'20px'}>About Us</Typography>
              <ButtonBase
                href="https://snssquare.com/"
                disableRipple
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Company
              </ButtonBase>
              <ButtonBase
                href="https://snssquare.com/careerssnssquare/#b149334"
                disableRipple
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Carrer
              </ButtonBase>
            </Grid>
            <Grid item display={'flex'} flexDirection={'column'} gap={2}>
              <Typography fontSize={'15px'} marginBottom={'20px'}>Workflow</Typography>
              <ButtonBase
                disableRipple
                expanded={expanded === 'panel1'}
                onClick={(event) => {
                  handleChange('panel1')(event, expanded);
                  scrollToSection(event, redirect, 0);
                }}
                key={0}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Recruitment
              </ButtonBase>
              <ButtonBase
                disableRipple
                expanded={expanded === 'panel2'}
                onClick={(event) => {
                  handleChange('panel2')(event, expanded);
                  scrollToSection(event, redirect, 1);
                }}
                key={1}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Employment
              </ButtonBase>
              <ButtonBase
                disableRipple
                expanded={expanded === 'panel3'}
                onClick={(event) => {
                  handleChange('panel3')(event, expanded);
                  scrollToSection(event, redirect, 2);
                }}
                key={2}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' }, textAlign: 'left' }}
              >
                Learning & Development
              </ButtonBase>
              <ButtonBase
                disableRipple
                expanded={expanded === 'panel4'}
                onClick={(event) => {
                  handleChange('panel4')(event, expanded);
                  scrollToSection(event, redirect, 3);
                }}
                key={3}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                procurement
              </ButtonBase>
              <ButtonBase
                disableRipple
                expanded={expanded === 'panel5'}
                onClick={(event) => {
                  handleChange('panel5')(event, expanded);
                  scrollToSection(event, redirect, 4);
                }}
                key={4}
                sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' } }}
              >
                Travel & Expense
              </ButtonBase>
            </Grid>
            <Grid item>
              <Box>
                <img src={FooterImage} alt="" />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            style={{ backgroundColor: 'rgb(30, 31, 33)' }}
            display={'flex'}
            alignItems={'center'}
            gap={10}
            justifyContent={'center'}
            padding={'40px 0px'}
            width={'100%'}
            lg={12}
          >
            <Typography color={'white'}>&copy; {year} Gestion, Inc.</Typography>
            <Typography color={'white'}>
              <LanguageIcon style={{ verticalAlign: 'middle' }} /> English
            </Typography>
            <Typography sx={{ cursor: 'pointer', '&:hover': { color: '#F06A6A' } }} color={'white'}>
              Terms & Privacy
            </Typography>

            <Grid item display={'flex'} gap={'8px'}>
              <ButtonBase disableRipple sx={{ cursor: 'pointer', '&:hover': { color: '#1D9BF0' } }} color={'white'}>
                <XIcon />
              </ButtonBase>
              <ButtonBase
                disableRipple
                href="https://in.linkedin.com/company/snssquare?trk=public_post_feed-actor-name"
                sx={{ cursor: 'pointer', '&:hover': { color: '#0A66C2' } }}
                color={'white'}
              >
                <LinkedInIcon />
              </ButtonBase>
              <ButtonBase
                disableRipple
                href="https://www.instagram.com/squaresns/"
                sx={{ cursor: 'pointer', '&:hover': { color: '#C13584' } }}
                color={'white'}
              >
                <InstagramIcon />
              </ButtonBase>
              <ButtonBase
                disableRipple
                href="https://www.youtube.com/@snssquare"
                sx={{ cursor: 'pointer', '&:hover': { color: '#FF0000' } }}
                color={'white'}
              >
                <YouTubeIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </SecondContainers>
    </>
  );
};
export default FooterPage;
