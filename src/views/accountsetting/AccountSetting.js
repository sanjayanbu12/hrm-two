import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';

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

  width: 100%;

  padding-bottom: 20px;
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
  const data = userdetails?.profilepic?.url;
  console.log(data);
  const [name, setfirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [empId, setEmpId] = useState('');
  const [department, setDepartment] = useState('');
  const [mob, setPhone] = useState('');
  const [coverimage, setCoverImage] = useState(userdetails?.coverpic?.url);
  const [avatarImage, setAvatarImage] = useState(data);
  console.log(avatarImage);
  const [id, setId] = useState('');
  const { employeeContextData } = useContext(ApiContext);
  const { formStatus, setStatus } = useContext(FormSubmittedContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employeeContextData;
        const allEmployeeData = response.data;

        const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === user);

        setUserDetails(specificEmployee);
        setfirstName(specificEmployee.name);
        setLastName(specificEmployee.lastname);
        setEmail(specificEmployee.email);
        setEmpId(specificEmployee.employeeid);
        setDepartment(specificEmployee.dept);
        setPhone(specificEmployee.mob);
        setId(specificEmployee._id);
        setAvatarImage(specificEmployee.profilepic?.url);
        setCoverImage(specificEmployee?.coverpic?.url);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchData();
  }, [employeeContextData]);

  const handleUpdate = async () => {
    try {
      const Updatedata = {
        name,
        lastname,
        email,
        mob
      };
      await axios.put('https://hrm-backend-square.onrender.com/api/updateemployee/' + id, Updatedata);
      setStatus(!formStatus);
    } catch (error) {
      console.log('Error Updating data', error);
    }
  };

  const handleUploadavatar = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('profile', file);

      try {
        // Send the image to the server
        const response = await axios.put('https://hrm-backend-square.onrender.com/api/profilepic/' + id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        setStatus(!formStatus);
        // Update the avatarImage state with the new image URL
        setAvatarImage(response.data.employeeData.profilepic.url);
      } catch (error) {
        console.log('Error uploading image', error);
      }
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('cover', file);

      try {
        // Send the image to the server
        const response = await axios.put('https://hrm-backend-square.onrender.com/api/coverpic/' + id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        setStatus(!formStatus);

        // Update the avatarImage state with the new image URL
        setCoverImage(response.data.employeeData?.coverpic?.url);
      } catch (error) {
        console.log('Error uploading image', error);
      }
    }
  };
  return (
    <>
      <CardContainer style={{ backgroundColor: '#f0f0f0' }}>
        <CoverImageContainer>
          <CoverImageUpload type="file" accept=".jpg, .png, .img, .jpeg" id="coverImageInput" onChange={handleCoverImageUpload} />
          {coverimage ? (
            <img src={coverimage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(to left, #ffffff 0%)`,
                objectFit: 'cover'
              }}
            />
          )}
        </CoverImageContainer>
        <AvatarUpload htmlFor="avatarImageInput">
          <input
            type="file"
            accept=".jpg, .png, .img,.jpeg"
            id="avatarImageInput"
            onChange={handleUploadavatar}
            style={{ display: 'none' }}
          />
          <Profile
            src={avatarImage}
            sx={{ border: '3px solid white', width: 100, height: 100, fontSize: '40px', fontWeight: '800' }}
          ></Profile>
        </AvatarUpload>
        <Grid
          container
          spacing={2}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingInlineStart: '50px',
            margin: '0px',
            width: '100%'
          }}
        >
          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>First Name</div>
              <InputText value={name} onChange={(e) => setfirstName(e.target.value)} />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Last Name</div>
              <InputText value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              // marginLeft: '47px',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Email</div>
              <InputText value={email}  />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Employee ID</div>
              <InputText value={empId}  />
            </div>
          </Grid>

          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Department</div>
              <InputText value={department} />
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Phone No</div>
              <InputText
                value={mob}
                onChange={(e) => {
                  // Get the input value and remove non-digit characters
                  let inputText = e.target.value.replace(/\D/g, '');

                  // Limit the input to 10 characters
                  if (inputText.length <= 10) {
                    setPhone(inputText);
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button
            label="Save"
            style={{ width: '150px', borderRadius: '5px', backgroundColor: '#4D4C7D', borderColor: '#4D4C7D' }}
            onClick={handleUpdate}
          />
        </div>
      </CardContainer>
    </>
  );
};

export default AccountSetting;
