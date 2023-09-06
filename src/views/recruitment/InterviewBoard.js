import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Card, CardContent, CardHeader, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const InterviewBoard = () => {
  const [Adata, setAdata] = useState([]);
  const [filter, setFilter] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const allStatuses = ['Shortlist', 'Selected', 'Rejected'];

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
            Status: data.Status,
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

  const handleDragEnd = async (result, _id) => {
    if (!result.destination) {
      return;
    }

    const updatedResults = Array.from(matchedResults);
    const [reorderedItem] = updatedResults.splice(result.source.index, 1);
    updatedResults.splice(result.destination.index, 0, reorderedItem);
    const newStatus = result.destination.droppableId;
    reorderedItem.Status = newStatus;
    setMatchedResults(updatedResults);
    try {
      await axios.put(`https://hrm-backend-square.onrender.com/ats/updateats/${_id}`, {
        _id: reorderedItem._id,
        Status: newStatus,
      });
      console.log('Status updated successfully.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainCard title="Interview Board" sx={{ width: '100%', height: 'auto' }}>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {allStatuses.map((title, columnIndex) => {
            const columnResults = matchedResults.filter((x) => x.Status == title);
            return (
              <div key={title} style={{ flex: '0 0 auto', marginRight: '20px', marginBottom: '50px' }}>
                <Paper elevation={3} sx={{ padding: '16px' }}>
                  <CardHeader
                    title={title}
                    sx={{
                      color: '#00695f',
                      marginBottom: '-30px',
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
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  {x.Name}
                                </Typography>
                                <Typography variant="body2">{x.Jobrole}</Typography>
                                <Typography variant="body2">{x.Qualification}</Typography>
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