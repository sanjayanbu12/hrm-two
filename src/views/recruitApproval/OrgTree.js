import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import { MapInteractionCSS } from 'react-map-interaction';
import { useNavigate } from 'react-router';
const OrgTree = () => {
  const [managerName, setManagerName] = useState([]);
  const [hrData, setHrdata] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      const employees = response.data.reverse(); // Reverse the data if needed
      const manager = employees.filter((data) => data.approval.manager === true);
      setManagerName(manager);
      const hr = employees.filter((data) => data.approval.hr === true);
      setHrdata(hr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MapInteractionCSS>
        <Tree
          lineWidth={'2px'}
          lineColor={'#F94C10'}
          lineHeight="80px"
          lineBorderRadius={'10px'}
          label={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                onClick={()=>navigate('/managerapproval')}
                style={{
                  minWidth: 275,
                  height: '10em',
                  background: '#DBC4F0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                    }}
              >
                <CardHeader title={managerName.map((data) => data.name)} style={{ padding: '0px' }} />
                            
                <CardContent style={{ padding: '0px' }}>
                  <Typography>
                    Web Dept
                  </Typography>
                  <Typography>Manager</Typography>
                </CardContent>
              </Card>
            </div>
          }
        >
          {hrData &&
            hrData.map((data) => (
              <TreeNode
                key={data._id}
                label={
                  <Card
                  onClick={()=>navigate('/hrapproval')}
                    style={{
                      background: '#78C1F3',
                      minWidth: 150,
                      height: '10em',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap:'wrap',
                      padding:'10px'
                    }}
                  >
                    {data.name}
                  </Card>
                }
              >

              </TreeNode>
            ))}
        </Tree>
      </MapInteractionCSS>
    </>
  );
};

export default OrgTree;
