import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  Jobrole: yup.string().required('Jobrole is required'),
  Openings: yup.string().required('No of Opening is required'),
  Company: yup.string().required('Company is required'),
  ApplicationLink: yup.string().required('Link is required'),
  ExperienceFrom: yup.string().required('ExperienceFrom is required'),
  ExperienceTo: yup.string().required('ExperienceTo is required'),
  Deadline: yup.string().required('Deadline is required'),
  Worktype: yup.string().required('Worktype is required'),
  Skills: yup.string().required('Skills is required'),
  Education: yup.string().required('Education is required'),
  Location: yup.string().required('Location is required'),
  Year: yup.string().required('Year is required'),
  Clientname: yup.string().required('Clientname is required'),
  Clientcompany: yup.string().required('Client Company is required'),
  Hrname: yup.string().required('HR Name is required'),
  Hrcontact: yup.string().required('HR Contact is required'),

Interviewrounds: yup.string().required('Interview Rounds is required'),

});
export default validationSchema;
