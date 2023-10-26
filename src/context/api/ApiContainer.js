import axios from 'axios';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const ApiContainer = (props) => {
  const { setEmployeeContextData, setatsContextData, setrecruitmentContextData, setleaveContextData } = props;
  const { formStatus, recStatus, atsStatus, leaveStatus } = useContext(FormSubmittedContext);
  console.log('leaveStatus', leaveStatus);
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
  return null;
};

export default ApiContainer;
