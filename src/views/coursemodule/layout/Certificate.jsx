import { Box } from '@mui/material';
import React from 'react';
import logo from '../layout/SquareLogo.jpeg';
import { StyledPaper, StyledBox, FlexContainer,PaddedDiv,Coloredcontainer,Container} from './StyleCertificate';

const Certificate = () => {
  return (
    <>
      <StyledPaper>
        <StyledBox>
          <FlexContainer>
            <PaddedDiv>
              <img style={{ display: 'flex' }} src={logo} alt="Square Logo" />
            </PaddedDiv>
            <h1 style={{ marginTop: '90px', display: 'block' }}>SNS Square Skill Training</h1>

            <Coloredcontainer/>
          </FlexContainer>
          <Container>
            <Box
              sx={{
                marginTop: '-170px',
                backgroundColor: '#F0DE36',
                height: '85px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                marginTop: '-85px',
                backgroundColor: '#47B5FF',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                marginTop: '-10px',
                backgroundColor: '#FFB000',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                backgroundColor: '#220160',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                backgroundColor: '#cd0a0a',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                backgroundColor: '#299a67',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                backgroundColor: '#3458ad',
                height: '76px',
                width: '20px',
                padding: '10px' // Add some padding to make the content visible
              }}
            />
          </Container>
          <Container>
            <Box
              sx={{
                backgroundColor: '#c60c85',
                height: '76px',
                width: '20px',
                padding: '10px'
              }}
            />
          </Container>
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default Certificate;
