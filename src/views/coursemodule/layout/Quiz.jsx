import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';

const Quiz=() =>{
    const toast = useRef(null);
    const [quizData, setQuizData] = useState([
        {
            question: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correctAnswer: 'Paris',
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
            correctAnswer: 'Mars',
        },
        // Add more quiz questions here
    ]);
    console.log(setQuizData)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const show = (message) => {
        toast.current.show({ severity: 'success', summary: 'Quiz Submitted', detail: message });
    };

    const onSubmit = (data) => {
        let score = 0;

        // Calculate the user's score based on their answers
        quizData.forEach((question, index) => {
            if (data[`answer${index}`] === question.correctAnswer) {
                score += 1;
            }
        });

        show(`Your score: ${score}/${quizData.length}`);
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        < >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-column gap-2">
                    <Toast ref={toast} />

                    {quizData.map((question, index) => (
                        <div key={index} className="flex flex-column gap-2">
                            <div  style={{marginBottom:7}}>{question.question}</div>
                            <Controller
                                name={`answer${index}`}
                                control={control}
                                rules={{ required: 'Please select an answer.' }}
                                render={({ field }) => (
                                    <div className="flex">
                                        {question.options.map((option, optionIndex) => (
                                            <div  style={{marginTop:10}} key={optionIndex}>
                                                <RadioButton
                                               
                                                    inputId={`q${index}o${optionIndex}`}
                                                    {...field}
                                                    value={option}
                                                    checked={field.value === option}
                                                />
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
                    ))}

                    <Button label="Submit Quiz" type="submit" icon="pi pi-check" />
                </div>
            </form>
        </>
    );
}

export default Quiz