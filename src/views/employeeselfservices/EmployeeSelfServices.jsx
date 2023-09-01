import React, { useState } from 'react';
import './EmployeeSelfServices.css';
import { Card } from '@mui/material';

const EmployeeSelfServices = () => {
  const [activeSection, setActiveSection] = useState('goal');
  const [newGoal, setNewGoal] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [performanceData, setPerformanceData] = useState([
      { id: 1, goal: 'Complete project A', progress: '80%' },
      { id: 2, goal: 'Attend training seminar', progress: '100%' },
      { id: 3, goal: 'Seminar', progress: '70%' },
    ]); 
  
    const addNewGoal = () => {
      if (newGoal.trim() !== '') {
        const newId = performanceData.length + 1;
        const newPerformance = { id: newId, goal: newGoal, progress: '0%' };
        setPerformanceData([...performanceData, newPerformance]);
        setNewGoal('');
      }
    };
  
    const updateProgress = (itemId, newProgress) => {
      const updatedData = performanceData.map(item =>
        item.id === itemId ? { ...item, progress: newProgress } : item
      );
  
      setPerformanceData(updatedData);
    };
  
    const deleteGoal = itemId => {
      const updatedData = performanceData.filter(item => item.id !== itemId);
      setPerformanceData(updatedData);
    };
  

  const [editableItemId, setEditableItemId] = useState(null);

  return (
    <Card>
     <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0px' }}>
  <h2>Goal Setting</h2>
  <nav className="section-navigation">
    <button
      className={`section-button ${activeSection === 'goal' ? 'active' : ''}`}
      onClick={() => setActiveSection('goal')}
    >
      Goal
    </button>    
    <button
      className={`section-button ${activeSection === 'privacy' ? 'active' : ''}`}
      onClick={() => setActiveSection('privacy')}
    >
      Privacy Document
    </button>
  </nav>
</div>


      {activeSection === 'goal' && (
         <section>

      <button style={{display:'flex',justifyContent:'flex-end'}}
            className="add-goal-popup-button"
            onClick={() => setShowPopup(true)}
          >
            + Add Goal
          </button>
         {showPopup && (
          <div>
             <div className="backdrop"></div>
             <div className="goal-popup">
               <h3>Enter a New Goal</h3>
               <input
                 type="text"
                 value={newGoal}
                 onChange={e => setNewGoal(e.target.value)}
                 placeholder="Enter a new goal"
                 className="goal-input"
               />
         <div style={{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center', 
     justifyContent: 'center', 
     marginTop: '10px',
   }}>
     <button
       className="add-button"
       style={{ width: '100px' }} 
       onClick={() => { addNewGoal(); setShowPopup(false); }}
     >
       Add Goal
     </button>
     <button
       className="cancel-button"
       style={{ width: '100px', marginTop: '10px' }} 
       onClick={() => setShowPopup(false)}
     >
       Cancel
     </button>
   </div>
   
             </div>
           </div>
         )}
   
   <ul className="goal-list">
     {performanceData.map(item => (
       <li key={item.id} className="goal-item">
         <div className="goal-details">
           <strong>Goal:</strong> {item.goal},
           <strong> Progress:</strong>
           {editableItemId === item.id ? (
             <input
               type="number"
               value={parseInt(item.progress)} // Convert to number for input
               onChange={e => { handleEditProgress
                 const newProgress = e.target.value;
                 if (!isNaN(newProgress)) {
                   const updatedData = performanceData.map(dataItem =>
                     dataItem.id === item.id ? { ...dataItem, progress: newProgress + '%' } : dataItem
                   );
                   setPerformanceData(updatedData);
                 }
               }}
               onBlur={() => setEditableItemId(null)}
               autoFocus
             />
           ) : (
             <span
               className="editable-progress"
               onClick={() => setEditableItemId(item.id)}
               role="button"
               tabIndex={0}
               onKeyDown={e => {
                 if (e.key === 'Enter' || e.key === ' ') {
                   setEditableItemId(item.id);
                 }
               }}
             >
               {item.progress}
             </span>
           )}
         </div>
         <div className="goal-buttons">
           <button className="complete-button" onClick={() => updateProgress(item.id, '100%')}>
             Mark as Complete
           </button>
           <button className="delete-button" onClick={() => deleteGoal(item.id)}>
             Delete
           </button>
         </div>
       </li>
     ))}
   </ul>
        </section>
      )}

      {activeSection === 'privacy' && (
        <section>
         <h2>Privacy Document</h2>
      <p>
        Here is the privacy document that outlines the data protection policies for employees.
        You can read the document below:
      </p>
      <div className="privacy-document">
  <h3>Employee Data Privacy Document</h3>
  <p>
    This document outlines the data protection policies and practices for employees
    of our company.
  </p>
  <h4>1. Data Collection</h4>
  <p>
    We collect personal data from employees for the purpose of managing human resources,
    payroll, benefits administration, and other employment-related activities.
  </p>
  <h4>2. Data Usage</h4>
  <p>
    Employee data is used solely for internal purposes and to ensure compliance with
    legal and regulatory requirements.
  </p>
  <h4>3. Data Security</h4>
  <p>
    We implement strict security measures to protect employee data from unauthorized access
    or disclosure.
  </p>

   </div>
   </section>
      )}
    </Card>
  );
};

export default EmployeeSelfServices;
