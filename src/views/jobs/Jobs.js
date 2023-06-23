import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// const cardData = [
//   { title: 'Card 1', description: 'Description 1' }
//   { title: 'Card 2', description: 'Description 2' },
//   { title: 'Card 3', description: 'Description 3' }
// Add more card data as needed
// ];
// const [Carddata, setCarddata] = useState('');
const Jobs = () => {
  return (
    <div>
      <h1>Job List</h1>
      {Carddata.map((item, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
