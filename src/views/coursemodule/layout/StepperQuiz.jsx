import React, { useRef, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container, Grid, Paper, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import FeedIcon from '@mui/icons-material/Feed';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';
import { Skeleton } from 'primereact/skeleton';
import { List, ListItem, ListItemText ,Divider} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  stepper: {
    background: 'transparent',
    padding: theme.spacing(3, 0, 5),
  },
  stepLabel: {
    fontSize: '1.2rem',
  },
  stepContent: {
    marginTop: theme.spacing(2),
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  icon: {
    fontSize: 32,
  },
}));

const steps = [
  { label: 'Quiz', icon: <FeedIcon /> },
  { label: 'Quiz Score', icon: <ImportContactsIcon /> },
  { label: 'Certificate', icon: <CardMembershipIcon /> },
];

const StepperQuiz = (courseid) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState([]); // Add state for quizData

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <Container>
      <Paper elevation={3} className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {steps.map(({ label, icon }, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={() => (
                  <IconButton className={classes.iconButton} size="small">
                    {activeStep > index ? <CheckIcon className={classes.icon} /> : icon}
                  </IconButton>
                )}
                className={classes.stepLabel}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.stepContent}>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h5">All steps completed!</Typography>
              <Button variant="contained" color="primary" onClick={handleReset}>
                Restart
              </Button>
            </div>
          ) : (
            <div>
              {activeStep === 0 && <Quiz courseid={courseid} onNextStep={handleNext} onQuizSubmit={(answers, userScore, data) => { setUserAnswers(answers); setScore(userScore); setQuizData(data); }} />}
              {activeStep === 1 && <Component2 quizData={quizData} userAnswers={userAnswers} score={score} />}
              {activeStep === 2 && <Component3 />}
            </div>
          )}
        </div>
        <Grid container spacing={2} className={classes.buttonGroup}>
          <Grid item>
            <Button disabled={activeStep === 0} variant="outlined" color="primary" onClick={handleBack} startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Grid>
          <Grid item>
            <Grid item>
              {activeStep !== 0 && (
                <Button variant="contained" color="primary" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const Quiz = ({ courseid, onNextStep, onQuizSubmit }) => {
  const toast = useRef(null);

  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const show = (message, score, totalQuestions) => {
    let severity = 'success';

    if ((score / totalQuestions) * 100 < 60) {
      severity = 'error';
    }

    toast.current.show({ severity, summary: 'Quiz Submitted', detail: message });
  };

  const onSubmitQuiz = (data) => {
    let score = 0;
    const userAnswers = [];

    quizData.forEach((question, index) => {
      const userAnswer = data[`answer${index}`];
      userAnswers.push(userAnswer);

      if (userAnswer === question.correctAnswer) {
        score += 1;
      }
    });

    const totalQuestions = quizData.length;
    show(`Your score: ${score}/${totalQuestions}`, score, totalQuestions);
    reset();
    onNextStep();
    onQuizSubmit(userAnswers, score, quizData);
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
  };

  useEffect(() => {
    axios
      .get(`https://hrm-backend-square.onrender.com/media/get/${courseid.courseid}`)
      .then((response) => {
        console.log('Quiz data response:', response.data);
        setQuizData(response.data.quiz);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [courseid.courseid]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitQuiz)}>
        <div className="flex flex-column gap-2">
          <Toast ref={toast} />

          {isLoading ? (
            <div className="flex flex-wrap">
              <div className="w-full md:w-6 p-3">
                <Skeleton style={{ marginTop: 5 }} height="2rem" className="mb-2"></Skeleton>
                <p></p>
                <Skeleton height="4rem"></Skeleton>
                <p></p>
              </div>
            </div>
          ) : quizData.length === 0 ? (
            <div>No quiz is available for this course.</div>
          ) : (
            quizData.map((question, index) => (
              <div key={question._id} className="flex flex-column gap-2">
                <div style={{ marginBottom: 7 }}>{question.question}</div>
                <Controller
                  name={`answer${index}`}
                  control={control}
                  rules={{ required: 'Please select an answer.' }}
                  render={({ field }) => (
                    <div className="flex">
                      {question.options.map((option, optionIndex) => (
                        <div style={{ marginTop: 15 }} key={optionIndex}>
                          <RadioButton inputId={`q${index}o${optionIndex}`} {...field} value={option} checked={field.value === option} />
                          <label style={{ marginLeft: 10 }} htmlFor={`q${index}o${optionIndex}`} className="ml-1">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />

                {getFormErrorMessage(`answer${index}`)}
              </div>
            ))
          )}
          <Button type="submit" icon="pi pi-check" style={{ marginTop: '10px' }}>
            Submit Quiz
          </Button>
        </div>
      </form>
    </>
  );
};

const Component2 = ({ quizData, userAnswers, score }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Quiz Summary
      </Typography>
      <Typography variant="body1">Your Score: {score}</Typography>
      <Divider style={{ margin: '10px 0' }} />
      <List>
        {quizData.map((question, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={
                <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Question {index + 1}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" component="div" color="textSecondary">
                    {question.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    style={{
                      color: userAnswers[index] === question.correctAnswer ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    Your Answer: {userAnswers[index]}
                  </Typography>
                  <Typography variant="body2" component="div" color="textSecondary">
                    Correct Answer: {question.correctAnswer}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
const Component3 = () => {
  return <Typography variant="body1">Share details about your work</Typography>;
};

export default StepperQuiz;
