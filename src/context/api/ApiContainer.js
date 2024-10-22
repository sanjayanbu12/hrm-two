import axios from 'axios';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const ApiContainer = (props) => {
  const { setEmployeeContextData, setatsContextData, setrecruitmentContextData, setleaveContextData,setorgContextData,setmedialistContextData,seteventContextData,settravelData,setGetProcruitment } = props;
  const { formStatus, recStatus, atsStatus, leaveStatus,orgStatus,eventStatus,travelget,procget} = useContext(FormSubmittedContext);
  console.log('eventStatus', eventStatus);
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
      console.log(response)
      setmedialistContextData(response)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEvent = async () => {
    try {
      const res = await axios.get('https://hrm-backend-square.onrender.com/event/getall');
      seteventContextData(res)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTravel = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/travel/getall');
     console.log("responsezzz",response.data.data)
      settravelData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  const Procruitmentget = async () => {
    try {
      const api = await axios.get('https://hrm-backend-square.onrender.com/proc/getall');
      console.log("procget",api)
      setGetProcruitment(api.data.data); 
    } catch (error) {
      console.error('Error for get', error);}};

  useEffect(() => {
    fetchMediaList();
  }, [eventStatus]);
  useEffect(() => {
    fetchEvent();
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
  useEffect(() => {
    fetchTravel();
  }, [travelget]);
  useEffect(() => {
    Procruitmentget();
  }, [procget]);
  return null;
};

export default ApiContainer;
