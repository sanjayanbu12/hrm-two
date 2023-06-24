import { TextField } from '@mui/material';
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const EmployeePerformance = () => {
  const [performanceRating, setPerformanceRating] = useState();
  const [quality, setQuality] = useState();
  const [quantity, setQuantity] = useState();
  const [jobknowledge, setJobknowledge] = useState();
  const [relationships, setRelationships] = useState();
  const [comments, setComments] = useState('');

  const handleRatingChange = (event) => {
    setPerformanceRating(Number(event.target.value));
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };
  const handleQualityChange = (event) => {
    setQuality(Number(event.target.value));
  };
  const handleJobknowledgeChange = (event) => {
    setJobknowledge(Number(event.target.value));
  };
  const handleRelationshipsChange = (event) => {
    setRelationships(Number(event.target.value));
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPerformanceRating(0);
    setQuantity(0);
    setComments('');
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '20px',
    margin: '0px',
    maxWidth: '100%',
  };

  const inputStyle = {
    marginBottom: '0px',
    padding: '5px',
    fontSize: '16px',
    width: '100%',
  };

  const buttonStyle = {
    gridColumn: '1 / span 2',
    backgroundColor: 'rgba(103, 58, 183, 0.85)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '10px',
    cursor: 'pointer',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const indicatorStyle = {
    marginRight: '5px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  };

  const renderIndicator = (color) => {
    return <div style={{ ...indicatorStyle, background: color }} />;
  };

  return (
    
    <MainCard title="Employee Performance">
      <div style={formStyle} >
        <MainCard title="Performance Rating">
          <form onSubmit={handleSubmit}>
            <div style={labelStyle}>
              {renderIndicator('yellow')}
              Performance Rating:Overall
            </div>
            <TextField
              type="number"
              id="performanceRating"
              value={performanceRating}
              onChange={handleRatingChange}
          
              max={10}
              style={inputStyle}
            />
          </form>
        </MainCard>

        <MainCard title="Time Management">
          <form onSubmit={handleSubmit}>
            <div style={labelStyle}>
              {renderIndicator('green')}
              Quantity of Work-Time Management:
            </div>
            <TextField
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            
              style={inputStyle}
            />
          </form>
        </MainCard>

        <MainCard title="Quality of Work">
          <form onSubmit={handleSubmit}>
            <div style={labelStyle}>
              {renderIndicator('orange')}
              Quality of Work- Accuracy:
            </div>
            <TextField
              type="number"
              id="quality"
              value={quality}
              onChange={handleQualityChange}

              style={inputStyle}
            />
          </form>
        </MainCard>

        <MainCard title="Job Knowledge">
          <form onSubmit={handleSubmit}>
            <div style={labelStyle}>
              {renderIndicator('purple')}
              Job Knowledge-Skills and Understanding of Work:
            </div>
            <TextField
              type="number"
              id="jobknowledge"
              value={jobknowledge}
              onChange={handleJobknowledgeChange}
              
              style={inputStyle}
            />
          </form>
        </MainCard>

        <MainCard title="Working Relationships">
          <form onSubmit={handleSubmit}>
            <div style={labelStyle}>
              {renderIndicator('pink')}
              Working Relationships-Ability to work with others:
            </div>
            <TextField
             type="number"
             id="relationships"
             value={relationships}
             onChange={handleRelationshipsChange}
             
             style={inputStyle}>
             
              </TextField>
          </form>
        </MainCard>

        <MainCard title="Comments">
          <form onSubmit={handleSubmit} style={{ gridColumn: '1 / span 2' }}>
            <label htmlFor="comments" style={labelStyle}>
              Comments:
            </label>
            <TextField
             id="comments"
             value={comments}
             onChange={handleCommentsChange}
             style={inputStyle}
             >
             
              </TextField>
            <button type="submit" style={buttonStyle}>
              SUBMIT
            </button>
          </form>
        </MainCard>
      </div>
    </MainCard>
  );
};

export default EmployeePerformance;
