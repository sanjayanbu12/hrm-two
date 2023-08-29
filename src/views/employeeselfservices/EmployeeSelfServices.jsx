import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import './EmployeeSelfServices.css'; // Import your custom CSS file

const EmployeeSelfServices = () => {

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
  

  return (
    <MainCard title="Employee Self Services">
      <section>
<div style={{display:'flex',justifyContent:'space-between'}}>
        <h2>Performance Management</h2>
        <section className="add-new-goal-section">
        <div className="add-goal-container">
          <button
            className="add-goal-popup-button"
            onClick={() => setShowPopup(true)}
          >
            + Add Goal
          </button>
        </div>
      </section>
      </div>

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
                <strong>Goal:</strong> {item.goal}, <strong>Progress:</strong> {item.progress}
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

    </MainCard>
  );
};

export default EmployeeSelfServices;
