import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { Card, CircularProgress } from '@mui/material';

export const options = {
  title: '',
  is3D: true
};

const Apexchart = () => {
  const [designationsData, setDesignationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pulsehr-express-server.onrender.com/api/allemployee')
      .then((response) => response.json())
      .then((data) => {
        const designations = data.map((employee) => employee.desi);
        const designationCounts = countDesignations(designations);
        const chartData = convertToChartData(designationCounts);
        setDesignationsData(chartData);
        setLoading(false); // Set loading to false when data is available
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  const countDesignations = (designations) => {
    const counts = {};
    designations.forEach((designation) => {
      counts[designation] = (counts[designation] || 0) + 1;
    });
    return counts;
  };

  const convertToChartData = (designationCounts) => {
    const chartData = [['Designation', 'Total employees in Designation']];
    for (const designation in designationCounts) {
      chartData.push([designation, designationCounts[designation]]);
    }
    return chartData;
  };

  return (
    <Card elevation={2}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Chart
          style={{ marginLeft: '0px' }}
          chartType="PieChart"
          data={designationsData}
          options={options}
          width={'100%'}
          height={'300px'}
        />
      )}
    </Card>
  );
};

export default Apexchart;
