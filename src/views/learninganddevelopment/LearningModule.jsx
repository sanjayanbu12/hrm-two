// import React, { useState } from 'react';
// import MainCard from 'ui-component/cards/MainCard';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { Paper, Dialog, DialogContent, TextField, DialogActions, FormControl, Select, MenuItem, InputLabel, Grid } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import image2 from "./image2.jpg";
// import image1 from "./image1.png"
// const useStyles = makeStyles((theme) => ({
//   contentCard: {
//     width: '100%',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '200px',
//     padding: theme.spacing(4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     color: 'white',
//   },
//   colorfulForm: {
//     width: '400px', 
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: theme.spacing(3), 
//   },
//   colorfulTextField: {
//     borderRadius: theme.spacing(1),
//     padding: theme.spacing(1.5),
//     color: 'black',
//   },
//   colorfulButton: {
//     borderRadius: theme.spacing(1),
//     padding: theme.spacing(1.5),
//     color: 'white',
//     cursor: 'pointer',
//     transition: 'transform 0.2s ease-in-out',
//     '&:hover': {
//       transform: 'scale(1.05)',
//     },
//   },
//   bigDialog: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//   },
//   bigDialogContent: {
//     padding: theme.spacing(3),
//   },
//   parallelCard: {
//     width: '400px',
//     padding: theme.spacing(3),
//     borderRadius: theme.spacing(2),
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: theme.spacing(3),
//     color: 'white',
//   },
// }));

// const LearningModule = () => {
//   const classes = useStyles();
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);

//   const openRegisterDialog = () => {
//     setIsRegisterOpen(true);
//   };

//   const closeRegisterDialog = () => {
//     setIsRegisterOpen(false);
//   };

//   const handleRegisterSubmit = () => {
//     // Handle form submission logic here
//   };

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <MainCard>
//             <Paper elevation={2} sx={{ maxWidth: 390, borderRadius: '12px' }}>
//               <CardMedia
//                 sx={{ height: 290 }}
//                 image={image2}
//               />
//               <CardContent className={classes.contentCard}>
//                 <Typography variant="h4" color="text.primary">
//                   Are you seeking industry persons for your organizations?
//                 </Typography>
//                 <CardActions>
//                   <Button color="secondary" onClick={openRegisterDialog}>Register Here</Button>
//                 </CardActions>
//               </CardContent>
//             </Paper>
//           </MainCard>
//         </Grid>
     
//         <Grid item xs={12} md={6}>
//           <MainCard>
//             <Paper elevation={2} sx={{ maxWidth: 390, borderRadius: '12px' }}>
//               <CardMedia
//                 sx={{ height: 290 }}
//                 image={image1}
//               />
//               <CardContent className={classes.contentCard}>
//                 <Typography variant="h4" color="text.primary">
//                   Are you looking for an opportunity to build future IT Industry through sessions?
//                 </Typography>
//                 <CardActions>
//                   <Button color="secondary" onClick={openRegisterDialog}>Register Here</Button>
//                 </CardActions>
//               </CardContent>
//             </Paper>
//           </MainCard>
//         </Grid>
//       </Grid>
    
//       <Dialog open={isRegisterOpen} onClose={closeRegisterDialog} className={classes.bigDialog}>
//         <DialogContent className={classes.bigDialogContent}>
//           <div className={classes.parallelCard}>
//             <form onSubmit={handleRegisterSubmit} className={classes.colorfulForm}>
//               <TextField label="Full Name" fullWidth className={classes.colorfulTextField} required />
//               <TextField label="Email" fullWidth className={classes.colorfulTextField} required />
//               <TextField label="Designation" fullWidth className={classes.colorfulTextField} required />
//               <TextField label="Address" fullWidth className={classes.colorfulTextField} required />
//               <TextField label="Contact No" fullWidth className={classes.colorfulTextField} required />
//               <TextField label="Date" fullWidth className={classes.colorfulTextField} required />
//               <FormControl fullWidth className={classes.colorfulTextField} required>
//                 <InputLabel>Program</InputLabel>
//                 <Select label="Program">
//                   <MenuItem value="BE - CSE">BE - CSE</MenuItem>
//                   <MenuItem value="BE - ECE">BE - ECE</MenuItem>
//                   <MenuItem value="BE - CIVIL">BE - CIVIL</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField label="Feedback" fullWidth className={classes.colorfulTextField} required multiline />
//               <label htmlFor="cv-upload" className={classes.colorfulTextField}>
//                 Upload CV
//                 <input type="file" id="cv-upload" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
//               </label>
//               <DialogActions>
//                 <Button onClick={closeRegisterDialog} className={classes.colorfulButton}>Cancel</Button>
//                 <Button type="submit" className={classes.colorfulButton}>Submit</Button>
//               </DialogActions>
//             </form>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default LearningModule;


import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Modal, TextField, DialogActions, FormControl, Select, MenuItem, InputLabel, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import image2 from "./image2.jpg";
import image1 from "./image1.png";

const useStyles = makeStyles((theme) => ({
  contentCard: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '200px',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
  },
  modalCard: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  colorfulForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  colorfulTextField: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: 'black',
    width: '100%',
  },
  colorfulButton: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  bigDialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  bigDialogContent: {
    padding: theme.spacing(3),
  },
  parallelCard: {
    width: '400px',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    color: 'white',
  },
}));

const LearningModule = () => {
  const classes = useStyles();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const handleRegisterSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MainCard>
            <Paper elevation={2} sx={{ maxWidth: 390, borderRadius: '12px' }}>
              <CardMedia
                sx={{ height: 290 }}
                image={image2}
              />
              <CardContent className={classes.contentCard}>
                <Typography variant="h4" color="text.primary">
                  Are you seeking industry persons for your organizations?
                </Typography>
                <CardActions>
                  <Button color="secondary" onClick={openRegisterModal}>Register Here</Button>
                </CardActions>
              </CardContent>
            </Paper>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard>
            <Paper elevation={2} sx={{ maxWidth: 390, borderRadius: '12px' }}>
              <CardMedia
                sx={{ height: 290 }}
                image={image1}
              />
              <CardContent className={classes.contentCard}>
                <Typography variant="h4" color="text.primary">
                  Are you looking for an opportunity to build future IT Industry through sessions?
                </Typography>
                <CardActions>
                  <Button color="secondary" onClick={openRegisterModal}>Register Here</Button>
                </CardActions>
              </CardContent>
            </Paper>
          </MainCard>
        </Grid>
      </Grid>

      <Modal open={isRegisterOpen} onClose={closeRegisterModal} className={classes.bigDialog}>
        <div className={classes.modalCard}>
          <form onSubmit={handleRegisterSubmit} className={classes.colorfulForm}>
            <TextField label="Full Name" fullWidth className={classes.colorfulTextField} required />
            <TextField label="Email" fullWidth className={classes.colorfulTextField} required />
            <TextField label="Designation" fullWidth className={classes.colorfulTextField} required />
            <TextField label="Address" fullWidth className={classes.colorfulTextField} required />
            <TextField label="Contact No" fullWidth className={classes.colorfulTextField} required />
            <TextField label="Date" fullWidth className={classes.colorfulTextField} required />
            <FormControl fullWidth className={classes.colorfulTextField} required>
              <InputLabel>Program</InputLabel>
              <Select label="Program">
                <MenuItem value="BE - CSE">BE - CSE</MenuItem>
                <MenuItem value="BE - ECE">BE - ECE</MenuItem>
                <MenuItem value="BE - CIVIL">BE - CIVIL</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Feedback" fullWidth className={classes.colorfulTextField} required multiline />
            <label htmlFor="cv-upload" className={classes.colorfulTextField}>
              Upload CV
              <input type="file" id="cv-upload" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
            </label>
            <DialogActions>
              <Button onClick={closeRegisterModal} className={classes.colorfulButton}>Cancel</Button>
              <Button type="submit" className={classes.colorfulButton}>Submit</Button>
            </DialogActions>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LearningModule;
