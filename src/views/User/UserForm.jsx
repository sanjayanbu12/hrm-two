import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react';
import { Grid, Box, Button, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UserForm = () => {
  const theme = useTheme();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(role);
  useEffect(() => {
    fetch("http://localhost:3001/users/" + id)
      .then((res) => res.json())
      .then((resp) => {
        setFirstName(resp.firstname);
        setLastName(resp.lastname);
        setEmail(resp.email);
        setPassword(resp.password);
        setRole(resp.role);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      firstname,
      lastname,
      email,
      password,
      role,
    };

    try {
      await axios.put("http://localhost:3001/users/" + id, formData);
      setFirstName('');
      setLastName('');
      setRole('');
      Swal.fire({
        icon: 'success',
        text: 'User updated successfully',
      }).then(() => {
        navigate('/UserList');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Error updating user',
      });
    }
  };

  return (
    <MainCard title="User Form">
      <ValidatorForm name="myform" onSubmit={(e) => handleSubmit(e)}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                variant="outlined"
                label="First Name*"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                validators={['required']}
                errorMessages={['First Name is required']}
              />
            </Grid>
            <Grid item xs={4}>
              <TextValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                variant="outlined"
                label="Last Name*"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                validators={['required']}
                errorMessages={['Last Name is required']}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectValidator
                id="role-select"
                value={role}
                sx={{ minWidth: '100%' }}
                labelId="role-select-label"
                label="Role*"
                onChange={(e) => setRole(e.target.value)}
                validators={['required']}
                errorMessages={['Role is required']}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="Super-Admin">Super Admin</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Trainer">Trainer</MenuItem>
              </SelectValidator>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                type="submit"
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
                    color: theme.palette.secondary.light,
                  },
                }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ValidatorForm>
    </MainCard>
  );
};

export default UserForm;
