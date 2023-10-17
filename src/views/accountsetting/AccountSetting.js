import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


// const Container = styled.div`
// display: flex;
//   align-items: center;
//   padding: 20px 0;
//   justify-content: left;
//   position: absolute;
//   /* margin: 0 50px; */
//   top: 80px;
//   gap: 10px;
// `;
// const TextContent = styled.div`
// display: flex;
// flex-direction: column;
// `
const CardContainer = styled.div`
  position: relative;
  top: 20px;
  max-width: 620px;
  width: 100%;
  height: 800px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const CoverImageUpload = styled.input`
  display: none; /* Hide the input box */
`;
const CoverImageContainer = styled.label`
  width: 100%;
  height: 120px;
  border: 2px solid #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: opacity 0.25s ease-in-out 0s;
  
  &::before {
    content: 'Upload Cover Image';
    width: 100%;
    height: 120px;
    position: absolute;
    font-weight: bold;
    display: none; /* Initially hide the upload text */
  }

  &:hover::before {
    display: block;
    background: var(--ds-background-accent-gray-bolder, rgba(9, 30, 66, 0.54));
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;
const AvatarUpload = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  width: 100px;
  display: flex;
  top: -55px;
  left: 0px;
`;
const Profile = styled(Avatar)`
  &::before {
    content: 'Upload Image';
    width: 100px;
    height: 100px;
    position: absolute;
    font-size: x-small;
    display: none; 
  }

  &:hover::before {
    background: var(--ds-background-accent-gray-bolder, rgba(9, 30, 66, 0.54));
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;

const AccountSetting = () => {
    const user = useSelector((state) => state.customization.authId);
    const [userdetails, setUserDetails] = useState({});
    const [firstname, setfirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [empId, setEmpId] = useState('');
    const [department, setDepartment] = useState('');
    const [mob, setPhone] = useState('');
    const [id,setId]=useState('');
    console.log(id)
    console.log(userdetails);
    useEffect(() => {
        const apiUrl = `https://hrm-backend-square.onrender.com/api/allemployee`;

        axios.get(apiUrl)
            .then((response) => {
                const allEmployeeData = response.data;
                console.log(allEmployeeData)
                const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === user);
                console.log(specificEmployee)
                setUserDetails(specificEmployee);
                setfirstName(specificEmployee.name)
                setLastName(specificEmployee.lastname);
                setEmail(specificEmployee.email);
                setEmpId(specificEmployee.employeeid);
                setDepartment(specificEmployee.dept);
                setPhone(specificEmployee.mob)
                setId(specificEmployee._id);
            })
            .catch((error) => {
                console.error('Error fetching employee details:', error);
            });
    }, []);

    const handleUpdate=async()=>{
        try{
            const Updatedata={
                firstname,
                lastname,
                email,
                mob
            }
            await axios.put('https://hrm-backend-square.onrender.com/api/updateemployee/'+id,Updatedata);
        }
catch(error){
    console.log("Error Updating data",error)
}
    }
    return (
        <>
            {/* <Container>
                <div>
                    <Avatar sx={{ width: 50, height: 50, fontSize: '20px', fontWeight: '800' }}>
                        {userdetails.name}
                    </Avatar>
                </div>
                <TextContent>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
                        {userdetails.name} {userdetails.lastname}
                    </div>
                    <div style={{ fontSize: '13px' }}>
                        {userdetails.email}
                    </div>
                </TextContent>
            </Container> */}
            <CardContainer style={{ backgroundColor: '#f0f0f0' }}>
                <CoverImageUpload
                    type="file"
                    accept=".jpg, .png, .img, .jpeg"
                    id="coverImageInput"
                />
                <CoverImageContainer>

                </CoverImageContainer>
                <AvatarUpload htmlFor="avatarImageInput">
                    <input
                        type="file"
                        accept=".jpg, .png, .img,.jpeg"
                        id="avatarImageInput"
                        style={{ display: 'none' }}
                    />
                    <Profile sx={{ border: "3px solid white", width: 100, height: 100, fontSize: '40px', fontWeight: '800' }}></Profile>
                </AvatarUpload>
                <Grid container spacing={2} style={{
                    display: "flex",
                    justifyContent: 'space-around',
                    paddingInlineStart: "50px",
                    margin: '0px',
                    width: "100%"
                }}  >
                    <Grid item xs={6} md={5} style={{
                        padding: "0px",
                        display: 'flex',
                        justifyContent: "start",
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '18px', fontWeight: "bold", color: '#4D4C7D' }}>First Name</div>
                            <InputText value={firstname} onChange={(e)=>setfirstName(e.target.value)} />
                        </div>

                    </Grid>
                    <Grid item xs={6} md={5} style={{
                        padding: "0px",
                        display: 'flex',
                        justifyContent: "start",
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '18px', fontWeight: "bold", color: '#4D4C7D' }}>Last Name</div>
                            <InputText value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{
                        padding: "0px",
                        display: 'flex',
                        marginLeft: '23px',
                        justifyContent: "start",
                        marginBottom: '40px',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '18px', fontWeight: "bold", color: '#4D4C7D' }}>Email</div>
                            <InputText value={email} onChange={(e)=>setEmail(e.target.value)} style={{ width: '400px' }} />
                        </div>
                    </Grid>
                    <Grid item xs={6} md={5} style={{
                        padding: "0px",
                        display: 'flex',
                        justifyContent: "start",
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '18px', fontWeight: "bold", color: '#4D4C7D' }}>Employee ID</div>
                            <InputText value={empId} />
                        </div>
                    </Grid>
                
                    <Grid item xs={6} md={5} style={{
                        padding: "0px",
                        display: 'flex',
                        justifyContent: "start",
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '18px', fontWeight: "bold", color: '#4D4C7D' }}>Department</div>
                            <InputText value={department} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={5} style={{
                        padding: "0px",
                        display: 'flex',
                        justifyContent: "start",
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '18px', fontWeight: "bold", color: '#4D4C7D' }}>Phone No</div>
                            <InputText value={mob} onChange={(e)=>setPhone(e.target.value)} />
                        </div>
                    </Grid>
                </Grid>
                <div style={{display:'flex',justifyContent:'center'}}>
                <Button label='Save' style={{width:'100px'}} onClick={handleUpdate} />
                </div>
                
            </CardContainer>
        </>
    )
}

export default AccountSetting
