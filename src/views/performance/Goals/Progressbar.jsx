import React from 'react';
import { Box, Grid } from '@mui/material';
import Item from 'antd/es/list/Item';
import './Progressbar.css';

const Progressbar = ({ goal, onClick }) => {
  const { GoalT, GoalP, goaltrack } = goal;
  const statusCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0
  };
  const statusLabels = {
    0: 'ICEBOX',
    1: 'INPROGRESS',
    2: 'COMPLETED',
    3: 'BLOCKED'
  };

  goaltrack.forEach((task) => {
    const status = task.status;
    if (Object.prototype.hasOwnProperty.call(statusCount, status)) {
      statusCount[status]++;
    }
  });
  const completedCount = statusCount[2] || 0;
  const totalCount = (statusCount[0] || 0) + (statusCount[1] || 0) + (statusCount[3] || 0) + completedCount;
  let completedPercentage = 0;
  if (totalCount !== 0) {
    completedPercentage = (completedCount / totalCount) * 100;
  }




  return (
    <>
      <Box onClick={onClick} className="center">
        <div className="card green">
          <div className="additional">
            <div className="user-card"></div>
            <div className="more-info">
            <div className="stats">
            {Object.keys(statusCount).map((status) => (
  <div key={status}>
    <div className="title">{statusLabels[status]}</div>
    <div className="value">{statusCount[status]}</div>
  </div>
))}
  </div>

            </div>
          </div>
          <Grid container spacing={2} sx={{ listStyle: 'none' }}>
            <Grid item xs={9} sx={{ marginLeft: '30px' }}>
              <Item>
                <h3 style={{ marginBottom: '0px' }}>{GoalT}</h3>
              </Item>
            </Grid>
            <Grid item xs={2} sx={{}}>
              <Item>
                <h4 className="h4" style={{ marginBottom: '0px' }}>
                  {GoalP}
                </h4>
              </Item>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: '30px' }}>
              <Item>{completedPercentage}%</Item>
            </Grid>
            <Grid item xs={10} sx={{}}>
              <Item sx={{}}>
                <svg width="100%" height="15" xmlns="http://www.w3.org/2000/svg">
                  <rect y="30%" fill="#dce0e3" width="100%" height="7" strokeLinecap="round" rx="5" ry="5" />
                  <rect y="30%" fill="#92bCa6" width={`${completedPercentage}%`} height="7" strokeLinecap="round" rx="5" ry="5" />
                </svg>
              </Item>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default Progressbar;
