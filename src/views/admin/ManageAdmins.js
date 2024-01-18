import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import {
    Grid,
    TextField,

    Button,
    FormControl,
    InputLabel,
    Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ManageAdmins = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('Admin');
    const theme = useTheme();

    const roles = ['Admin', 'User'];

    useEffect(() => {
        axios.get('http://localhost:3001/api/allemployeduser')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleUserChange = (event, value) => {
        setSelectedUser(value);
    };

    const handleRoleChange = (event, value) => {
        setSelectedRole(value);
    };

    const finalSubmit = async (event) => {
        console.log("Helpoo:",selectedUser._id)
        event.preventDefault();
        await axios.put(`http://localhost:3001/api/updaterole/${selectedUser._id}`, {
            role: selectedRole
        }).catch(error => console.error(error));
    };

    return (
            <MainCard title="Admin Manager">
                <form>
                     <FormControl sx={{ minWidth: '100%' }}>
                        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Autocomplete
                                 size="medium"
                                    options={users}
                                    getOptionLabel={(option) => option.firstname}
                                    onChange={handleUserChange}
                                    renderInput={(params) => <TextField {...params} label="User Name" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                    options={roles}
                                    defaultValue={selectedRole}
                                    onChange={handleRoleChange}
                                    renderInput={(params) => <TextField {...params} label="Role" />}
                                />
                            </Grid>
                            <Grid item xs={12}>

                                    <Button
                                    variant="contained"
                                  sx={{
                                    marginTop:"10px",
                                 width: '300px',
                                height: '40px',
                                borderRadius: '10px',
                                padding: 0.6,
                                background: '#673ab7',
                                color: '#efebe9',
                                '&:hover': {
                                    color: theme.palette.secondary.light,
                                    background: '#673ab7'
                                }
                             }}
                            onClick={finalSubmit}
                >
                    Save Changes
                </Button>
                </Grid>
                </Grid>
  
                            </FormControl>
              
                </form>
           
        </MainCard>
    );
};

export default ManageAdmins;