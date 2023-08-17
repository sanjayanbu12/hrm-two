import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
// import './custom-orgchart.css';
const ApprovalMems = {
  name: 'ManagerX',
  imgUrl:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80  ',
  email: 'xyz@gmail.com',
  Role: 'Manager',
  children: [
    {
      name: 'Team lead',
      imgUrl:
        'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      email: 'xyz@gmail.com',
      Role: 'TL'
    },
    {
      name: 'Senior Associate',
      imgUrl:
        'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      email: 'xyz@gmail.com',
      Role: 'TL',
      children: [
        {
          name: 'Human resource',
          imgUrl:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          email: 'xyz@gmail.com',
          Role: 'TL'
        }
      ]
    },
    {
      name: 'Buisness Analyst',
      imgUrl:
        'https://plus.unsplash.com/premium_photo-1663954645655-b5890232b10f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1434&q=80',
      email: 'xyz@gmail.com',
      Role: 'TL',
    }
  ]
};
const MyNodeComponent = ({ node }) => {
  const handleInteraction = () => {
    alert('Hi my real name is: ' + node.name);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleInteraction();
    }
  };
  return (
    <div style={{ gap: '30px' }}>
      <Card
        className="initechNode"
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        role="button" // Provide a role to indicate interactivity
        tabIndex="0"
        sx={{
          height: '190px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1em',
          marginRight: '1rem',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', marginRight: '20px' }}>
          <span>
            <Typography variant="h4">Name : </Typography>
          </span>
          <span>{node.name}</span>
        </Box>
        <Box sx={{ display: 'flex', marginRight: '20px' }}>
          <span>
            <Typography variant="h4">Email :</Typography>
          </span>
          <span>{node.email}</span>
        </Box>
        <Box sx={{ display: 'flex', marginRight: '20px' }}>
          <span>
            <Typography variant="h4">Role :</Typography>
          </span>
          <span>{node.Role}</span>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: 30,
            top: 30
          }}
        >
          <Avatar sx={{ height: '50px', width: '50px' }} alt="Remy Sharp" src={node.imgUrl} />
        </Box>
      </Card>
    </div>
  );
};
const MyApprovalList = () => {
  return <OrgChart tree={ApprovalMems} NodeComponent={MyNodeComponent} />;
};

export default MyApprovalList;
