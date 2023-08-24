import React from 'react'
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './dashboard.css'
// import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';

const TotalGrowthBarChart = () => {
  const navigate=useNavigate();
  return (
    <>
    <div className='dashboard'>
 { 
    <Card sx={{ width: 250, height: 150,background:'linear-gradient(135deg, lightblue, blue)',color:'white',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    EMPLOYEES
  </Typography>
  <Typography variant="h5" component="div">
    {/* Your content here */}
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    Twenty Five
  </Typography>
  {/* <Typography variant="body2">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography> */}
   <Typography style={{marginTop:'50px', cursor: 'pointer'}} onClick={() => navigate(`/basictable`)}>HI</Typography>
</CardContent>

    </Card>
}
{ 
    <Card sx={{ width: 250, height: 150,background:'linear-gradient(135deg, lightgreen, green)',color:'white',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    EMPLOYEES
  </Typography>
  <Typography variant="h5" component="div">
    {/* Your content here */}
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    Twenty Five
  </Typography>
  {/* <Typography variant="body2">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography> */}
   <Typography style={{marginTop:'50px', cursor: 'pointer'}} onClick={() => navigate(`/basictable`)}>HI</Typography>
</CardContent>
    </Card>
    
}
</div>

<div className='dashboard1'>
{ 
    <Card sx={{ width: 250, height: 150,background: 'linear-gradient(135deg, lightcoral, darkorange)',
    color:'white',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    EMPLOYEES
  </Typography>
  <Typography variant="h5" component="div">
    {/* Your content here */}
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    Twenty Five
  </Typography>
  {/* <Typography variant="body2">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography> */}
   <Typography style={{marginTop:'50px', cursor: 'pointer'}} onClick={() => navigate(`/basictable`)}>HI</Typography>
</CardContent>

    </Card>
}

{ 
    <Card sx={{ width: 250, height: 150,background: 'linear-gradient(135deg, lightseagreen, teal)'
    ,color:'white',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    EMPLOYEES
  </Typography>
  <Typography variant="h5" component="div">
    {/* Your content here */}
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    Twenty Five
  </Typography>
  {/* <Typography variant="body2">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography> */}
   <Typography style={{marginTop:'50px', cursor: 'pointer'}} onClick={() => navigate(`/basictable`)}>HI</Typography>
</CardContent>

    </Card>
}

      </div>
   </>
  )
}

export default TotalGrowthBarChart