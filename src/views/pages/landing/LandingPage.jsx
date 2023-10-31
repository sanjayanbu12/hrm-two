import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import Logos from 'ui-component/Logos';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: 'https://drive.google.com/uc?id=1qUukx6adszNon4CmZD6Hjz1Ot33Y-vgB'
  },
  {
    imgPath: 'https://drive.google.com/uc?id=1ynKIK2Vgr72QMDYMGIl38n6kBxqNY1NW'
  },
  {
    imgPath: 'https://drive.google.com/uc?id=1MGBRPBid3FQMN4TS1-hfPEHFc4LE9abd'
  },
  {
    imgPath: 'https://drive.google.com/uc?id=1F5yYoXbPS5WxFjPws4BidjLONNh7n12n'
  }
];

const LandingPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div className="body-wrap">
      <div className="site-header">
        <div className="container">
          <h2 className="m-0">
            <Link to="#">
              <Logos />
            </Link>
          </h2>
        </div>
      </div>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1 className="hero-title mt-0">HR Management</h1>
              <p className="hero-paragraph">
                Your gateway to seamless HR operations. Embark on a journey of streamlined processes, team empowerment, and elevated
                organizational efficiency with us
              </p>
              <div className="hero-cta">
                <Link className="button button-primary" to="/pages/register/register3">
                  Register now
                </Link>
                <Link className="button" to="/pages/login/login3">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hero-figure anime-element">
              <svg className="placeholder" width="528" height="375" viewBox="0 0 528 396">
              </svg>
              <div className="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
              <div className="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
              <div className="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
              <div className="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
              <div className="hero-figure-box hero-figure-box-05"></div>
              <div className="hero-figure-box hero-figure-box-06"></div>
              <div className="hero-figure-box hero-figure-box-07"></div>
              <div className="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
              <div className="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
              <div className="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <section className="cta section">
          <div className="container">
            <div className="cta-inner section-inner">
              <h3 className="section-title mt-0">About Our Tool</h3>
              <div className="cta-cta">
                <a className="button button-primary button-wide-mobile" href="#">
                 Youtube Link
                </a>
              </div>
            </div>
          </div>
        </section>

        <Card
          style={{
            backgroundColor: '#1D2026',
            marginRight: '30px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ maxWidth: '600px', maxHeight: '500' }}>
            <Paper
              square
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 0,
                pl: 2,
                backgroundcolor: '#1D2026',
                color: 'white'
              }}
            >
              <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 300,
                        display: 'block',
                        maxWidth: 600,
                        overflow: 'hidden',
                        width: '100%'
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </Box>
        </Card>
      </div>

      <footer className="site-footer" style={{ marginTop: '60px' }}>
        <div className="container">
          <div className="site-footer-inner">
            <div className="brand footer-brand">
              <Link to="#">
                <Logos />
              </Link>
            </div>
            <ul className="footer-links list-reset">
                        <li>
                            <a href="https://snssquare.com/">Home</a>
                        </li>
                        <li>
                            <a href="https://snssquare.com/aboutussnssquare">About us</a>
                        </li>
                        {/* <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <a href="#">FAQ`s</a>
                        </li>
                        <li>
                            <a href="#">Support</a>
                        </li> */}
                    </ul>
            <ul className="footer-social-links list-reset">
              <li>
                <a href="https://www.facebook.com/profile.php?id=100090133719937&mibextid=ZbWKwL">
                  <span className="screen-reader-text">Facebook</span>
                  <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                      fill="#0270D7"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/snssquare?t=fh_0lmoqkcuCr2HJSMNHrg&s=09">
                  <span className="screen-reader-text">X</span>
                  <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                      fill="#0270D7"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://snssquare.com">
                  <span className="screen-reader-text">Google</span>
                  <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                      fill="#0270D7"
                    />
                  </svg>
                </a>
              </li>
            </ul>
            <div className="footer-copyright">&copy; 2023 Solid, all rights reserved</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
