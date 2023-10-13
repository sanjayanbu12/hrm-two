import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      'https://drive.google.com/uc?id=1WPRmDLjaCOQGiAB1lvLR6ark3oMh6am3',
  },
  {
    imgPath:
      'https://drive.google.com/uc?id=1aVl6bNacuONWrYEfh1iTHlct8L5-ONEg',
  },
  {
    imgPath:
      'https://drive.google.com/uc?id=1nQnNJxPl33X3eAeBZ9ULL4DtXZw_cQTk',
  },
  // {
  //   imgPath:
  //     'https://drive.google.com/uc?id=1qUukx6adszNon4CmZD6Hjz1Ot33Y-vgB',
  // },
];

export default function PopularCard() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
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
  return (
    <>
     <Card elevation={3} style={{marginTop:'40px'}}>
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
    <Paper
      square
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 0,
        pl: 2,
        bgcolor: '#ffff',
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
                height: 255,
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: '100%',
              }}
              src={step.imgPath}
              alt={step.label}
            />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  </Box>
  </Card>
  <Card elevation={3}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    </Card>
    </>
  );
}