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
import { Autocomplete, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from 'antd';
import MainCard from 'ui-component/cards/MainCard';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import styled from 'styled-components';
import { StyledNode } from './Const';
import { StyledNodeManager, StyledContainer, StyledCard,StyledModal} from './Const';
import { useSelector } from 'react-redux';
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
  const authId = useSelector((state) => state.customization.authId);
  const StyledAvatar = styled(Avatar)`
    && {
      background-color: ${deepOrange[500]};
      color: #fff;
    }
  `;
  const fetchOrgData = async () => {
    try {
      setLoaderStatus(false);
      const response = await axios.get('https://hrm-backend-square.onrender.com/org/getorg');
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
    await axios.post('http://localhost:3001/org/createorg', manData);
    fetchOrgData();
  };
  const handleChange = (e, value) => {
    setautoComData(value);
  };
  const hanldePost = async () => {
    const membersArray = autoComData.map((data) => {
      return { name: data.name, id: data._id, employeeId: data.employeeid };
    });
    const id = orgMems.map((data) => data._id);
    console.log(membersArray);
    await axios.put(`https://hrm-backend-square.onrender.com/org/updateorg/${id}`, {
      hrName: membersArray,
      managerName: managerData
    });
    handleModalClose();
    fetchOrgData();
  };
  const handleDeleteMan = async () => {
    const id = orgMems.map((data) => data._id);
    await axios.delete(`http://localhost:3001/org/deleteorg/${id}`);
    fetchOrgData();
  };
  return (
    <>
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
                      <StyledNodeManager key={data._id}>
                        <StyledContainer disableGutters={true}>
                          <div>
                            <StyledAvatar sx={{ bgcolor: deepOrange[500], color: '#fff' }}>{data.name[0].toUpperCase()}</StyledAvatar>
                          </div>
                          <div>
                            <Typography variant="h3" fontSize={'18px'}>
                              {data.name}
                            </Typography>
                            <Typography variant="body2">{data.desi}</Typography>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Tooltip title="View">
                              <IconButton onClick={() => navigate(`/managerapproval/${data.employeeid}`)}>
                                <ChevronRightIcon />
                              </IconButton>
                            </Tooltip>
                            <IconButton onClick={handleDeleteMan}>
                              <PersonRemoveIcon />
                            </IconButton>
                          </div>
                        </StyledContainer>
                      </StyledNodeManager>
                    ))
                  ) : (
                    <Container>
                      <Card>
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
                    <StyledNode>
                      <StyledContainer disableGutters={true}>
                        <div>
                          <StyledAvatar>{data.name[0].toUpperCase()}</StyledAvatar>
                        </div>
                        <div>
                          <Typography variant="h3" fontSize={'18px'}>
                            {data.name}
                          </Typography>
                          <Typography variant="body2">{data.desi}</Typography>
                        </div>
                        <div>
                          {data.employeeid === authId && (
                            <Tooltip title="view">
                              <IconButton onClick={() => navigate(`/hrapproval/${data.employeeid}`)}>
                                <ChevronRightIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      </StyledContainer>
                    </StyledNode>
                  }
                >
                  {edata
                    .filter((item) => data.report && data.report.some((reportItem) => reportItem?.id === item._id))
                    .map((x) => (
                      <TreeNode
                        key={x._id}
                        label={
                          <StyledNode>
                            <StyledContainer
                              disableGutters={true}
                            >
                              <div>
                                <StyledAvatar>{x.name[0].toUpperCase()}</StyledAvatar>
                              </div>
                              <div>
                                <Typography variant="h3" fontSize={'18px'}>
                                  {x.name}
                                </Typography>
                                <Typography variant="body2">{x.desi}</Typography>
                              </div>
                              <div>
                                {data.employeeid === authId && (
                                  <IconButton style={{ display: 'none' }}>
                                    <ChevronRightIcon />
                                  </IconButton>
                                )}
                              </div>
                            </StyledContainer>
                          </StyledNode>
                        }
                      >
                        {edata
                          .filter((tier2) => x.report?.some((reportItem) => reportItem.id === tier2._id))
                          .map((y) => (
                            <TreeNode
                              key={y._id}
                              label={
                                <StyledNode>
                                  <StyledContainer
                                    
                                    disableGutters={true}
                                  >
                                    <div>
                                      <StyledAvatar>{y.name[0].toUpperCase()}</StyledAvatar>
                                    </div>
                                    <div>
                                      <Typography variant="h3" fontSize={'18px'}>
                                        {y.name}
                                      </Typography>
                                      <Typography variant="body2">{y.desi}</Typography>
                                    </div>
                                    <div>
                                      {data.employeeid === authId && (
                                        <IconButton>
                                          <ChevronRightIcon />
                                        </IconButton>
                                      )}
                                    </div>
                                  </StyledContainer>
                                </StyledNode>
                              }
                            />
                          ))}
                      </TreeNode>
                    ))}
                </TreeNode>
              ))}

              <TreeNode
                label={
                  <StyledCard onClick={handleModalOpen}>
                    <StyledContainer disableGutters={true}>
                      <IconButton style={{ height: '100vh', margin: '0 auto' }}>
                        <AddIcon />
                      </IconButton>
                    </StyledContainer>
                  </StyledCard>
                }
              />
            </Tree>
          ) : (
            <CircularProgress sx={{ width: '100%', height: 'auto', position: 'absolute', top: '270px', left: '450px' }}></CircularProgress>
          )}
        </div>
      </MapInteractionCSS>

      <StyledModal
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <MainCard
          title="Add Members"
          style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Card style={{ width: '300px' }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={edata.filter(
                (option) => !managerData.some((data) => data._id === option._id) && !Tier2Data.some((tierMem) => tierMem._id === option._id)
              )}
              getOptionLabel={(option) => option.name}
              defaultValue={[]}
              onChange={handleChange}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Add Employees" placeholder="Add" />}
            />

            <div style={{ marginTop: '10px', textAlign: 'right', width: '50%' }}>
              <Button onClick={hanldePost} style={{ width: '300px' }}>
                Add
              </Button>
            </div>
          </Card>
        </MainCard>
      </StyledModal>
    </>
  );
};

export default OrgTree;
