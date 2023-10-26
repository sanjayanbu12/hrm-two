import axios from 'axios';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const ApiContainer = ({ setEmployeeContextData }) => {
  const {formStatus}=useContext(FormSubmittedContext)
  console.log(formStatus)
  const fetchEmployee = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      setEmployeeContextData(response);
      console.log('responsecontext', response);
    } catch (error) {
      console.log(error);
    } 
  };
  useEffect(() => {
    fetchEmployee();
  }, [formStatus]);
  return null;
};

export default ApiContainer;
