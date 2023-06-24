import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  Jobrole: yup.string().required('Jobrole is required'),
  Openings: yup.string().required('No of Opening is required'),
  Company: yup.string().required('Company is required'),
  Status: yup.string().required('Status is required'),
  Description: yup.string().required('Description is required'),
  Requirements: yup.string().required('Requirements is required'),
  Experience: yup.string().required('Experience is required'),
  Deadline: yup.string().required('Deadline is required'),
  Worktype: yup.string().required('Worktype is required'),
  Skills: yup.string().required('Skills is required'),
  Education: yup.string().required('Education is required'),
  Location: yup.string().required('Location is required')
});
export default validationSchema;
