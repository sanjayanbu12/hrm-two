import * as yup from 'yup';
export const userSchema = yup.object().shape({
    name:yup.string().required("Project Name is required"),
    powner:yup.string().required("Project Owner is required"),
    lead:yup.string().required("Project Owner is required"),
    scrum:yup.string().required("Project Owner is required"),
    status:yup.string().required("Project-Status is Required"),

})