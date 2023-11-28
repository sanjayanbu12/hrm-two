import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function PopularCard() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [images, setImages] = React.useState([
    // Your initial images
    {
      imgPath: 'https://drive.google.com/uc?id=1vVlVqSIJIhNo7kDXkHHtpvPDBpytCoyJ'
    },
    {
      imgPath: 'https://drive.google.com/uc?id=1WPRmDLjaCOQGiAB1lvLR6ark3oMh6am3'
    }
    // ... Add more initial images as needed
  ]);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const imageArray = [];
    for (let i = 0; i < fileList.length; i++) {
      const objectUrl = URL.createObjectURL(fileList[i]);
      imageArray.push({ imgPath: objectUrl });
    }
    setImages((prevImages) => [...prevImages, ...imageArray]);
  };

  return (
    <>
      <Card elevation={3}>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 0,
              pl: 2,
              bgcolor: '#ffff'
            }}
          />
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={index}>
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%'
                  }}
                  src={step.imgPath}
                />
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
          {activeStep === maxSteps - 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <label htmlFor="file-upload">
                <input style={{ display: 'none' }} id="file-upload" type="file" accept="image/*" onChange={handleFileChange} multiple />
                <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
                  Upload Images
                </Button>
              </label>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}
