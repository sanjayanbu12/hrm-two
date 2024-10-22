import React, { useRef, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';
import { Skeleton } from 'primereact/skeleton';

const Quiz = ({ courseid }) => {
  const toast = useRef(null);

  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(courseid,"This is Quiz")
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const show = (message, score, totalQuestions) => {
    let severity = 'success'; // Default to green color

    if ((score / totalQuestions) * 100 < 60) {
      severity = 'error'; // Change to red color for scores below 60%
    }

    toast.current.show({ severity, summary: 'Quiz Submitted', detail: message });
  };

  const onSubmit = (data) => {
    let score = 0;

    // Calculate the user's score based on their answers
    quizData.forEach((question, index) => {
      if (data[`answer${index}`] === question.correctAnswer) {
        score += 1;
      }
    });

    const totalQuestions = quizData.length;
    show(`Your score: ${score}/${totalQuestions}`, score, totalQuestions);
    reset();
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
        console.error('Error fetching quiz data:', error);
        setIsLoading(false);
      });
      
  }, [courseid.courseid]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          ) : quizData.length === 0 ? ( // Check if no quiz is available
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
                        <div style={{ marginTop: 10 }} key={optionIndex}>
                          <RadioButton inputId={`q${index}o${optionIndex}`} {...field} value={option} checked={field.value === option} />
                          <label htmlFor={`q${index}o${optionIndex}`} className="ml-1">
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
<Button label="Submit Quiz" type="submit" icon="pi pi-check" style={{marginTop:'10px'}} />
      
        </div>
      </form>
    </>
  );
};

export default Quiz;
