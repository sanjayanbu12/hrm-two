import React from 'react';
import { useSelector } from 'react-redux';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
const LeaveApproval = () => {
  const userId=useSelector(state=>state.customization.userId)
  console.log(userId)
  return (
    <div>
      <Card title="Leave Request" >
      <Divider />
      <Card>
        Hello
      </Card>
      </Card>
    </div>
  );
};

export default LeaveApproval;
