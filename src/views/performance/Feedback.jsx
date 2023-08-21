import React from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { Paper, Avatar, Stack, Rating, Typography, Divider, List, ListItem, ListItemText,ListItemAvatar, } from '@mui/material';
import User1 from 'assets/images/users/user-round.svg';

import Item from 'antd/es/list/Item';




const Feedback = () => {
  return (
    <MainCard title="Feedbacks" >
        <Stack direction="row" spacing={2} sx={{listStyleType:"none",display:"flex",alignItems:"center"}}>
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

            </Stack>

        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} sx={{listStyleType:"none"}}>

        <Item >
        <Paper
        sx ={{
            marginTop: "20px",
            width : 290,
            padding: "15px",
            fontWeight: 800,
            paddingBottom: "30px" 
            }}
            title="Feedbacks given to you" 
            elevation={9}> Feedbacks Given to You


        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}
        sx={{listStyleType:"none",display:"flex",marginTop:"20px"}}>
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
                <Typography component="legend"
                sx={{
                    marginTop:"10px",
                    fontWeight: 300,
                }}>
                    Good Work! but, you have to maintain punctuality too...
                </Typography>
                </Item>
                </Stack>

        </Paper>
        </Item>

        <Item display="flex">

        <Paper
        sx ={{
            marginTop: "20px",
            width : 290,
            padding: "15px",
            paddingRight: "30px",
            fontWeight: 800,
            paddingBottom: "30px" 
            }}
            title="Skill Set Matrix" 
            elevation={9}> Give Feedbacks
{/*  */}
            {/* This is for memebrs */}
{/*  */}

    <Stack direction="column" useFlexGap flexWrap="wrap" spacing={2}
        sx={{listStyleType:"none",display:"flex",marginTop:"15px",}}>
            <Divider/>


    <List sx={{ width: '100%', maxWidth: 360, height:100,overflow:"auto",scrollbarWidth:"none", bgcolor: 'background.paper' }}>
      <ListItem sx={{marginTop:"-25px"}}>

        <ListItemAvatar>
          <Avatar src={User1}>
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
        <Typography variant="h4" body1="span"  sx={{fontWeight: 800,fontSize:"medium"}}>
            Kannan S
        </Typography>
        <Typography variant="subtitle2">Project Admin</Typography>
        </ListItemText>
        </ListItem>
        <Divider/>

        <ListItem >
        <ListItemAvatar>
          <Avatar src={User1}>
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
        <Typography variant="h4" body1="span"  sx={{fontWeight: 800,fontSize:"medium"}}>
            Kannan S
        </Typography>
        <Typography variant="subtitle2">Project Admin</Typography>
        </ListItemText>
        </ListItem>
        <Divider/>

        <ListItem >
        <ListItemAvatar>
          <Avatar src={User1}>
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
        <Typography variant="h4" body1="span"  sx={{fontWeight: 800,fontSize:"medium"}}>
            Kannan S
        </Typography>
        <Typography variant="subtitle2">Project Admin</Typography>
        </ListItemText>
        </ListItem>


        </List>


            



            </Stack>
            </Paper>
        </Item>




        </Stack>
        
        
        
        

    </MainCard>
    
      
  )
}

export default Feedback