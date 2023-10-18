import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import {Card } from '@mui/material';

export const options = {
  title: "",
  is3D: true,
};
 

const Apexchart = () => {
  const [designationsData, setDesignationsData] = useState([]);

  useEffect(() => {
    fetch("https://hrm-backend-square.onrender.com/api/allemployee")
      .then((response) => response.json())
      .then((data) => {
        const designations = data.map((employee) => employee.desi);
        console.log("desi",designations)
        const designationCounts = countDesignations(designations);
        const chartData = convertToChartData(designationCounts);
        setDesignationsData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
    const chartData = [["Designation", "Total employees in Designation"]];
    for (const designation in designationCounts) {
      chartData.push([designation, designationCounts[designation]]);
    }
    return chartData;
  };

  return (
    <Card elevation={2}>
    <Chart
      style={{marginLeft:'0px'}}
      chartType="PieChart"
      data={designationsData}
      options={options}
      width={"100%"}
      height={"300px"}
    />
    </Card>
  );
};

export default Apexchart;
