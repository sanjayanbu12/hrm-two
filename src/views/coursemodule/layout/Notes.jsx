import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const notesData = [
  {
    title: "Shrimp and Chorizo Paella",
    date: "September 14, 2016",
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    title: "Another Note Title",
    date: "Date",
    description: "Description of another note.",
  },
  {
    title: "Another Note Title",
    date: "Date",
    description: "Description of another note.",
  },
  {
    title: "Another Note Title",
    date: "Date",
    description: "Description of another note.",
  },
  {
    title: "Another Note Title",
    date: "Date",
    description: "Description of another note.",
  },
  // Add more notes as needed
];


const Notes = () => {
  return (
    <div>
      <Paper elevation={2} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Create the course note at time"
          inputProps={{ 'aria-label': 'Create the course note at time' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <AddIcon />
        </IconButton>
      </Paper>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' ,marginTop:'16px'}}>
        {notesData.map((note, index) => (
          <Card key={index} elevation={2} sx={{ maxWidth: 300, borderRadius: '12px', height: 250 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={note.title}
              subheader={note.date}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {note.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
