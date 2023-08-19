import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
const OrgTree = () => {
  const [edata, setedata] = useState('');
  useEffect(() => {
    fetchEmployees();
    // console.log(edata);
  }, []);
  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
    setedata(res.data.reverse());
  };
  const limitedData = edata.slice(0, 4);

  return (
    <>
      <Tree lineWidth={'2px'} lineColor={'green'} lineHeight='80px' lineBorderRadius={'10px'} label={
        <div style={{display:'flex',justifyContent:'center'}}>
        <Card style={{ minWidth: 275 , height: '10em' ,background: '#DBC4F0',display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'
          }}>
        <CardHeader 
        title={'John Doe'}
        style={{ padding: '0px'}}
        />
         <CardContent  style={{ padding: '0px'}}>
        <Typography  >
           Web Dept
        </Typography>
        <Typography  >
           Manager
        </Typography>
      </CardContent>
        </Card>
        </div>
      }>
        {limitedData &&
          limitedData.map((data) => (
            <TreeNode key={data._id} label={<Card>{data.name}</Card>}>
              <TreeNode label={<Card>{data.dept}</Card>} />
              <TreeNode label={<Card>{data.report}</Card>} />
            </TreeNode>
          ))}
      </Tree>
    </>
  );
};

export default OrgTree;
