import React, {useState} from 'react';
import { Box, Grid, IconButton, Collapse, Menu, MenuItem } from '@mui/material';
import Item from 'antd/es/list/Item';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupSubGoal from './PopupSubGoal';
import './Progressbar.css';

const Progressbar = ({ goal, onClick, reloadGoals }) => {
  const [open, setOpen] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { GoalT, GoalP, goaltrack,_id } = goal;
  const statusCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0
  };
  const statusLabels = {
    0: 'ICEBOX',
    1: 'INPROGRESS',
    2: 'COMPLETED',
    3: 'BLOCKED'
  };

  goaltrack.forEach((task) => {
    const status = task.status;
    if (Object.prototype.hasOwnProperty.call(statusCount, status)) {
      statusCount[status]++;
    }
  });
  const completedCount = statusCount[2] || 0;
  const totalCount = (statusCount[0] || 0) + (statusCount[1] || 0) + (statusCount[3] || 0) + completedCount;
  let completedPercentage = 0;
  if (totalCount !== 0) {
    completedPercentage = (completedCount / totalCount) * 100;
  }
  const handleClick = () => {
    setOpen(!open);
  };



  const [anchorEl, setAnchorEl] = React.useState(null);
  const openmenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    if(event){
      setAnchorEl(event.currentTarget);
      
    }

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  

  return (
    <>
      <Box onClick={onClick} className="center">
        <div className="card green">
          <div className="additional">
            <div className="user-card"></div>
            <div className="more-info">
              <div className="stats">
                {Object.keys(statusCount).map((status) => (
                  <div key={status}>
                    <div className="title">{statusLabels[status]}</div>
                    <div className="value">{statusCount[status]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Grid container spacing={2} sx={{ listStyle: 'none' }}>
            <Grid item xs={8} sx={{ marginLeft: '30px' }}>
              <Item>
                <h3 style={{ marginBottom: '0px' }}>{GoalT}</h3>
              </Item>
            </Grid>
            <Grid item xs={2} style={{}}>
              <Item>
                <h4 className="h4" style={{ marginBottom: '0px' }}>
                  {GoalP}
                </h4>
              </Item>
            </Grid>
            <Grid item xs={1} style={{ paddingLeft: '0px', alignItems: 'center', zIndex: 999 }}>
              <IconButton
                sx={{ marginTop: '6px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickMenu();
                }}
                aria-label="SVG Icon Button"
              >
                <MoreVertIcon 
                aria-controls={openmenu ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openmenu ? 'true' : undefined}
                onClick={handleClickMenu}/>
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
              </IconButton>
              <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openmenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={(e) => {
                  e.stopPropagation();
                  openPopup();
                }}>Edit</MenuItem>
                {isPopupOpen && <PopupSubGoal onClose={closePopup} reloadGoals={reloadGoals} Id={_id} />}
        <MenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleClickMenu();
                }}>Add Sub-Goal</MenuItem>
                {/* {isPopupOpen && <PopupSubGoal onClose={closePopup} reloadGoals={reloadGoals} Id={_id} />} */}
      </Menu>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: '30px' }}>
              <Item>{completedPercentage}%</Item>
            </Grid>
            <Grid item xs={9} sx={{}}>
              <Item sx={{}}>
                <svg width="100%" height="15" xmlns="http://www.w3.org/2000/svg">
                  <rect y="30%" fill="#dce0e3" width="100%" height="7" strokeLinecap="round" rx="5" ry="5" />
                  <rect y="30%" fill="#92bCa6" width={`${completedPercentage}%`} height="7" strokeLinecap="round" rx="5" ry="5" />
                </svg>
              </Item>
            </Grid>
            <Grid item xs={1} style={{ padding: 0, margin: 0, zIndex: 999 }}>
              <IconButton
                sx={{}}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                aria-label="SVG Icon Button"
              >
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>

              {/* <Item></Item> */}
            </Grid>
          </Grid>
        </div>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit sx={{marginTop:"-30px", marginLeft:"40px"}}>

      <Box onClick={onClick} className="center">
     

        <div className="card green">
          <div className="additional">
            <div className="user-card"></div>
            <div className="more-info">
              <div className="stats">
                {Object.keys(statusCount).map((status) => (
                  <div key={status}>
                    <div className="title">{statusLabels[status]}</div>
                    <div className="value">{statusCount[status]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Grid container spacing={2} sx={{ listStyle: 'none' }}>
            <Grid item xs={8} sx={{ marginLeft: '30px' }}>
              <Item>
                <h3 style={{ marginBottom: '0px' }}>{GoalT}</h3>
              </Item>
            </Grid>
            <Grid item xs={2} style={{}}>
              <Item>
                <h4 className="h4" style={{ marginBottom: '0px' }}>
                  {GoalP}
                </h4>
              </Item>
            </Grid>
            <Grid item xs={1} style={{ paddingLeft: '0px', alignItems: 'center', zIndex: 999 }}>
              <IconButton
                sx={{ marginTop: '6px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                aria-label="SVG Icon Button"
              >
                <MoreVertIcon />
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
              </IconButton>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: '30px' }}>
              <Item>{completedPercentage}%</Item>
            </Grid>
            <Grid item xs={9} sx={{}}>
              <Item sx={{}}>
                <svg width="100%" height="15" xmlns="http://www.w3.org/2000/svg">
                  <rect y="30%" fill="#dce0e3" width="100%" height="7" strokeLinecap="round" rx="5" ry="5" />
                  <rect y="30%" fill="#92bCa6" width={`${completedPercentage}%`} height="7" strokeLinecap="round" rx="5" ry="5" />
                </svg>
              </Item>
            </Grid>
            <Grid item xs={1} style={{ padding: 0, margin: 0, zIndex: 999 }}>
              <IconButton
                sx={{}}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                aria-label="SVG Icon Button"
              >
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>

              {/* <Item></Item> */}
            </Grid>
          </Grid>
        </div>
      </Box>
      </Collapse>
    </>
  );
};

export default Progressbar;
