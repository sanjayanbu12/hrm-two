// import React, { useState } from 'react';

// const QuizForm = ({ onAddQuestion }) => {
//   const [newQuestion, setNewQuestion] = useState('');
//   const [newOptions, setNewOptions] = useState(['', '', '', '']);
//   const [correctAnswer, setCorrectAnswer] = useState('');

//   const handleAddQuestion = () => {
//     const questionObject = {
//       question: newQuestion,
//       options: newOptions.filter((option) => option.trim() !== ''),
//       correctAnswer,
//     };

//     onAddQuestion(questionObject);
//     setNewQuestion('');
//     setNewOptions(['', '', '', '']);
//     setCorrectAnswer('');
//   };

//   return (
//     <div>
//       <h2>Add a New Quiz Question</h2>
//       <div>
//         <label htmlFor="question">Question:</label>
//         <input type="text" id="question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="Options">Options:</label>
//         {newOptions.map((option, index) => (
//           <div key={index}>
//             <label htmlFor={`option${index}`}>{`Option ${index + 1}:`}</label>
//             <input
//               type="text"
//               id={`option${index}`}
//               value={option}
//               onChange={(e) => {
//                 const updatedOptions = [...newOptions];
//                 updatedOptions[index] = e.target.value;
//                 setNewOptions(updatedOptions);
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <div>
//         <label htmlFor="correctAnswer">Correct Answer:</label>
//         <input type="text" id="correctAnswer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
//       </div>
//       <button onClick={handleAddQuestion}>Add Question</button>
//     </div>
//   );
// };

// export default QuizForm;


import React from 'react'

const QuizForm = () => {
  return (
    <h1 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Under Development</h1>
  )
}

export default QuizForm
