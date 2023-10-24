import Card from '@mui/material/Card';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import { MapInteractionCSS } from 'react-map-interaction';
import { useNavigate } from 'react-router';
import { Autocomplete, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { Button } from 'antd';
import MainCard from 'ui-component/cards/MainCard';
import styled from 'styled-components';
import { StyledMainCard, StyledNode } from './Const';
import Lottie from 'react-lottie';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';
import { defaultOptions1 } from './Const';
import Fade from '@mui/material/Fade';
import {
  StyledNodeManager,
  StyledContainer,
  StyledNode3,
  StyledCard,
  StyledModal,
  StyledCardConatiner,
  Btncontainer,
  StyledNode2,
  LoaderStyle
} from './Const';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
const OrgTree = () => {
  const [loader, setLoaderStatus] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [edata, setedata] = useState([]);
  const [orgMems, setorgMems] = useState([]);
  const [managerData, setmanagerData] = useState([]);
  const [autoComData, setautoComData] = useState([]);
  const [Tier2Data, setTier2Data] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
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
      const response = await axios.get('https://pulsehr-express-server.onrender.com/org/getorg');
      const orgData = response.data.orgData;
      setorgMems(orgData);
      if (orgData) {
        const manId = orgData?.map((data) => data?.managerName?.id);
        const manData = edata?.filter((data) => data?._id === manId[0]);
        setmanagerData(manData);
        const x = orgData?.map((data) => data?.hrName);
        const ids = x[0]?.map((data) => data?.id);
        setTier2Data(edata?.filter((data) => ids?.includes(data?._id)));
      }

      setLoaderStatus(false);
    } catch (error) {
      console.log(error);
      setLoaderStatus(false);
    }
  };
  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('https://pulsehr-express-server.onrender.com/api/allemployee');
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
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEmp = async (data) => {
    try {
      const manData = {
        managerName: {
          name: data.name,
          id: data._id
        }
      };
      // const id = orgMems.map((data) => data._id);
      await axios.post(`https://pulsehr-express-server.onrender.com/org/createorg`, manData);
      await axios.put(`https://pulsehr-express-server.onrender.com/api/updateemployee/${data._id}`, { isTopTier: true });
      fetchOrgData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e, value) => {
    setautoComData(value);
  };
  const hanldePost = async () => {
    const membersArray = autoComData.map((data) => {
      return { name: data.name, id: data._id, employeeId: data.employeeid };
    });
    const id = orgMems.map((data) => data._id);
    await axios.put(`https://pulsehr-express-server.onrender.com/org/updateorg/${id}`, {
      hrName: membersArray,
      managerName: managerData
    });
    handleModalClose();
    fetchOrgData();
  };
  const handleDeleteMan = async (dta) => {
    try {
      const orgId = orgMems.map((data) => data._id);
      const employeeIdsToDelete = dta.employeeid;
      const foundEmployees = orgMems.map((org) => org.hrName.filter((emp) => employeeIdsToDelete.includes(emp.employeeId))).flat();
      const idToDel = foundEmployees.map((empid) => empid._id);
      await axios.delete(`https://pulsehr-express-server.onrender.com/org/deleteorg/${orgId}/${idToDel}`);
      fetchOrgData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteWithConfirmation = (data) => {
    Swal.fire({
      title: 'Are you sure you want to delete ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteMan(data);
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      }
    });
  };
  const handleDeleteWithConfirmationTop = () => {
    Swal.fire({
      title: 'Are you sure you want to delete ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handledeltop();
        await fetchOrgData();
        navigate('/payroll');
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      }
    });
  };
  const handledeltop = async () => {
    const orgId = orgMems.map((data) => data._id);
    await axios.delete(`https://pulsehr-express-server.onrender.com/org/deleteorg/${orgId}/toptier`);
  };

  return (
    <>
      <MainCard title="ORGANIZATON CHART">
        <StyledCardConatiner>
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
                          <StyledNodeManager key={data._id} raised={true}>
                            <StyledContainer disableGutters={true}>
                              <div>
                                <StyledAvatar sx={{ bgcolor: deepOrange[500], color: '#fff' }}>{data.name[0].toUpperCase()}</StyledAvatar>
                              </div>
                              <div>
                                <Typography color="#ffff" variant="h3" fontSize={'18px'}>
                                  {data.name}
                                </Typography>
                                <Typography color="#ffff" variant="body2">
                                  {data.desi}
                                </Typography>
                              </div>
                              <div>
                                {data.employeeid === authId && (
                                  <div>
                                    <IconButton
                                      sx={{ color: '#fff' }}
                                      aria-label="ellipsis"
                                      aria-controls="menu"
                                      aria-haspopup="true"
                                      onClick={handleClick}
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu id="menu" anchorEl={anchorEl1} open={Boolean(anchorEl1)} onClose={handleClose}>
                                      <MenuItem onClick={handleClose}>
                                        <IconButton>
                                          <Tooltip
                                            title="View"
                                            placement="right-start"
                                            arrow
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 600 }}
                                          >
                                            <RemoveRedEyeOutlinedIcon onClick={() => navigate(`/managerapproval/${data.employeeid}`)} />
                                          </Tooltip>
                                        </IconButton>
                                      </MenuItem>
                                      <MenuItem sx={{ height: '25px', width: '20px' }} onClick={handleClose}>
                                        <IconButton>
                                          <Tooltip
                                            title="Remove"
                                            placement="right-start"
                                            arrow
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 600 }}
                                          >
                                            <GroupRemoveOutlinedIcon onClick={() => handleDeleteWithConfirmationTop()} />
                                          </Tooltip>
                                        </IconButton>
                                      </MenuItem>
                                    </Menu>
                                  </div>
                                )}
                              </div>
                            </StyledContainer>
                          </StyledNodeManager>
                        ))
                      ) : (
                        <Btncontainer>
                          <>
                            <IconButton onClick={handleMenuOpen}>
                              <AddIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                              {edata.map((data) => (
                                <MenuItem onClick={() => handleEmp(data)} key={data._id}>
                                  {data.name}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        </Btncontainer>
                      )}
                    </div>
                  }
                >
                  {Tier2Data.map((data) => (
                    <TreeNode
                      key={data._id}
                      label={
                        <StyledNode raised={true}>
                          <StyledContainer disableGutters={true}>
                            <div>
                              <StyledAvatar>{data.name[0].toUpperCase()}</StyledAvatar>
                            </div>
                            <div>
                              <Typography variant="h3" color={'#fff'} fontSize={'18px'}>
                                {data.name}
                              </Typography>
                              <Typography variant="body2" color={'#fff'}>
                                {data.desi}
                              </Typography>
                            </div>
                            <div>
                              {data.employeeid === authId && (
                                <div>
                                  <IconButton
                                    sx={{ color: '#fff' }}
                                    aria-label="ellipsis"
                                    aria-controls="menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu id="menu" anchorEl={anchorEl1} open={Boolean(anchorEl1)} onClose={handleClose}>
                                    <MenuItem onClick={handleClose}>
                                      <IconButton>
                                        <Tooltip
                                          title="View"
                                          placement="right-start"
                                          arrow
                                          TransitionComponent={Fade}
                                          TransitionProps={{ timeout: 600 }}
                                        >
                                          <RemoveRedEyeOutlinedIcon onClick={() => navigate(`/hrapproval/${data.employeeid}`)} />
                                        </Tooltip>
                                      </IconButton>
                                    </MenuItem>
                                    <MenuItem sx={{ height: '25px', width: '20px' }} onClick={handleClose}>
                                      <IconButton>
                                        <Tooltip
                                          title="Remove"
                                          placement="right-start"
                                          arrow
                                          TransitionComponent={Fade}
                                          TransitionProps={{ timeout: 600 }}
                                        >
                                          <GroupRemoveOutlinedIcon onClick={() => handleDeleteWithConfirmation(data)} />
                                        </Tooltip>
                                      </IconButton>
                                    </MenuItem>
                                  </Menu>
                                </div>
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
                              <StyledNode2 raised={true}>
                                <StyledContainer disableGutters={true}>
                                  <div>
                                    <StyledAvatar>{x.name[0].toUpperCase()}</StyledAvatar>
                                  </div>
                                  <div>
                                    <Typography variant="h3" color={'#fff'} fontSize={'18px'}>
                                      {x.name}
                                    </Typography>
                                    <Typography variant="body2" color={'#fff'}>
                                      {x.desi}
                                    </Typography>
                                  </div>
                                  <div>
                                    {data.employeeid === authId && (
                                      <IconButton style={{ display: 'none' }}>
                                        <ChevronRightIcon />
                                      </IconButton>
                                    )}
                                  </div>
                                </StyledContainer>
                              </StyledNode2>
                            }
                          >
                            {edata
                              .filter((tier2) => x.report?.some((reportItem) => reportItem.id === tier2._id))
                              .map((y) => (
                                <TreeNode
                                  key={y._id}
                                  label={
                                    <StyledNode3 raised={true}>
                                      <StyledContainer disableGutters={true}>
                                        <div>
                                          <StyledAvatar style={{ color: '#fff' }}>{y.name[0].toUpperCase()}</StyledAvatar>
                                        </div>
                                        <div>
                                          <Typography style={{ color: '#fff' }} variant="h3" fontSize={'18px'}>
                                            {y.name}
                                          </Typography>
                                          <Typography style={{ color: '#fff' }} variant="body2">
                                            {y.desi}
                                          </Typography>
                                        </div>
                                        <div>
                                          {data.employeeid === authId && (
                                            <IconButton>
                                              <ChevronRightIcon />
                                            </IconButton>
                                          )}
                                        </div>
                                      </StyledContainer>
                                    </StyledNode3>
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
                <LoaderStyle>
                  <Lottie options={defaultOptions1} height={100} width={100} />
                </LoaderStyle>
              )}
            </div>
          </MapInteractionCSS>
        </StyledCardConatiner>
      </MainCard>

      <StyledModal open={isModalOpen} onClose={handleModalClose}>
        <StyledMainCard
          title="Add Members"
          style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Card style={{ width: '300px' }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={edata.filter(
                (option) =>
                  !managerData.some((data) => data._id === option._id) &&
                  !Tier2Data.some((tierMem) => tierMem._id === option._id) &&
                  Tier2Data.map((item) => item.report) &&
                  option.isReported === false
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
        </StyledMainCard>
      </StyledModal>
    </>
  );
};

export default OrgTree;
