import axios from 'axios';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const ApiContainer = (props) => {
  const { setEmployeeContextData, setatsContextData, setrecruitmentContextData, setleaveContextData,setorgContextData,setmedialistContextData } = props;
  const { formStatus, recStatus, atsStatus, leaveStatus,orgStatus } = useContext(FormSubmittedContext);
  console.log('orgStatus', orgStatus);
  const fetchEmployee = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      setEmployeeContextData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAts = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/`);
      setatsContextData(res);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRec = async () => {
    try {
      const res = await axios.get('https://hrm-backend-square.onrender.com/rec/getRec');
      setrecruitmentContextData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLeave = async () => {
    try {
      const res = await axios.get('https://hrm-backend-square.onrender.com/api/leave/');
      setleaveContextData(res);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchOrg = async () => {
    try {
      const res = await axios.get('https://hrm-backend-square.onrender.com/org/getorg')
      setorgContextData(res)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMediaList = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/media/getAll');
      setmedialistContextData(response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, [formStatus]);
  useEffect(() => {
    fetchAts();
  }, [atsStatus]);
  useEffect(() => {
    fetchRec();
  }, [recStatus]);
  useEffect(() => {
    fetchLeave();
  }, [leaveStatus]);
  useEffect(() => {
    fetchOrg();
  }, [orgStatus]);
  return null;
};

export default ApiContainer;
