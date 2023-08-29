import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  name: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  gender: yup.string().required('Gender is required'),
  dept: yup.string().required('Department is required'),
  desi: yup.string().required('Designation is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mob: yup.string().required('Mobile is required'),
  altmob: yup.string().required('Mobile is required'),
  bloodgroup: yup.string().required('Blood Group is required'),
  peraddress: yup.string().required('Address is required'),
  temaddress: yup.string().required('Address is required'),
  join: yup.string().required('Joining Date is required'),
  // report: yup.string().required('Reporting to is required'),
  dob: yup.string().required('DOB is required'),
  fathername: yup.string().required('Father Name is required'),
  nationality: yup.string().required('Nationality is required'),
  religion: yup.string().required('Religion is required'),
  type: yup.string().required('Work Type is required'),

});