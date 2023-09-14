import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Grid, Typography, Card, MenuItem, Menu  } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const initialItems = [
  {
    title: 'ICEBOX',
    items: [
      { id: 'item-1', content: 'Item 1', des: 'This is for Item 1 and this is our description' },
      { id: 'item-2', content: 'Item 2', des: 'This is for Item 1 and this is our description' }
    ]
  },
  {
    title: 'INPROGRESS',
    items: [
      { id: 'item-3', content: 'Item 3', des: 'This is for Item 1 and this is our description' },
      { id: 'item-4', content: 'Item 4', des: 'This is for Item 1 and this is our description' }
    ]
  },
  {
    title: 'COMPLETED',
    items: [
      { id: 'item-5', content: 'Item 5', des: 'This is for Item 1 and this is our description' },
      { id: 'item-6', content: 'Item 6', des: 'This is for Item 1 and this is our description' }
    ]
  },
  {
    title: 'BLOCKED',
    items: [
      { id: 'item-7', content: 'Item 7', des: 'This is for Item 1 and this is our description' },
      { id: 'item-8', content: 'Item 8', des: 'This is for Item 1 and this is our description' }
    ]
  }
];

const YourGoalTab = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list
    const newItems = [...items];
    const sourceGroupIndex = parseInt(result.source.droppableId);
    const destinationGroupIndex = parseInt(result.destination.droppableId);

    if (sourceGroupIndex === destinationGroupIndex) {
      // Reorder items within the same group
      const group = newItems[sourceGroupIndex];
      const [reorderedItem] = group.items.splice(result.source.index, 1);
      group.items.splice(result.destination.index, 0, reorderedItem);
    } else {
      // Move items between groups
      const [movedItem] = newItems[sourceGroupIndex].items.splice(result.source.index, 1);
      newItems[destinationGroupIndex].items.splice(result.destination.index, 0, movedItem);
    }

    setItems(newItems);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard title="Goal Tracking" sx={{ height: '99%', paddingTop: '0px' }}>
      <Grid container spacing={2} sx={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={10} sx={{ display: 'flex', gap: '10px', justifyContent: 'left' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {items.map((group, groupIndex) => (
              <>
                <Grid item xs={12} key={groupIndex} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Droppable droppableId={groupIndex.toString()} key={groupIndex}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 16,
                          border: '1px solid #ccc',
                          borderRadius: 10,
                          width: '100%',
                          height: '100%'
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
                                  padding: 16,
                                  height: 'fit-content',
                                  margin: '0 0 8px 0',
                                  backgroundColor: '#fff',
                                  border: '1px solid #ddd',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  borderRadius: 10,

                                  ...provided.draggableProps.style
                                }}
                              >
                                <Grid container spacing={2} sx={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }}>
                                <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <h4
                                  key={groupIndex}
                                  style={{
                                    margin: '0px',
                                    backgroundColor: '#92bCa6',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    width: 'fit-content'
                                  }}
                                >
                                  {item.content}
                                </h4></Grid>
                                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'left' }}>
                                <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
  
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
                                </Grid>

                                <Grid 
                                  key={groupIndex}
                                  style={{
                                    display: 'flex',
                                    width: 'fit-content',
                                    flexWrap: 'wrap',
                                    justifyContent: 'left',
                                    padding: '5px',
                                    marginTop: '5px'
                                  }}
                                >
                                  <Typography>{item.des}</Typography>
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
              </>
            ))}
          </DragDropContext>
        </Grid>

        <Grid item xs={2} sx={{}}>
          <Grid item xs={12} sx={{}}>
            <Typography sx={{ fontWeight: '600', fontSize: 'medium', width:"100%" }}>Task Progress</Typography>
            </Grid>
            <Grid container xs={12} sx={{ marginTop: '25px'}}>
              <Grid item xs={11} sx={{ display:"flex", justifyContent:"flex-start"}}>
              <Typography sx={{}} style={{ fontWeight: '200', fontSize: 'medium', }}>Test Progress</Typography>
              </Grid>
            <Grid item xs={1} sx={{ display:"flex",  justifyContent:"flex-end"}}>
              <Typography sx={{ fontWeight: '400',}}>4/8</Typography>
            </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '5px', display:"flex"}}>
                <svg width="100%" height="15" xmlns="http://www.w3.org/2000/svg">
                  <rect y="30%" fill="#dce0e3" width="100%" height="7" strokeLinecap="round" rx="5" ry="5" />
                  <rect y="30%" fill="#92bCa6" width="50%" height="7" strokeLinecap="round" rx="5" ry="5" />
                </svg>
            </Grid>

        </Grid>
        </Grid>

    </MainCard>
  );
};

export default YourGoalTab;
