import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  optionInput: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  postButton: {
    marginTop: theme.spacing(2),
    animation: 'pulse 1s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const QuizForm = () => {
  const classes = useStyles();

  return (
    <MainCard title="🧠 Quiz Form">
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="❓ Question" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} className={classes.optionContainer}>
            {[1, 2, 3, 4].map((optionNumber) => (
              <TextField
                key={`option${optionNumber}`}
                label={`Option ${optionNumber}`}
                variant="outlined"
                className={classes.optionInput}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <TextField label="✅ Correct Answer" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className={classes.postButton}>
              Post Quiz
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default QuizForm;
