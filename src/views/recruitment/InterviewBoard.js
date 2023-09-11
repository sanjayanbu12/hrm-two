import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Card, CardContent, CardHeader, Menu, MenuItem, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Feedback, Forward, MoreVert, TextSnippet } from '@mui/icons-material';

const InterviewBoard = () => {
  const [Adata, setAdata] = useState([]);
  const [filter, setFilter] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const allStatuses = ['Shortlist','Round 1','Round 2','Round 3', 'Selected','Hold', 'Rejected'];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/`);
      const filldata = res.data.getData;
      console.log(filldata);
      setAdata(filldata);
      console.log(res.data.getData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRec = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
      const data = res.data.getData;
      setFilter(data);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResume = async (_id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${_id}`, {
        responseType: 'arraybuffer',
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, `${name} resume.pdf`);
      console.log(_id,name+'name')
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchRec();
  }, []);

  useEffect(() => {
    const matched = [];
    Adata.forEach((data) => {
      const matchingRole = filter.find((role) => role.Jobrole.toLowerCase() === data.position.toLowerCase());
      if (matchingRole) {
        const a = matchingRole.Skills;
        const b = data.skills;
        const aSkills = a[0].split(',').map((skill) => skill.trim());
        const bSkills = b[0].split(',').map((skill) => skill.trim());
        const commonSkills = aSkills.filter((skill) => bSkills.includes(skill));
        if (commonSkills.length > 0) {
          matched.push({
            _id: data._id,
            Name: data.name,
            Jobrole: data.position,
            MobileNo: data.phone,
            Email: data.email,
            Resume: data.resume,
            Photo: data.photo,
            AppliedAt: data.appliedAt,
            Status: data.Status=="null"?"Shortlist":data.Status,
            Qualification: data.department,
            YearOfPassing: data.graduationYear,
            Skills: data.skills,
            Experience: data.experience,
            College: data.college,
            sslc: data.sslc,
            hsc: data.hsc,
          });
        }
      }
    });
    setMatchedResults(matched);
  }, [Adata, filter]);

  console.log('fff', matchedResults);
  

  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;
    const updatedResults = Array.from(matchedResults);
    const [reorderedItem] = updatedResults.splice(source.index, 1);
    updatedResults.splice(destination.index, 0, reorderedItem);
    const newStatus = destination.droppableId;

    const updatedItem = updatedResults.find((item) => item._id.toString() === draggableId);

    if (updatedItem) {
      updatedItem.Status = newStatus;
      try {
        await axios.put(`https://hrm-backend-square.onrender.com/ats/updateats/${updatedItem._id}`, {
          _id: updatedItem._id,
          Status: newStatus,
        });
        console.log('Status updated successfully.');
      } catch (err) {
        console.log(err);
      }
      setMatchedResults(updatedResults);
    }
  };
  
  return (
    <MainCard title="Interview Board" sx={{ width: '100%', height: 'auto', minHeight: '480px' }}>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {allStatuses.map((title, columnIndex) => {
            const columnResults = matchedResults.filter((x) => x.Status === title);
            return (
              <div key={title} style={{ flex: '0 0 auto', marginRight: '20px',marginBottom:'60px'}}>
                <Paper elevation={3} sx={{ padding: '16px' }}>
                  <CardHeader
                    title={title}
                    sx={{
                      color: '#00695f',
                      marginBottom:'-30px',
                      marginTop: '-20px',
                      height: '10px',
                      minWidth: '100px',
                      maxWidth: '150px',
                    }}
                  />
                  <Droppable droppableId={title} index={columnIndex}>
                    {(provided, snapshot) => (
                      <CardContent 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'white',
                        }}
                      >
                        {columnResults.map((x, index) => (
                          <Draggable key={x._id} draggableId={x._id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={x._id}
                                sx={{
                                  marginTop: '10px',
                                  padding: '10px',
                                  border: '1px solid #ddd',
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                  backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                }}
                              >
                                 <div style={{display:'flex',alignItems:'end',justifyContent:'flex-end'}}>
                                <MoreVert sx={{fontSize:'15px',cursor:'pointer'}} onClick={handleOpenMenu}/>
                                <Menu
                                 anchorEl={anchorEl}
                                 open={Boolean(anchorEl)}
                                 onClose={handleCloseMenu}
                                >
                               <MenuItem onClick={handleCloseMenu}><Feedback sx={{marginRight:'10px'}}/> Feedback</MenuItem>
                               <MenuItem onClick={() => handleResume(x._id, x.Name)}><TextSnippet sx={{marginRight:'10px'}}/>View Resume</MenuItem>
                               <MenuItem onClick={handleCloseMenu}><Forward sx={{marginRight:'10px'}}/> Send Mail</MenuItem>
                               </Menu>
                                </div>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  {x.Name}
                                </Typography>
                                <Typography variant="body2">{x.Jobrole}</Typography>
                                <Typography variant="body2"><b>Qualification:</b>{x.Qualification}</Typography>
                                <Typography variant="body2"><b>Skills:</b>{x.Skills}</Typography>
                                <div style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                <Avatar sx={{fontSize:'15px',fontWeight:'Bold',height:'25px',width:'25px'}} >{x.Name[0]}</Avatar>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </CardContent>
                    )}
                  </Droppable>
                </Paper>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </MainCard>
  );
};

export default InterviewBoard;
