import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './dashboard.css'
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';

const TotalGrowthBarChart = () => {
  const navigate=useNavigate();
  return (
    <MainCard>
    <div className='dashboard'>
 { 
    <Card sx={{ width: 250, height: 150,background:'lightblue',color: 'blue',
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
  <Typography variant="body2">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography>
  <CardActions color='red'>
    <Button size="small">See Details</Button>
  </CardActions>
</CardContent>

    </Card>
}
<Card sx={{ width: 250, height: 150,background:'grey',color: 'white',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          TASKS
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Ten
        </Typography>
        <Typography variant="body2">
          {/* well meaning and kindly. */}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
        <Button  onClick={() => navigate(`/basictable`)}
        >HI</Button>
      </CardContent>
    </Card>
    </div>

    <div className='dashboard1'>

     <Card sx={{ width: 250,
      height: 150,
      background:'grey',
      color: 'blue',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          PROJECTS
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Three
        </Typography>
        <Typography variant="body2">
          {/* well meaning and kindly. */}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See Details</Button>
      </CardActions>
    </Card>

    <Card sx={{ width: 250, height: 150,background:'lightgreen',color: 'blue',
    fontWeight:'bold',
    fontSize:'20px',
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          USERS
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Twenty
        </Typography>
        <Typography variant="body2">
          {/* well meaning and kindly. */}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See Details</Button>
      </CardActions>
    </Card>

      </div>
      </MainCard>
  )
}

export default TotalGrowthBarChart