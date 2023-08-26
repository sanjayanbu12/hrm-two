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
import { Autocomplete, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from 'antd';
import Modal from '@mui/material/Modal';
import MainCard from 'ui-component/cards/MainCard';
const OrgTree = () => {
  const [loader, setLoaderStatus] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [edata, setedata] = useState([]);
  const [orgMems, setorgMems] = useState([]);
  const [managerData, setmanagerData] = useState([]);
  const [autoComData, setautoComData] = useState([]);
  const [Tier2Data, setTier2Data] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrgData();
  }, [edata]);
  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const fetchOrgData = async () => {
    try {
      setLoaderStatus(false);
      const response = await axios.get('http://localhost:3001/org/getorgs');
      const orgData = response.data.orgData;
      setorgMems(orgData);
    
      const manId = orgData.map((data) => data.managerName.id);
      const manData = edata.filter((data) => data._id === manId[0]);
      setmanagerData(manData);
      const x = orgData.map((data) => data.hrName);
      const ids = x[0].map((data) => data.id);
      setTier2Data(edata.filter((data) => ids.includes(data._id)));
   
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      const employees = response.data;
      setedata(employees);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEmp = async (data) => {
    const manData = {
      managerName: {
        name: data.name,
        id: data._id
      }
    };
    await axios.post('https://hrm-backend-square.onrender.com/org/createorg', manData);
    fetchOrgData();
  };
  const handleChange = (e, value) => {
    setautoComData(value);
    console.log(autoComData);
  };
  const hanldePost = async () => {
    const membersArray = autoComData.map((data) => {
      return { name: data.name, id: data._id };
    });
    const id = orgMems.map((data) => data._id);
    console.log(membersArray);
    await axios.put(`https://hrm-backend-square.onrender.com/org/updateorg/${id}`, {
      hrName: membersArray,
      managerName: managerData
    });
    fetchOrgData();
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
                {managerData.length > 0 ? (
                  managerData.map((data) => (
                    <Card
                      key={data._id}
                      onClick={() => navigate('/managerapproval')}
                      style={{
                        width: '278px',
                        height: '81px',
                        backgroundColor: ' #EFE1FB',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '13px',
                        paddingRight: '21px'
                      }}
                    >
                      <Container
                        style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                        disableGutters={true}
                      >
                        <div>
                          <Avatar sx={{ bgcolor: deepOrange[500], color: '#fff' }}>{data.name[0]}</Avatar>
                        </div>
                        <div>
                          <Typography variant="h3" fontSize={'18px'}>
                            {data.name}
                          </Typography>
                          <Typography variant="body2">{data.desi}</Typography>
                        </div>
                        <div>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Container>
                    </Card>
                  ))
                ) : (
                  <Container>
                    <Card
                      style={{
                        width: '278px',
                        height: '81px',
                        backgroundColor: ' #EFE1FB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconButton onClick={handleMenuOpen}>
                        <AddIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {edata.map((data) => (
                          <MenuItem onClick={() => handleEmp(data)} key={data._id}>
                            {data.name}
                          </MenuItem>
                        ))}

                        {/* Add more menu items as needed */}
                      </Menu>
                    </Card>
                  </Container>
                )}
              </div>
            }
          >
            {Tier2Data.map((data) => (
              <TreeNode
                key={data._id}
                label={
                  <Card
                    style={{
                      width: '278px',
                      height: '81px',
                      backgroundColor: ' #E1EAFB',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '13px',
                      paddingRight: '21px'
                    }}
                    onClick={() => navigate('/hrapproval')}
                  >
                    <Container
                      style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      disableGutters={true}
                    >
                      <div>
                        <Avatar sx={{ bgcolor: deepOrange[500], color: '#fff' }}>{data.name[0]}</Avatar>
                      </div>
                      <div>
                        <Typography variant="h3" fontSize={'18px'}>
                          {data.name}
                        </Typography>
                        <Typography variant="body2">{data.desi}</Typography>
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
            ))}

            <TreeNode
              label={
                <Card
                  style={{
                    height: '81px',
                    backgroundColor: ' #E1EAFB',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '13px',
                    paddingRight: '21px',
                    width: '100%'
                  }}
                  onClick={handleModalOpen}
                >
                  <Container
                    style={{ display: 'flex', justifyContent: 'space-between', width: '200px', alignItems: 'center', gap: '20px' }}
                    disableGutters={true}
                  >
                    <IconButton style={{height:'100vh',margin:'0 auto'}}>
                      <AddIcon />
                    </IconButton>
                    <div>
                      <Modal open={isModalOpen} onClose={handleModalClose} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height:'100vh',
                      width:'100%'
                    }}>
                      <MainCard title='Add Members' style={{width:"50%",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                      <Card  style={{width:'300px' }}>

                      
                        <Autocomplete
                          style={{}}
                          multiple
                          id="tags-outlined"
                          options={edata}
                          getOptionLabel={(option) => option.name}
                          defaultValue={[]}
                          onChange={handleChange}
                          filterSelectedOptions
                          renderInput={(params) => <TextField {...params} label="Add Employees" placeholder="Add" />}
                        />
                    
                      <div style={{ marginTop: '10px', textAlign: 'right',width:'50%' }}>
                        <Button onClick={hanldePost} style={{width:'300px'}}>Add</Button>
                      </div>
                      </Card>
                    </MainCard>
                    </Modal>
                    </div>
                  </Container>
                </Card>
              }
            />
          </Tree>
        ) : (
          <CircularProgress sx={{ width: '100%', height: 'auto', position: 'absolute', top: '270px', left: '450px' }}></CircularProgress>
        )}
      </div>
    </MapInteractionCSS>
  );
};

export default OrgTree;
