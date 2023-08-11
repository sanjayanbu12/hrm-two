// import { TextField } from '@mui/material';
// import React, { useState } from 'react';
// import MainCard from 'ui-component/cards/MainCard';

// const EmployeePerformance = () => {
//   const [employeeName, setEmployeeName] = useState('');
//   const [performanceRating, setPerformanceRating] = useState('');
//   const [quality, setQuality] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [jobknowledge, setJobknowledge] = useState('');
//   const [relationships, setRelationships] = useState('');
//   const [comments, setComments] = useState('');

//   const handleEmployeeNameChange = (event) => {
//     setEmployeeName(event.target.value);
//   };

//   const handleRatingChange = (event) => {
//     const value = Number(event.target.value);
//     if (value >= 1 && value <= 10) {
//       setPerformanceRating(value);
//     }
//   };

//   const handleQuantityChange = (event) => {
//     const value = Number(event.target.value);
//     if (value >= 0 && value <= 10) {
//       setQuantity(value);
//     }
//   };

//   const handleQualityChange = (event) => {
//     const value = Number(event.target.value);
//     if (value >= 0 && value <= 10) {
//       setQuality(value);
//     }
//   };

//   const handleJobknowledgeChange = (event) => {
//     const value = Number(event.target.value);
//     if (value >= 0 && value <= 10) {
//       setJobknowledge(value);
//     }
//   };

//   const handleRelationshipsChange = (event) => {
//     const value = Number(event.target.value);
//     if (value >= 0 && value <= 10) {
//       setRelationships(value);
//     }
//   };

//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setEmployeeName('');
//     setPerformanceRating('');
//     setQuantity('');
//     setComments('');
//   };

//   const formStyle = {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gridGap: '20px',
//     margin: '0px',
//     maxWidth: '100%',
//   };

//   const inputStyle = {
//     marginBottom: '0px',
//     padding: '5px',
//     fontSize: '16px',
//     width: '100%',
//   };

//   const buttonStyle = {
//     gridColumn: '1 / span 2',
//     backgroundColor: 'rgba(103, 58, 183, 0.85)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '10px',
//     padding: '10px',
//     fontSize: '10px',
//     cursor: 'pointer',
//   };

//   const labelStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '5px',
//     fontWeight: 'bold',
//   };

//   const indicatorStyle = {
//     marginRight: '5px',
//     width: '10px',
//     height: '10px',
//     borderRadius: '50%',
//   };

//   const renderIndicator = (color) => {
//     return <div style={{ ...indicatorStyle, background: color }} />;
//   };

//   return (
//     <MainCard title="Employee Performance">
//       <div style={formStyle}>
//         <div>
//           <h2>Employee Name</h2>
//           <TextField
//             type="text"
//             id="employeeName"
//             value={employeeName}
//             onChange={handleEmployeeNameChange}
//           />
//         </div>
//         <MainCard title="Performance Rating">
//           <form onSubmit={handleSubmit}>
//             <div style={labelStyle}>
//               {renderIndicator('yellow')}
//               Performance Rating: Overall
//             </div>
//             <TextField
//               type="number"
//               id="performanceRating"
//               value={performanceRating}
//               onChange={handleRatingChange}
//               inputProps={{
//                 min: 1,
//                 max: 10,
//               }}
//               style={inputStyle}
//             />
//           </form>
//         </MainCard>

//         <MainCard title="Time Management">
//           <div style={labelStyle}>
//             {renderIndicator('green')}
//             Quantity of Work - Time Management:
//           </div>
//           <TextField
//             type="number"
//             id="quantity"
//             value={quantity}
//             onChange={handleQuantityChange}
//             inputProps={{
//               min: 1,
//               max: 10,
//             }}
//             style={inputStyle}
//           />
//         </MainCard>

//         <MainCard title="Quality of Work">
//           <div style={labelStyle}>
//             {renderIndicator('orange')}
//             Quality of Work - Accuracy:
//           </div>
//           <TextField
//             type="number"
//             id="quality"
//             value={quality}
//             onChange={handleQualityChange}
//             inputProps={{
//               min: 1,
//               max: 10,
//             }}
//             style={inputStyle}
//           />
//         </MainCard>

//         <MainCard title="Job Knowledge">
//           <div style={labelStyle}>
//             {renderIndicator('purple')}
//             Job Knowledge - Skills and Understanding of Work:
//           </div>
//           <TextField
//             type="number"
//             id="jobknowledge"
//             value={jobknowledge}
//             onChange={handleJobknowledgeChange}
//             inputProps={{
//               min: 1,
//               max: 10,
//             }}
//             style={inputStyle}
//           />
//         </MainCard>

//         <MainCard title="Working Relationships">
//           <div style={labelStyle}>
//             {renderIndicator('pink')}
//             Working Relationships - Ability to Work with Others:
//           </div>
//           <TextField
//             type="number"
//             id="relationships"
//             value={relationships}
//             onChange={handleRelationshipsChange}
//             inputProps={{
//               min: 1,
//               max: 10,
//             }}
//             style={inputStyle}
//           />
//         </MainCard>

//         <MainCard title="Comments">
//           <form onSubmit={handleSubmit} style={{ gridColumn: '1 / span 2' }}>
//           <label htmlFor="comments" style={labelStyle}>
//   Comments:
// </label>

//             <TextField
//               id="comments"
//               value={comments}
//               onChange={handleCommentsChange}
//               style={inputStyle}
//             />
//             <button type="submit" style={buttonStyle}>
//               SUBMIT
//             </button>
//           </form>
//         </MainCard>
//       </div>
//     </MainCard>
//   );
// };

// export default EmployeePerformance;


import React from 'react'

const Employeeperformance = () => {
  return (
    <div style={{
      fontSize:'30px',
      fontStyle:'bold',
      position:'absolute',
      marginTop:'260px',
      marginLeft:'500px',
      fontWeight:'bolder'

    }}>
      UNDER DEVELOPMENT
      </div>
  )
}

export default Employeeperformance