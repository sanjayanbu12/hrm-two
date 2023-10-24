// actions.js
import axios from 'axios';
import { FETCH_EMPLOYEES } from './actions';

export const fetchEmployeesSuccess = (employees) => {
  return {
    type: FETCH_EMPLOYEES,
    payload: employees
  };
};

export const fetchEmployees = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://pulsehr-express-server.onrender.com/api/allemployee');
      const employees = response.data.reverse(); // Reverse the data if needed
      dispatch(fetchEmployeesSuccess(employees));
    } catch (error) {
      console.log(error);
    }
  };
};
