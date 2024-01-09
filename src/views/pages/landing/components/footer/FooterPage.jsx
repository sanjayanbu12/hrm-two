import React, { useState } from 'react';
import { Box, ButtonBase, Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FooterContainers } from '../Navbar/Styled';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '../style/svgs/XLogo.svg';
import '../Navbar/style.css';
import Logo from '../../images/Gestion_Logo.svg';
import axios from 'axios';

const FooterPage = ({ scrollToSection, redirect, expanded, handleChange }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneno: '',
    MarkasRead: false
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/landingform/create', form);
      setForm({ name: '', email: '', phoneno: '', MarkasRead: false });
    } catch (error) {
      console.error(error);
    }
  };

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
      <FooterContainers
        style={{ backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Grid item>
            <Box>
              <img src={Logo} alt="" />
            </Box>
          </Grid>
          <Grid item display={'flex'} flexDirection={'column'} flexBasis={'100px'} gap={2}>
            <Typography fontSize={'15px'} marginBottom={'20px'}>
              Gestion
            </Typography>
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
            <Typography fontSize={'15px'} marginBottom={'20px'}>
              About Us
            </Typography>
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
            <Typography fontSize={'15px'} marginBottom={'20px'}>
              Workflow
            </Typography>
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
              sx={{ fontSize: '17px', display: 'flex', justifyContent: 'flex-start', '&:hover': { color: '#F06A6A' }, textAlign: 'left' }}
            >
              Travel & Expense
            </ButtonBase>
          </Grid>
          <Grid xs={3.5} item display={'flex'} style={{}}>
            <Grid container sx={{ width: '100%' }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Grid xs={12}>
                  <TextField
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    sx={{
                      mb: 0,

                      height: '8vh',
                      marginTop: '0px',
                      marginBottom: '20px',
                      width: '100%',
                      '& .MuiInputBase-input': {
                        borderRadius: '4px'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '4px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    sx={{
                      mb: 0,
                      height: '8vh',
                      marginTop: '0px',
                      marginBottom: '20px',
                      width: '100%',
                      '& .MuiInputBase-input': {
                        borderRadius: '4px'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '4px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phoneno"
                    placeholder="Phone Number"
                    value={form.phoneno}
                    onChange={handleFormChange}
                    required
                    sx={{
                      mb: 0,
                      height: '8vh',
                      marginTop: '0px',
                      marginBottom: '20px',
                      width: '100%',
                      '& .MuiInputBase-input': {
                        borderRadius: '4px'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '4px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    sx={{
                      textTransform: 'none',
                      fontSize: '1rem',
                      color: 'white',
                      fontWeight: '600',
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      backgroundColor: 'rgb(22, 96, 146)',
                      '&:hover': {
                        backgroundColor: '#F06A6A',
                        color: 'black'
                      }
                    }}
                  >
                    Contact Us
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </FooterContainers>
      <Grid container style={{ backgroundColor: 'rgb(30, 31, 33)' }}>
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

          <Grid item display={'flex'} gap={'8px'} color={'white'}>
            <ButtonBase disableRipple sx={{ cursor: 'pointer', '&:hover': { color: '#1D9BF0' } }} color={'white'}>
              <img src={XIcon} alt="XLogo" />
            </ButtonBase>
            <ButtonBase
              disableRipple
              href="https://in.linkedin.com/company/snssquare?trk=public_post_feed-actor-name"
              sx={{ cursor: 'pointer', '&:hover': { color: '#0A66C2' } }}
            >
              <LinkedInIcon />
            </ButtonBase>
            <ButtonBase
              disableRipple
              href="https://www.instagram.com/squaresns/"
              sx={{ cursor: 'pointer', '&:hover': { color: '#C13584' } }}
            >
              <InstagramIcon />
            </ButtonBase>
            <ButtonBase disableRipple href="https://www.youtube.com/@snssquare" sx={{ cursor: 'pointer', '&:hover': { color: '#FF0000' } }}>
              <YouTubeIcon />
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FooterPage;
