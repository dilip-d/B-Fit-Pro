import * as yup from 'yup';

//password rule
const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const link =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

//schema
export const userSchema = yup.object().shape({
  fname: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Required'),
  lname: yup
    .string()
    .min(1)
    .max(20)
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed'),
  dob: yup.date().required('Required'),
  gender: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
    .required('Required'),
  password: yup
    .string()
    .min(5, 'password should contain 5-16 characters')
    .max(16, 'password should contain 5-16 characters')
    .matches(passwordRule, 'Please create a stronger password')
    .required('Required'),
  cpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Required'),
  weight: yup
    .number()
    .positive()
    .integer()
    .test('len', 'Weight should be maximum of 3 digits', val => /^\d{2}$/.test(val))
    .max(300)
    .required('Required'),
  height: yup
    .number()
    .positive()
    .integer()
    .test('len', 'Height should be maximum of 3 digits', val => /^\d{3}$/.test(val))
    .max(400)
    .required('Required'),
});
export const userUpdateSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
    .required('Required'),
});

export const trainerSchema = yup.object().shape({
  fname: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Required'),
  lname: yup
    .string()
    .min(1)
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Required'),
  dob: yup.date().required('Required'),
  gender: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
    .required('Required'),
  password: yup
    .string()
    .min(5)
    .max(16)
    .matches(passwordRule, 'please Create a stronger password')
    .required('Required'),
  cpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Required'),
  link: yup
    .string()
    .matches(link, 'Please paste a valid youtube link here')
    .required('Required'),
  // filef: yup
  // .string()
  // .required('Required'),
  // fileb: yup
  // .string()
  // .required('Required'),
});

export const editTrainerSchema = yup.object().shape({
  fname: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed'),
  lname: yup
    .string()
    .min(1)
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed'),
  link: yup
    .string()
    .matches(link, 'Please paste a valid youtube link here')
});