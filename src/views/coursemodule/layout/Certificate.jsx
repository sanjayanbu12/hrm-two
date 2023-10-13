import React from 'react';
import logo from '../layout/SquareLogo.jpeg';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyledPaper, StyledBox, FlexContainer, PaddedDiv } from './StyleCertificate';
import axios from 'axios';

const Certificate = ({ name }) => {
  const [matched, setMatched] = useState('');

  console.log('match', matched);
  const authId = useSelector((state) => state.customization.authId);

  const companyname = 'SNS SQUARE CONSULTANCY SERVICES PVT LTD ';

  const WhoLog = async () => {
    try {
      const res = await axios.get('https://hrm-backend-square.onrender.com/auth/getalldata');
      const users = res.data.user;
      const matchedUser = users.find((user) => user.employeeId === authId);
      if (matchedUser) {
        setMatched(matchedUser);
      } else {
        console.log('No user found with the provided authId.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    WhoLog();
  }, []);


  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat&family=Roboto:wght@400;500;700&family=Tangerine:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>

      <StyledPaper>
        <StyledBox>
          <FlexContainer>
            <PaddedDiv>
              <img style={{ display: 'flex' }} src={logo} alt="Square Logo" />
              <div>
                <h1 style={{ display: 'block', marginLeft: 40 }}>SNS SQUARE CONSULTANCY SERVICES PVT LTD</h1>
                <div
                  style={{
                    display: 'flex',
                    marginLeft: 45,
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'black',
                      padding: '10px',
                      color: 'yellow',
                      fontSize: 20,
                      fontFamily: 'monospace'
                    }}
                  >
                    {name}
                  </div>
                </div>
              </div>
            </PaddedDiv>
          </FlexContainer>
          <div style={{ display: 'flex' }}>
            <h2 style={{ marginTop: 90, marginLeft: 150, fontFamily: 'Tangerine, cursive', fontSize: '80px' }}>Certificate</h2>
          </div>
          <div>
            <h3 style={{ marginTop: -53, marginLeft: 300 }}>OF APPRECIATION PROUDLY PRESENTED TO</h3>

            <h2 style={{ marginTop: 25, marginLeft: 670, fontFamily: 'Tangerine, cursive', fontSize: '70px' }}> {matched.firstname}</h2>
          </div>
          <h3 style={{ marginTop: -20, marginLeft: 150 }}>
            Has successfully completed the {name} offered by {companyname} <br />
          </h3>
        </StyledBox>
      </StyledPaper>
      
    </>
  );
};

export default Certificate;
