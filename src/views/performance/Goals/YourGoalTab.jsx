import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Grid, Card, Paper, Button } from '@mui/material';
import { EditText } from 'react-edit-text';

import PopupTask from './PopupTask';
import { useParams } from 'react-router';


const YourGoalTab = () => {
  const id = useParams();

  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [textc, setTextc] = useState([]);
  const [textd, setTextd] = useState([]);
  const [specificIdd, setSpecificIdd] = useState([]);
  const [specificIdc, setSpecificIdc] = useState([]);


  const fetchGoals = async () => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/task/getall/${id.id}`);
      setTasks(response.data.getData);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const reloadTasks = () => {
    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, [items]);
  useEffect(() => {
    // Initialize 'items' whenever 'tasks' change
    const initialItems = [
      {
        title: 'ICEBOX',
        items: []
      },
      {
        title: 'INPROGRESS',
        items: []
      },
      {
        title: 'COMPLETED',
        items: []
      },
      {
        title: 'BLOCKED',
        items: []
      },
      {
        title: 'DELETE',
        items: []
      }
    ];


    tasks.forEach((getData) => {
      if (getData.status == 0) {
        initialItems[0].items.push({ id: getData._id, content: getData.title, des: getData.description, pos: getData.position });
      } else if (getData.status == 1) {
        initialItems[1].items.push({ id: getData._id, content: getData.title, des: getData.description, pos: getData.position });
      } else if (getData.status == 2) {
        initialItems[2].items.push({ id: getData._id, content: getData.title, des: getData.description, pos: getData.position });
      } else if (getData.status == 3) {
        initialItems[3].items.push({ id: getData._id, content: getData.title, des: getData.description, pos: getData.position });
      }
    });

    setItems(initialItems);
  }, [tasks]);

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  let movedItem;
  let reorderedItem;

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // Dropped outside the list

    const sourceGroupIndex = parseInt(result.source.droppableId);
    const destinationGroupIndex = parseInt(result.destination.droppableId);

    if (sourceGroupIndex === destinationGroupIndex) {
      // Reorder items within the same group
      const newItems = [...items];
      const group = newItems[sourceGroupIndex];
      [reorderedItem] = group.items.splice(result.source.index, 1);
      group.items.splice(result.destination.index, 0, reorderedItem);
      setItems(newItems);
    } else {
      // Move items between groups
      const newItems = [...items];
      [movedItem] = newItems[sourceGroupIndex].items.splice(result.source.index, 1);
      newItems[destinationGroupIndex].items.splice(result.destination.index, 0, movedItem);
      setItems(newItems);
      try {
        await axios.put(`https://hrm-backend-square.onrender.com/task/update/${movedItem.id}`, {
          status: destinationGroupIndex
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const handleChangec = (e, item) => {
    setTextc(e.target.value);
    setSpecificIdc(item);
  };

  const handleChanged = (e, item) => {
    setTextd(e.target.value);
    setSpecificIdd(item);
  };

  const handleSavec = async () =>  { 
    try {
      await axios.put(`https://hrm-backend-square.onrender.com/task/update/${specificIdc}`, {
        title: textc
        
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleSaved = async () =>  { 
    try {
      await axios.put(`https://hrm-backend-square.onrender.com/task/update/${specificIdd}`, {
        description: textd
      });
    } catch (error) {
      console.log('error', error);
    }
  };
 


  // };

  return (
    <Paper style={{ padding: '20px', height: 'fit-content', maxWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" onClick={openPopup}>
          Add New Task
        </Button>
        {isPopupOpen && <PopupTask onClose={closePopup} reloadTasks={reloadTasks} />}
      </div>
      <Grid container spacing={2} sx={{ listStyle: 'none', display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <Grid item xs={12} sx={{ display: 'flex', gap: '10px', justifyContent: 'left' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {items.map((group, groupIndex) => (
              <Grid item xs={12} key={groupIndex} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Droppable droppableId={groupIndex.toString()} key={groupIndex}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        padding: 16,
                        border: '1px solid #ccc',
                        borderRadius: 10,
                        width: '100%',
                        height: '100%',
                        ...(groupIndex === 4
                          ? {
                              // Apply specific CSS for groupIndex 4
                              width: snapshot.isDraggingOver ? '100%' : '10px',
                              transition: 'width 0.3s ease',
                              color: snapshot.isDraggingOver ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
                              tarnsition: 'color 0.6 ease'
                                                           
                             
                            }
                          : null),
                        ...(groupIndex === 0 || groupIndex === 1 || groupIndex === 2 || groupIndex === 3 
                          ? {
                              // Apply specific CSS for groupIndex 4


                             
                            }
                          : null),
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <h3 key={groupIndex}>{group.title} </h3>
                      </div>

                      {group.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 10,
                                margin: '0px 0px 5px 0px',
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 10,
                                ...provided.draggableProps.style
                              }}
                            >
                              <Grid container spacing={2} sx={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <EditText
                                    key={groupIndex}
                                    style={{
                                      margin: '0px',
                                      backgroundColor: '#92bCa6',
                                      padding: '4px',
                                      borderRadius: '4px',
                                      width: 'fit-content'
                                    }}
                                    value={item.id === specificIdc ? (textc ? textc : item.content) : item.content}
                                    onChange={(e) => handleChangec(e, item.id)}
                                    onSave={handleSavec}
                                  />
                                </Grid>

                                <Grid
                                  key={groupIndex}
                                  style={{
                                    display: 'flex',
                                    width: 'fit-content',
                                    flexWrap: 'wrap',
                                    justifyContent: 'left',
                                    padding: '5px',
                                    marginTop: '5px',
                                    marginLeft: '10px'
                                  }}
                                >
                                  <EditText
                                    value={item.id === specificIdd ? (textd ? textd : item.des) : item.des}
                                    onChange={(e) => handleChanged(e, item.id)}
                                    onSave={handleSaved}
                                  />
                                </Grid>
                              </Grid>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            ))}
          </DragDropContext>
        </Grid>
        {/* 
        <Grid item xs={2} sx={{}}>
          <Grid item xs={12} sx={{}}>
            <Typography sx={{ fontWeight: '600', fontSize: 'medium', width: '100%' }}>Task Progress</Typography>
          </Grid>
          <Grid container xs={12} sx={{ marginTop: '25px' }}>
            <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Typography sx={{}} style={{ fontWeight: '200', fontSize: 'medium' }}>
                Test Progress
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ fontWeight: '400' }}>4/8</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '5px', display: 'flex' }}>
            <svg width="100%" height="15" xmlns="http://www.w3.org/2000/svg">
              <rect y="30%" fill="#dce0e3" width="100%" height="7" strokeLinecap="round" rx="5" ry="5" />
              <rect y="30%" fill="#92bCa6" width="50%" height="7" strokeLinecap="round" rx="5" ry="5" />
            </svg>
          </Grid>
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default YourGoalTab;
