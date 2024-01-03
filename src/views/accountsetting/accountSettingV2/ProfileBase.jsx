import { Box } from '@mui/system';
import { React, useState, useEffect, useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import Grid from '@mui/material/Unstable_Grid2';
import { StyledSmallText, InputText, SaveButton } from './AccountSettingStyled';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProfileBase = () => {
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
        setemergencyContact(specificEmployee.emergencyContact);
        setId(specificEmployee._id);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchData();
  }, [employeeContextData, user]);

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

  return (
    <>
      <Box>
        <Grid container flexDirection={'column'}>
          <Grid xs={12}>
            <StyledSmallText>First Name</StyledSmallText>
            <InputText value={name} onChange={(e) => setfirstName(e.target.value)} type="text" />
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>Last Name</StyledSmallText>
            <InputText value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" />
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>E-mail</StyledSmallText>
            <InputText value={email} type="text" disabled="disabled" />
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>Employee Id</StyledSmallText>
            <InputText value={empId} type="text" disabled="disabled" />
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>Department</StyledSmallText>
            <InputText value={department} type="text" disabled="disabled" />
          </Grid>
          <Grid xs={12}>
            <StyledSmallText style={{ marginTop: '10px' }}>Phone No</StyledSmallText>
            <InputText
              value={mob}
              onChange={(e) => {
                let inputText = e.target.value.replace(/\D/g, '');
                if (inputText.length <= 10) {
                  setPhone(inputText);
                }
              }}
              style={{ marginTop: '10px' }}
              type="text"
            />
          </Grid>
          <Grid xs={12}>
            <SaveButton onClick={handleUpdate}>Save Changes</SaveButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileBase;
