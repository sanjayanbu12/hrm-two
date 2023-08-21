import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { MapInteractionCSS } from 'react-map-interaction';
import { useSelector } from 'react-redux';
const OrgTree = () => {
  const [edata, setedata] = useState('');
  const employees=useSelector(state=>state.customization.employees)
    const manager=employees.filter(data=>data.approval.manager===true)
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = async () => {
    setedata(employees.reverse());
  };
  const limitedData = edata.slice(0, 3);
  console.log(limitedData);

  return (
    <>
    <MapInteractionCSS>
      <Tree lineWidth={'2px'} lineColor={'green'} lineHeight='80px' lineBorderRadius={'10px'} label={
        <div style={{display:'flex',justifyContent:'center'}}>
        <Card style={{ minWidth: 275 , height: '10em' ,background: '#DBC4F0',display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'
          }}>
        <CardHeader 
        title={manager.map(name=>name.name)}
        style={{ padding: '0px'}}
        />
         <CardContent  style={{ padding: '0px'}}>
        <Typography 
        >
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
            <TreeNode key={data._id} label={<Card 
            style={{
              background:'#78C1F3',
              minWidth: 100 ,
               height: '10em' ,
               display:'flex',
               justifyContent:'center',
               alignItems:'center'
  
            }}
            >{data.name}
            </Card>}>
              <TreeNode label={<Card
               style={{
                background:'#78C1F3',
                minWidth: 275 ,
                 height: '10em' ,
                 display:'flex',
                 justifyContent:'center',
                 alignItems:'center'
    
              }}
              >{data.dept}</Card>} />
              {/* <TreeNode label={<Card
               style={{
              background:'#78C1F3',
              minWidth: 275 ,
               height: '10em' ,
               display:'flex',
               justifyContent:'center',
               alignItems:'center'
  
            }}>{data.report}</Card>} /> */}
            </TreeNode>
          ))}
      </Tree>     
    </MapInteractionCSS>
    </>
  );
};

export default OrgTree;
