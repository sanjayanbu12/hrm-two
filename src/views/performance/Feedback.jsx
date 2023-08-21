import React from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { Paper, Button, Avatar, Stack, Rating, Typography} from '@mui/material';
import User1 from 'assets/images/users/user-round.svg';

import Item from 'antd/es/list/Item';




const Feedback = () => {
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

            </Stack>


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

 {/* This is for Review      */}

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
        
        <Paper display="flex">Testing</Paper>
        
        

    </MainCard>
    
      
  )
}

export default Feedback