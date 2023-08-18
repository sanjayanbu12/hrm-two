// import React, { useState } from 'react';
// import MainCard from 'ui-component/cards/MainCard';

// const EmployeeSelfServices = () => {
//   const [performanceData, setPerformanceData] = useState([
//     { id: 1, goal: 'Complete project A', progress: '80%' },
//     { id: 2, goal: 'Attend training seminar', progress: '100%' },
//   ]);

//   const [newGoal, setNewGoal] = useState('');

//   const addNewGoal = () => {
//     if (newGoal.trim() !== '') {
//       const newId = performanceData.length + 1;
//       const newPerformance = { id: newId, goal: newGoal, progress: '0%' };
//       setPerformanceData([...performanceData, newPerformance]);
//       setNewGoal('');
//     }
//   };

//   const updateProgress = (itemId, newProgress) => {
//     const updatedData = performanceData.map(item => {
//       if (item.id === itemId) {
//         return { ...item, progress: newProgress };
//       }
//       return item;
//     });

//     setPerformanceData(updatedData);
//   };

//   return (
//     <MainCard title="Employee Self Services">
//       <section>
//         <h2 style={{ marginBottom: '10px' }}>Performance Management</h2>
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           {performanceData.map(item => (
//             <li key={item.id} style={{ marginBottom: '10px' }}>
//               <strong>Goal:</strong> {item.goal}, <strong>Progress:</strong> {item.progress}
//               <button
//                 onClick={() => updateProgress(item.id, '100%')}
//                 style={{ marginLeft: '10px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
//               >
//                 Mark as Complete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </section>
//       <section>
//         <h3>Add New Goal</h3>
//         <input
//           type="text"
//           value={newGoal}
//           onChange={e => setNewGoal(e.target.value)}
//           placeholder="Enter a new goal"
//           style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
//         />
//         <button
//           onClick={addNewGoal}
//           style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
//         >
//           Add Goal
//         </button>
//       </section>
//     </MainCard>
//   );
// };

// export default EmployeeSelfServices;

import React from 'react'

const EmployeeSelfServices = () => {
  return (
    <div style={{
      fontSize:'30px',
      fontStyle:'bold',
      position:'absolute',
      marginTop:'260px',
      marginLeft:'400px',
      fontWeight:'bolder'
    }}>
      UNDER DEVELOPMENT
      </div>
  )
}
export default EmployeeSelfServices