import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, IconButton, Box } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; // Import Axios

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  optionInput: {
    marginBottom: theme.spacing(2)
  },
  postButton: {
    marginTop: theme.spacing(2)
  },
  deleteButton: {
    color: 'red'
  }
}));

const QuizForm = ({ courseid }) => {
  const classes = useStyles();
  const [options, setOptions] = useState(['', '', '', '']);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const addOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  const deleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const postQuiz = async () => {
    try {
      // Prepare the data to send to the backend
      const data = {
        question,
        options,
        correctAnswer,
        courseId: courseid
      };

      // Send a POST request to create a new quiz
      const response = await axios.post('https://pulsehr-express-server.onrender.com/quiz/create', data); // Replace with your actual API endpoint
      console.log('Quiz created:', response.data);

      // Reset the form
      setQuestion('');
      setOptions(['']);
      setCorrectAnswer('');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <MainCard title="Quiz Form">
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Question" variant="outlined" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            {options.map((option, index) => (
              <Box key={`option${index}`} display="flex" alignItems="center">
                <TextField
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  className={classes.optionInput}
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index] = e.target.value;
                    setOptions(updatedOptions);
                  }}
                />
                {index >= 2 && (
                  <IconButton onClick={() => deleteOption(index)} className={classes.deleteButton}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button variant="outlined" onClick={addOption}>
              + Add Option
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correct Answer"
              variant="outlined"
              fullWidth
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="button" variant="contained" color="primary" className={classes.postButton} onClick={postQuiz}>
              Post Quiz
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default QuizForm;
