
import React, { useState, useEffect } from 'react';
import logo from '../layout/SquareLogo.jpeg';
import { useSelector } from 'react-redux';
import { StyledPaper, StyledBox, FlexContainer, PaddedDiv } from './StyleCertificate';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ name }) => {
  const [matched, setMatched] = useState('');
  const authId = useSelector((state) => state.customization.authId);
  const companyname = 'SNS SQUARE CONSULTANCY SERVICES PVT LTD';

  const WhoLog = async () => {
    try {
      const res = await axios.get('http://localhost:3001/auth/getalldata');
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

  const downloadCertificate = () => {
    // Get the certificate container element to capture
    const certificateContainer = document.getElementById('certificate-container');

    // Use html2canvas to capture the certificate as an image
    html2canvas(certificateContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF document
      const pdf = new jsPDF('l', 'mm', [282, 467]); 

      // Add the captured image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0);

      // Download the PDF with a filename
      pdf.save('certificate.pdf');
    });
  };

  return (
    <>
      {/* Place the <head> element in the correct location */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat&family=Roboto:wght@400;500;700&family=Tangerine:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>

      <div id="certificate-container">
        <StyledPaper>
          <StyledBox>
            <FlexContainer>
              <PaddedDiv>
                <img style={{ display: 'flex' }} src={logo} alt="Square Logo" />
                <div>
                  <h1 style={{ display: 'block', marginLeft: 40, color: 'black' }}>SNS SQUARE CONSULTANCY SERVICES PVT LTD</h1>
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: 45,
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'black',
                        padding: '10px',
                        color: 'yellow',
                        fontSize: 20,
                        fontFamily: 'monospace',
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

              <h2 style={{ marginTop: 25, marginLeft: 670, fontFamily: 'Tangerine, cursive', fontSize: '70px' }}>{matched.firstname}</h2>
            </div>
            <h3 style={{ marginTop: -20, marginLeft: 150 }}>
              Has successfully completed the {name} offered by {companyname} <br />
            </h3>
          </StyledBox>
        </StyledPaper>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={downloadCertificate}>Download Certificate (PDF)</button>
        </div>
      </div>
    </>
  );
};

export default Certificate;
