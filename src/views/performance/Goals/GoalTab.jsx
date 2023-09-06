import React from 'react';

import { Paper, Stack } from '@mui/material';
import GoalcardM from './GoalcardM';
import Item from 'antd/es/list/Item';

const GoalTab = () => {
  return (
    <Paper style={{ padding: '20px', height:"430px", maxWidth:"100%", overflow:"auto"  }}>
      <Stack display="flex" useFlexGap flexWrap="wrap" direction="row" spacing={{xs: 1, sm: 2}} sx={{listStyle:"none"}}>
        <Item>
          <GoalcardM />
        </Item>
        <Item>
          <GoalcardM />
        </Item>
      </Stack>
    </Paper>
  );
};

export default GoalTab;
