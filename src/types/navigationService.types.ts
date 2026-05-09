export type RootStackParamList = {
  // Auth Screens
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;

  VerifyOtp: {
    email: string;
  };

  ForgetPassword: undefined;

  SetNewPassword: {
    email: string;
    otp: string;
  };

  // Main Screens
  Home: undefined;
  Jobs: undefined;

  // Job Screens
  CreateJob: undefined;

  JobDetail: {
    id: string;
  };

  ReviewJob: {
    employee: {
      _id: string;
    name: string;
    profile_img?: {
        path?: string | undefined;
    }
    }, jobId:string
  };

  CompleteJob: {
    jobId: string;
    employeeId:string;
    customerId:string
  };

  // Profile Screens
  Profile: undefined;

  EditName: {
    currentName?: string;
  };

  EditEmail: {
    currentEmail?: string;
  };

  EditPassword: undefined;

  EmployeeProfile: {
    id: string;
  };

  // Product Screens
  Product: {
    id: string;
  };

  // Support & Info
  CustomerSupport: undefined;
  PrivacyPolicy: undefined;
  Faqs: undefined;
  Notifications: undefined;

  // Employee / Customer
  EmployeeHome: undefined;
  CustomerHome: undefined;
  App:undefined;

};