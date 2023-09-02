import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import MaterialTable from "material-table";

const HrApproval = () => {
  const [data,setRecData]=useState([])
  const [edata,setedata]=useState([])
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)
  const authId=useSelector(state=>state.customization.authId)
  console.log(authId)
  useEffect(() => {
    fetchData();
  }, [edata]);
  useEffect(()=>{
    const fetchDataOnMount = async () => {
      try {
        const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
        setedata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchDataOnMount();
  },[])
  const fetchData = async () => {
  try {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
    const filteredData = res.data.getData.filter((item) => {
      const hrNames = item.orgData.map((orgItem) => orgItem.id);
      const edataId=edata.filter(d=>d._id==hrNames)
      const empID=(edataId.map(z=>z.employeeid))
      console.log(empID)
      return empID.includes(authId) &&  empID.includes(id); // Replace 'YourLoggedInUserName' with the actual logged-in user's name
    });
    setRecData(filteredData);
  } catch (error) {
    console.log(error)
  }
  };
  const handleClick = (id)=>{
    navigate(`/recruitmentview/${id}`)
  }
  return (
    
  <Stack direction={'row'} gap={'30px'} sx={{ flexWrap: 'wrap' , }}>
    {data && data.map(item =>(
 <Card  key={item._id} sx={{ width: '50%', }}>
 <CardContent sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
   <Typography textAlign={'center'} sx={{ fontSize: 20 }} color="secondary" variant='h1' gutterBottom>
   {item.Company}
   </Typography>
   <Stack sx={{margin:'0 auto'}} spacing={0.5}>
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
   <Button size="small"
   onClick={()=>handleClick(item._id)}
   
   >View More</Button>
   </Stack>
 </CardContent>
</Card>
    ))}
  </Stack>);
};

export default HrApproval;
