import React, { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { Paper, Rating,  TextField, IconButton, Typography, Stack,Avatar} from '@mui/material';
import Item from 'antd/es/list/Item';
import User1 from 'assets/images/users/user-round.svg';



const FeedbackCard = ({comm,rating}) => {
    const [Comment, setComment] = useState('');

    const handleInputChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleSubmit = () => {
      // Handle form submission or any other action
      console.log('Comment:', Comment);
    };
  
  return (
    <Item>
    <Paper display="flex"
  sx={{
    marginTop: '20px',
    width: 290,
    padding: '15px',
    fontWeight: 800,
    paddingBottom: '20px',
    
  }}
  title="Feedbacks given to you"
  elevation={9}
>
  <Stack
    direction="row"
    useFlexGap
    flexWrap="wrap"
    spacing={2}
    sx={{
      listStyleType: 'none',
      height: 250,
      display: 'flex',
      marginTop: '5px'
    }}
  >
    <Item>
      <Avatar
        sx={{
          width: '40px',
          height: '40px'
        }}
        src={User1}
      ></Avatar>
    </Item>
    {/* This for review  */}
    <Item>
      <Typography
        variant="h4"
        body1="span"
        sx={{
          fontWeight: 800,
          fontSize: 'medium'
        }}
      >
        Kannan S
      </Typography>
      <Typography variant="subtitle2">Project Admin</Typography>
    </Item>
    <Item>
      <Rating alignItems="left" name="read-only" value={rating} readOnly />
      <Typography
        component="legend"
        sx={{
          marginTop: '5px',
          fontWeight: 300
        }}
      >
        {comm}
      </Typography>
    </Item>
    <Item>
      <div style={{ display: 'flex' }}>
        <TextField label="Enter your comment" variant="outlined" fullWidth value={Comment} onChange={handleInputChange}>
          {' '}
        </TextField>
        <div>
          <IconButton sx={{ marginLeft: '15px' }} onClick={handleSubmit} aria-label="SVG Icon Button">
            <ReplyIcon />
          </IconButton>
        </div>
      </div>
    </Item>
  </Stack>
</Paper>
</Item>
  )
}

export default FeedbackCard