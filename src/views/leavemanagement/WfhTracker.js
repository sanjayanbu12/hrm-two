import React, { useState, useEffect } from 'react';

const WFHTracker = () => {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const storedEntries = localStorage.getItem('wfhEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wfhEntries', JSON.stringify(entries));
    setTotalHours(calculateTotalHours());
  }, [entries]);

  const logEntry = () => {
    if (date && hoursWorked) {
      const entry = { date, hoursWorked: parseFloat(hoursWorked) };
      setEntries([...entries, entry]);
      setDate('');
      setHoursWorked('');
    }
  };

  const calculateTotalHours = () => {
    let total = 0;
    entries.forEach((entry) => {
      total += entry.hoursWorked;
    });
    return total;
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>WFH Tracker</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logEntry();
        }}
        style={{ marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label htmlFor="date" style={{ color: '#333', marginRight: '10px' }}>
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label htmlFor="hoursWorked" style={{ color: '#333', marginRight: '10px' }}>
              Hours Worked:
            </label>
            <input
              type="number"
              id="hoursWorked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              required
              style={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Log Entry
        </button>
      </form>
      <h2 style={{ color: '#333' }}>Total Hours Worked: {totalHours}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#4caf50', color: '#fff', padding: '8px', textAlign: 'left' }}>Date</th>
            <th style={{ backgroundColor: '#4caf50', color: '#fff', padding: '8px', textAlign: 'left' }}>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td style={{ backgroundColor: '#fff', padding: '8px' }}>{entry.date}</td>
              <td style={{ backgroundColor: '#fff', padding: '8px' }}>{entry.hoursWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WFHTracker;
