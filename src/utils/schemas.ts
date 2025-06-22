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

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .transform(value => (value ? value.trim() : ''))
    .email()
    .required("Email is required")
    .test(
      'is-valid-email',
      "Please enter a valid email",
      value => !!value && emailRegex.test(value),
    ),
});


export const setNewPasswordSchema = Yup.object().shape({
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


export const createJobSchema = Yup.object().shape({
  service_type: Yup.string()
    .max(50, 'Service type cannot exceed 50 characters')
    .required('Service type is required'),

  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Title is required'),

  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters')
    .required('Description is required'),

  preferred_date: Yup.date()
    .min(new Date(Date.now() + 60 * 60 * 1000), 'Preferred date must be at least 1 hour from now')
    .required('Preferred date is required'),

  urgency: Yup.string()
    .oneOf(['Low', 'Medium', 'High'], 'Invalid urgency level')
    .max(10, 'Urgency cannot exceed 10 characters')
    .required('Urgency level is required'),

  city: Yup.string()
    .max(100, 'City name cannot exceed 100 characters')
    .required('City is required'),

  post_code: Yup.string()
    .matches(/^\d{4,6}$/, 'Post code must be 4 to 6 digits')
    .required('Post code is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address cannot exceed 255 characters')
    .required('Address is required'),

  instructions: Yup.string()
    .max(500, 'Instructions cannot exceed 500 characters')
    .optional(),
});
