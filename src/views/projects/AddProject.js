import React from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, Box, Button, Select, MenuItem, FormControl, InputLabel, OutlinedInput, Autocomplete, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import * as yup from 'yup';
// import { Formik } from "formik";
import axios from 'axios';
import Swal from 'sweetalert2';
import { userSchema } from './Validation';



const AddProject = () => {
    const theme = useTheme();
    const [name, setname] = useState('');
    const [lead, setlead] = useState('');
    const [memb, setmemb] = useState([]);
    const [powner, setpowner] = useState('');
    const [status, setstatus] = useState('');
    const [scrum, setscrum] = useState('');
    const [description, setdescription] = useState('');
    const [error, seterror] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    console.log(memb)


    const Submit = async (e) => {
        e.preventDefault();
        const empdata = { name, lead, scrum, status, description, powner, memb };
        console.log(empdata)
        try {
            await userSchema.validate(
                { name ,
                  powner,
                  lead,
                  scrum,
                  status,
                },
                 {abortEarly: false }
            );
            await axios.post("http://localhost:3001/projects", empdata);
            Swal.fire('Created!','Project Created Sucessfully.', 'success')
            navigate('/projectlist');
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationerr = {};
                error.inner.forEach((err) => {
                    validationerr[err.path] = err.message;
                });
                seterror(validationerr);
                console.log(validationerr);
            } else {
                console.log(error);
            }
        }
    }

    const Update = (e) => {
        e.preventDefault();
        const empdata = { name, lead, scrum, status, description, powner, memb };
        fetch("http://localhost:3001/projects/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then(() => {
            Swal.fire('Updated!','Project Updated Successfully.', 'success')
            navigate('/projectlist');
        }).catch((err) => {
            console.log(err.message)
        })

    }


    useEffect(() => {
        fetch("http://localhost:3001/employees").then((res) => {
            return res.json();
        }).then((resp) => {
            setdata(resp)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:3001/projects/" + id).then((res) => {
            return res.json();
        }).then((resp) => {
            setname(resp.name);
            setlead(resp.lead);
            setmemb(resp.memb);
            setpowner(resp.powner);
            setstatus(resp.status);
            setscrum(resp.scrum);
            setdescription(resp.description);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <MainCard title="Project Form">
            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField sx={{ minWidth: '100%' }} value={name} error={error && error.name}
                                helperText={error && error.name} onChange={(e) => setname(e.target.value)} id="outlined-basic" label="Project Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ minWidth: '100%' }} error={error && error.powner}>
                                <InputLabel>Project Owner</InputLabel>
                                <Select
                                    value={powner}
                                    onChange={(e) => setpowner(e.target.value)}
                                    input={<OutlinedInput label="Project Owner" />}
                                >
                                    {data.map(x => {
                                        return (
                                            <MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>
                                        )
                                    })
                                    }
                                </Select>
                                <FormHelperText>{error && error.powner}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ minWidth: '100%' }} error={error && error.lead}>
                                <InputLabel>Team Lead</InputLabel>
                                <Select
                                    value={lead}
                                    onChange={(e) => setlead(e.target.value)}
                                    input={<OutlinedInput label="Team Lead" />}
                                >
                                    {data.map(x => {
                                        return (
                                            <MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>{error && error.lead}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ minWidth: '100%' }} error={error && error.scrum}>
                                <InputLabel>Scrum Master</InputLabel>
                                <Select
                                    value={scrum}
                                    onChange={(e) => setscrum(e.target.value)}
                                    input={<OutlinedInput label="Scrum Master" />}
                                >
                                    {data.map(x => {
                                        return (
                                            <MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>{error && error.scrum}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ minWidth: '100%' }} error={error && error.status}>
                                <InputLabel>Project Status</InputLabel>
                                <Select
                                    value={status}
                                    onChange={(e) => setstatus(e.target.value)}
                                    input={<OutlinedInput label="Project Status" />}
                                >
                                    <MenuItem value={"In-progress"}>In-Progress</MenuItem>
                                    <MenuItem value={"Not-Started"}>Not Started</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                </Select>
                                <FormHelperText>{error && error.status}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl sx={{ minWidth: '100%' }}>
                                <Autocomplete

                                    multiple
                                    options={data}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <Box component='li' {...props}>
                                            {option.name} - {option.role}
                                        </Box>
                                    )}
                                    disableCloseOnSelect
                                    // inputvalue={memb.map(x=>{x.name})}
                                    onChange={(event, newmemb) => {
                                        setmemb(newmemb);
                                    }}
                                    onInputChange={(event, newmemb) => {
                                        setmemb(newmemb);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Team Members"
                                            placeholder="Team Members"

                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline rows={6} value={description} onChange={(e) => setdescription(e.target.value)} fullWidth id="summaryinput" label="Project Description" variant="outlined" />
                        </Grid>
                    </Grid>
                    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {id != null ?
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
                                    onClick={(e) => Update(e)}>
                                    Update
                                </Button>
                                :
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
                                    onClick={(e) => Submit(e)}>
                                    Save
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </MainCard>
    )
}

export default AddProject;