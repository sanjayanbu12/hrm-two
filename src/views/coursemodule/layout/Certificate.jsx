import { Box } from '@mui/material';
import React from 'react';
import logo from '../layout/SquareLogo.jpeg';
import {StyledPaper,StyledBox} from './StyleCertificate';

const Certificate = () => {
  return (
    <>
      <StyledPaper>
        <StyledBox>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ paddingLeft: '40px', paddingTop: '40px' }}>
              <img style={{ display: 'flex' }} src={logo} alt="Square Logo" />
            </Box>
            
            <Box sx={{ backgroundColor: '#F0DE36', height: '30px', width: '350px' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
              marginTop:'-170px',
                backgroundColor: '#F0DE36',
                height: '85px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
                marginTop:'-85px',
                backgroundColor: '#47B5FF',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
                marginTop:'-10px',
                backgroundColor: '#FFB000',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
               
                backgroundColor: '#220160',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
               
                backgroundColor: '#cd0a0a',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
               
                backgroundColor: '#299a67',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
               
                backgroundColor: '#3458ad',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
           
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
               
                backgroundColor: '#c60c85',
                height: '76px',
                width: '20px',
                padding: '10px'
              }}
            />
           
          </Box>
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default Certificate;
