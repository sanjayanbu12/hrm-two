import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  name: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  company: yup.string().required('Company is required'),
  dept: yup.string().required('Department is required'),
  desi: yup.string().required('Designation is required'),
  mail: yup.string().email('Invalid email').required('Email is required'),
  mob: yup.string().required('Mobile is required'),
  join: yup.string().required('Joining Date is required'),
  report: yup.string().required('Reporting to is required'),
  dob: yup.string().required('DOB is required'),
  type: yup.string().required('Work Type is required')
});
