import Card from '@mui/material/Card';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import { MapInteractionCSS } from 'react-map-interaction';
import { useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
const OrgTree = () => {
  const [loader, setLoaderStatus] = useState(true);
  const [orgMems, setorgMems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrgData();
  }, []);
  const fetchOrgData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/org/getorgs');
      setorgMems(response.data.orgData);
      console.log(orgMems);
      setLoaderStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MapInteractionCSS>
      <div>
        {!loader ? (
          <Tree
            lineWidth={'2px'}
            lineColor={'#F94C10'}
            lineHeight="80px"
            lineBorderRadius={'10px'}
            label={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {orgMems ? (
                  
                    <Card
                      onClick={() => navigate('/managerapproval')}
                      style={{
                        width: '278px',
                        height: '81px',
                        backgroundColor: ' #EFE1FB',
                        display:'flex',
                        alignItems:'center',
                        paddingLeft:'13px',
                        paddingRight:'21px'
                      }}
                    >
                      <Container style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}} disableGutters={true}>
                        <div >
                          <Avatar sx={{ bgcolor: deepOrange[500],color:'#fff',}}>
                          H
                          </Avatar>
                          </div>
                          <div  >
                             <Typography variant='h3' fontSize={'18px'}>
                               Ajay
                             </Typography>
                             <Typography variant='body2'>
                               WebDeveloper
                             </Typography>
                          </div>
                          <div>
                            <IconButton>
                              <ChevronRightIcon />
                            </IconButton>
                          </div>
                      </Container>
                    </Card>
                  
                ) : (
                  <Container>
                    <Card
                      onClick={() => navigate('/managerapproval')}
                      style={{
                        width: '278px',
                        height: '81px',
                        backgroundColor: ' #EFE1FB',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                    >
                      <Button variant="text" sx={{color:'black',height:'73px',width:'21px',fontSize:'18px'}} startIcon={<AddIcon />}>
                        Add
                      </Button>
                    </Card>
                  </Container>
                )}
              </div>
            }
          >
            <TreeNode
              label={
                <Card style={{
                  width: '278px',
                  height: '81px',
                  backgroundColor: ' #E1EAFB',
                  display:'flex',
                  alignItems:'center',
                  paddingLeft:'13px',
                  paddingRight:'21px'
                }} 
                onClick={() => navigate('/hrapproval')}>
                 <Container style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}} disableGutters={true}>
                        <div >
                          <Avatar sx={{ bgcolor: deepOrange[500],color:'#fff',}}>
                          H
                          </Avatar>
                          </div>
                          <div  >
                             <Typography variant='h3' fontSize={'18px'}>
                               Kannan
                             </Typography>
                             <Typography variant='body2'>
                               Backend Dev 
                             </Typography>
                          </div>
                          <div>
                            <IconButton>
                              <ChevronRightIcon />
                            </IconButton>
                          </div>
                      </Container>
                          </Card>
              }
            ></TreeNode>
            <TreeNode
              label={
                <Card style={{
                  width: '278px',
                  height: '81px',
                  backgroundColor: ' #E1EAFB',
                  display:'flex',
                  alignItems:'center',
                  paddingLeft:'13px',
                  paddingRight:'21px'
                }} 
                onClick={() => navigate('/hrapproval')}>
                 <Container style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}} disableGutters={true}>
                        <div >
                          <Avatar sx={{ bgcolor: deepOrange[500],color:'#fff',}}>
                          H
                          </Avatar>
                          </div>
                          <div  >
                             <Typography variant='h3' fontSize={'18px'}>
                               Sanjay 
                             </Typography>
                             <Typography variant='body2'>
                               Front End dev
                             </Typography>
                          </div>
                          <div>
                            <IconButton>
                              <ChevronRightIcon />
                            </IconButton>
                          </div>
                      </Container>
          
                </Card>
              }
            >
            </TreeNode>
        
          </Tree>

        ) : (
          <CircularProgress sx={{ width: '100%', height: 'auto', position: 'absolute', top: '270px', left: '450px' }}></CircularProgress>
        )}
      </div>
    </MapInteractionCSS>
  );
};

export default OrgTree;
