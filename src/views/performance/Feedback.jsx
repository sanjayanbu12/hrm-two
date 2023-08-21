import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Paper, Button, Avatar, Stack, Rating, Typography, TextField, IconButton } from '@mui/material';
import User1 from 'assets/images/users/user-round.svg';
import ReplyIcon from '@mui/icons-material/Reply';

import Item from 'antd/es/list/Item';

const Feedback = () => {
  const [Comment, setComment] = useState('');

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission or any other action
    console.log('Comment:', Comment);
  };

  return (
    <MainCard title="Feedbacks">
        <Button variant="contained" color="secondary">Give Feedback</Button>
        
        <Stack direction="row" spacing={2} sx={{listStyleType:"none",display:"flex",alignItems:"center",marginTop:"20px"}}>
            <Item>
            <Avatar   
                sx={{

                     width: '60px',
                     height: '60px',
                }}
                src={User1}>
            </Avatar>
            </Item>

            <Item alignItems={"center"} sx={{}}>
            <Typography variant="h4" body1="span"  sx={{
                fontWeight: 800,
                fontSize:"medium"
                }}>Johne Doe
                </Typography>
                <Typography variant="h4" body1="span" sx={{
                    fontWeight: 300,
                    fontSize:"small",
                    color: "#697586",
                    marginTop: "5px"
                    }}> Project Admin</Typography>
                </Item>
                <Item>
                <Button variant="contained" color="secondary">Give Feedback</Button>
                </Item>
                <Item>
                </Item>

            </Stack>

        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} sx={{listStyleType:"none"}}>

        <Item >
            <Typography  sx={{fontSize:'18px',
            marginTop:"10px",

            }}><b>Feedbacks Given to you</b></Typography>
        <Paper
        sx ={{
            marginTop: "20px",
            width : 290,
            padding: "15px",
            fontWeight: 800,
            paddingBottom: "30px" 
            }}
            src={User1}
          ></Avatar>
        </Item>

        <Item alignItems={'center'} sx={{}}>
          <Typography
            variant="h4"
            body1="span"
            sx={{
              fontWeight: 800,
              fontSize: 'medium'
            }}
          >
            Johne Doe
          </Typography>
          <Typography
            variant="h4"
            body1="span"
            sx={{
              fontWeight: 300,
              fontSize: 'small',
              color: '#697586',
              marginTop: '5px'
            }}
          >
            {' '}
            Project Admin
          </Typography>
        </Item>
        <Item>
          <Button variant="contained" color="secondary">
            Give Feedback
          </Button>
        </Item>
      </Stack>
      <Typography sx={{ fontSize: '18px', marginTop: '10px' }}>
            <b>Feedbacks Given to you</b>
          </Typography>

      <Stack direction="row" useFlexGap overflow={"auto"} spacing={2} display="flex" sx={{ listStyleType: 'none',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent', // Transparent colors by default
    
        '&::-webkit-scrollbar': {
          height: '5px',
          marginTop:"10px",
        },
    
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent', // Transparent background
        },
    
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent', // Transparent thumb
          borderRadius: '6px',
          transition: 'background-color 0.3s', // Smooth transition
        },
    
        '&:hover::-webkit-scrollbar-thumb': {
          backgroundColor: '#888', // Change background color on hover
        },
    
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        }}>
        <Item>
        <Avatar   
                sx={{
                    
                     width: '40px',
                     height: '40px',
                }}
                src={User1}>
            </Avatar>
            </Item>
{/* This for review  */}
            <Item>
            <Typography variant="h4" body1="span"  sx={{
                fontWeight: 800,
                fontSize:"medium"
                }}>Kannan S
                </Typography>
                <Typography variant="subtitle2">Project Admin</Typography>
              </Item>
              <Item>
                <Rating alignItems="left" name="read-only" value={3} readOnly />
                <Typography
                  component="legend"
                  sx={{
                    marginTop: '5px',
                    fontWeight: 300
                  }}
                >
                  Good Work! but, you have to maintain punctuality too...
                </Typography>
                </Item>
                <Item >
                    <div style={{display:"flex"}}>
                    <TextField
                        label="Enter your comment"
                        variant="outlined"
                        fullWidth
                        value={Comment}
                        onChange={handleInputChange} > </TextField>
                       <div ><IconButton sx={{marginLeft:"15px"}}onClick={handleSubmit} aria-label="SVG Icon Button">
                        <ReplyIcon/></IconButton></div> 
                        </div>
                        </Item>
                <Item><ReplyIcon sx={{display:"block",marginLeft:"200px"}}/></Item>

          
          
          
          
          
          <Item >
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
      <Rating alignItems="left" name="read-only" value={3} readOnly />
      <Typography
        component="legend"
        sx={{
          marginTop: '5px',
          fontWeight: 300
        }}
      >
        Good Work! but, you have to maintain punctuality too...
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
</Paper></Item>





<Item >
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
      <Rating alignItems="left" name="read-only" value={3} readOnly />
      <Typography
        component="legend"
        sx={{
          marginTop: '5px',
          fontWeight: 300
        }}
      >
        Good Work! but, you have to maintain punctuality too...
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
</Paper></Item>





<Item >
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
      <Rating alignItems="left" name="read-only" value={3} readOnly />
      <Typography
        component="legend"
        sx={{
          marginTop: '5px',
          fontWeight: 300
        }}
      >
        Good Work! but, you have to maintain punctuality too...
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
</Paper></Item>



          </Stack>





          

    


      

    </MainCard>
  );
};

export default Feedback;
