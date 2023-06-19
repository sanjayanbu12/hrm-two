import * as yup from 'yup';
export const userSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("Email is required"),
    password:yup.string().required("password is required")
})