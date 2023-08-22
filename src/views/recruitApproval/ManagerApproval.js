import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router';
// import MaterialTable from "material-table";

const ManagerApproval = () => {
  const [data,setRecData]=useState([])
  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
    setRecData(res.data.getData.filter((data) => data.approvalstatus.manager === false && data.approvalstatus.hr === true));
    console.log(data)

  };
  const handleClick = (id)=>{
    navigate(`/views/${id}`)
  }
  return (
  <Stack direction={'row'} spacing={10}>
    {data && data.map(item =>(
 <Card  key={item._id} sx={{ minWidth: 375 }}>
 <CardContent sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
   <Typography textAlign={'center'} sx={{ fontSize: 20 }} color="secondary" variant='h1' gutterBottom>
   {item.Company}
   </Typography>
   <Stack  spacing={0.5}>
   <Typography variant="h5" component="div">
    <span style={{ marginRight: '20px' }}>Role<span style={{marginLeft:'85px'}}>:</span></span> {item.Jobrole}
</Typography>
   <Typography  color="text.secondary">

    <Typography  sx={{display:'inline'}}  variant="h5" component="div" >Experience </Typography><span style={{marginRight:'20px',marginLeft:'38px'}}>:</span><span style={{marginLeft:'10px'}}>{item.ExperienceFrom}</span> - <span>{item.ExperienceTo}  Years</span> 
   </Typography>
   <Typography variant="h5" component="div">
    <span style={{ marginRight: '20px' }}>Opeanings<span style={{marginLeft:'44px',marginRight:'10px'}}>:</span></span> {item.Openings}
</Typography>
   <Typography variant="h5" component="div">
    <span style={{ marginRight: '20px' }}>HR<span style={{marginLeft:'92px',marginRight:'10px'}}>:</span></span> {item.Hrname}
</Typography>
   <Typography variant="h5" component="div">
    <span style={{ marginRight: '20px' }}>Interviewrounds<span style={{marginLeft:'10px',marginRight:'10px'}}>:</span></span> {item.Interviewrounds}
</Typography>
   </Stack>
 </CardContent>
 <CardActions>
   <Button size="small"
   onClick={()=>handleClick(item._id)}
   >View More</Button>
 </CardActions>
</Card>
    ))}
  </Stack>);
};

export default ManagerApproval;
