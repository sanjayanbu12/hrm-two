import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SampleForm = () => {
  const theme = useTheme();

  return (
    <MainCard title="Add New Sample">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
           
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ minWidth: '100%' }} id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ minWidth: '100%' }} id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ minWidth: '100%' }} id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ minWidth: '100%' }} id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ minWidth: '100%' }} id="outlined-basic" label="First Name" variant="outlined" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{
                boxShadow: 'none',
                minWidth: '100%',
                borderRadius: 2,
                padding: 1.5,
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
                '&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light
                }
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default SampleForm;
