import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import { BsBucketFill } from "react-icons/bs";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState} from 'react';
import Firststep from './Firststep';
import Secondstep from './Secondstep';
import Finalstep from './Finalstep';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

// const QontoConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: '#784af4',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: '#784af4',
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// }));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;
  

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor:'#279EFF'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
     backgroundColor:'#279EFF'
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor:'#279EFF',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor:'#279EFF'
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Bs1CircleFill style={{fontSize:'20px'}}/>,
    2: <Bs2CircleFill style={{fontSize:'20px'}}/>,
    3: <BsBucketFill style={{fontSize:'20px'}} />,
  };

  return (<>
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>

   </>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['1st step', '2nd Step', 'Final step'];

const CustomizedSteppersContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '75vh',
  position: 'relative',
});

const ButtonContainer = styled('div')({
  marginTop: 'auto',
  alignSelf: 'flex-end',
  marginBottom: '20px',
  marginRight:'10px',
});

const CancelIconContainer = styled('div')({
  margin: '0px 3px 0px auto', 
  color:'red',
  cursor:'pointer',

});

export default function CustomizedSteppers({ handleClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false); 
  const [formData, setFormData] = useState({});
  console.log(formData)
  const { employeeContextData } = useContext(ApiContext);
  const authId = useSelector((state) => state.customization.authId);
  const [employeeId, setEmployeeId] = useState(null);
  const [loading, setLoading] = useState(false); 
  const[name,setName]=useState("");
  console.log("name",name)
  const[email,setEmail]=useState("");
  console.log("email",email)
  

  useEffect(() => {
    const fetchingCorrect = async () => {
      const response = employeeContextData.data;
      if (response && response.length > 0) {
        const filteredData = response.filter(item => item.employeeid === authId);
        console.log("filteredData",filteredData)
        const employeeIds = filteredData.map((data) => data._id);
        setEmployeeId(employeeIds[0]); 
        console.log(employeeIds[0]);
        setName(filteredData.map((data) => data.name))
        setEmail(filteredData.map((data) => data.email))
      }
    };

    fetchingCorrect();
  }, [authId, employeeContextData.data]);
  
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setSubmitClicked(true);
      setLoading(true);
  
      try {

        // Create a new FormData object
        const formDataToSend = new FormData();
  
        // Add employeeId to the formData
        formDataToSend.append('employeeid', employeeId);
  
        // Loop through the properties of formData and append them to formDataToSend
        for (const property in formData) {
          if (property === 'reportingTo') {
            // Convert reportingTo array to JSON string before appending
            formDataToSend.append(property, JSON.stringify(formData[property]));
          } else {
            formDataToSend.append(property, formData[property]);
          }
        }

        // Send formDataToSend to the server
        const response = await axios.post(
          'http://localhost:3001/proc/createdata',
          formDataToSend
        );
        console.log(response);
        handleClose();
      } catch (error) {
        console.error('Error submitting form data:', error);
      } finally {
        setLoading(false); // Set loading back to false after API call completes
      }
    } else {
      // Check if the required fields are filled
      if (formData.isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        console.error('Please fill in all required fields.');
      }
    }
  };
  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <Firststep name={name} email={email} setFormData={setFormData} formData={formData}/>;
      case 1:
        return <Secondstep setFormData={setFormData} formData={formData}/>;
      case 2:
        return <Finalstep setFormData={setFormData} formData={formData}/>;
      default:
        return null;
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <>
      <CustomizedSteppersContainer>
      <CancelIconContainer onClick={handleClose}>
          <CancelIcon sx={{color:'#279EFF'}}/>
        </CancelIconContainer>
      
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        {renderStepComponent()}
     <Grid  sx={{display:"flex",justifyContent:'space-between',marginTop: 'auto'}}>
        <ButtonContainer>
        <Button
         sx={{ml:'15px'}}
                variant="contained"
                startIcon={<ArrowBackOutlinedIcon />}
                onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                disabled={activeStep === 0 || submitClicked}
              >
                Back
              </Button>
          </ButtonContainer>
        <ButtonContainer>
        <Button
  variant="contained"
  endIcon={isLastStep ? null : <SendIcon />}
  onClick={handleNext}
  disabled={submitClicked || !formData.isValid}
>
  {loading ? <CircularProgress size={24} /> : isLastStep ? 'Submit' : 'Next'}
</Button>
         
        </ButtonContainer>
        </Grid>
      </CustomizedSteppersContainer>
    </>
  );
}