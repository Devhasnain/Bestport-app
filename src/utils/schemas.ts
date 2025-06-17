import * as Yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .transform(value => (value ? value.trim() : ''))
    .required("Name is required"),
  email: Yup.string()
    .transform(value => (value ? value.trim() : ''))
    .email()
    .required("Email is required")
    .test(
      'is-valid-email',
      "Please enter a valid email",
      value => !!value && emailRegex.test(value),
    ),
  password: Yup.string()
    .transform(value => (value ? value.trim() : ''))
    .min(6, 'Invalid password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
      'Password must contain uppercase, lowercase, number, and special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .transform(value => (value ? value.trim() : ''))
    .oneOf([Yup.ref('password')], 'Password must match')
    .required('Confirm password is required.'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .transform(value => (value ? value.trim() : ''))
    .email()
    .required('Email is required')
    .test(
      'is-valid-email',
      "Please enter a valid email",
      value => !!value && emailRegex.test(value),
    ),
  password: Yup.string()
    .min(6, 'Enter a valid password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain uppercase, lowercase, number, and special character',
    )
    .required('Password is required'),
});