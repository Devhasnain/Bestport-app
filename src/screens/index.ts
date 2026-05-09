import { lazy } from 'react';

import Welcome from './welcome/Welcome';
import SignUp from './signup/SignUp';
// Auth Screens
import Login from './login/Login';
import Jobs from './jobs';
import Home from './home';


const VerifyOtp = lazy(() => import('./verifyOtp/VerifyOtp'));
const ForgetPassword = lazy(() => import('./forgetPassword/ForgetPassword'));
const SetNewPassword = lazy(() => import('./setNewPassword/SetNewPassword'));

// Job Screens
const CreateJob = lazy(() => import('./createJob/CreateJob'));
const JobDetail = lazy(() => import('./jobDetail/JobDetail'));
const ReviewJob = lazy(() => import('./reviewJob/ReviewJob'));
const CompleteJob = lazy(() => import('./completeJob'));

// Profile Screens
const EditName = lazy(() => import('./profile/EditName'));
const EditEmail = lazy(() => import('./profile/EditEmail'));
const EditPassword = lazy(() => import('./profile/EditPassword'));
const EmployeeProfile = lazy(() => import('./employeeProfile'));

// Product Screens
const ProductDetail = lazy(() => import('./productDetail'));

// Support & Info Screens
const CustomerSupport = lazy(() => import('./customerSupport/CustomerSupport'));
const PrivacyPolicy = lazy(() => import('./privacyPolicy/PrivacyPolicy'));
const Faqs = lazy(() => import('./faqs/Faqs'));
const Notifications = lazy(() => import('./notifications/Notifications'));
const Profile = lazy(() => import('./profile/Profile'));


export {
  // Auth
  Login,
  SignUp,
  Welcome,
  VerifyOtp,
  ForgetPassword,
  SetNewPassword,
  // Jobs
  CreateJob,
  JobDetail,
  ReviewJob,
  CompleteJob,
  // Profile
  EditName,
  EditEmail,
  EditPassword,
  EmployeeProfile,
  // Product
  ProductDetail,
  // Support & Info
  CustomerSupport,
  PrivacyPolicy,
  Faqs,
  Notifications,
  Profile,
  Home,
  Jobs
};