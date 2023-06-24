import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const EmployeePerformance = () => {
  const [performanceRating, setPerformanceRating] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [comments, setComments] = useState('');

  const handleRatingChange = (event) => {
    setPerformanceRating(Number(event.target.value));
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the performance data (e.g., send it to a server)
    setPerformanceRating(0);
    setQuantity(0);
    setComments('');
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
    margin: '20px',
    maxWidth: '600px',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
    width: '100%',
  };

  const buttonStyle = {
    gridColumn: '1 / span 2',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <MainCard title="Employee Information">
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="performanceRating" style={{ marginBottom: '5px' }}>
            Performance Rating:
          </label>
          <input
            type="number"
            id="performanceRating"
            value={performanceRating}
            onChange={handleRatingChange}
            min={0}
            max={10}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="quantity" style={{ marginBottom: '5px' }}>
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min={0}
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label htmlFor="comments" style={{ marginBottom: '5px' }}>
            Comments:
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={handleCommentsChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </MainCard>
  );
};

export default EmployeePerformance;
 