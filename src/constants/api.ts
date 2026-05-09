import { HelpRequestsListPayload, JobsListParams, JobTicketListParams, PAGINATION_DEFAULT, ProductsListParams } from "../types";


// API Endpoints
export const API_ENDPOINTS = {

  SUPPORT_REQUESTS:{
    CREATE:`/help-request/create`,
    LIST:(params:HelpRequestsListPayload)=>`/help-request/all?page=${params.page}&limit=${params.limit}`
  },

  DASHBOARD_ANALYTICS:{
    ANALYTICS:"/user/dashboard-analytics"
  },

  NOTIFICATIONS:{
    LIST:(params:PAGINATION_DEFAULT)=>`/notification?limit=${params.limit}&page=${params.page}`,
    DELETE:(id:string)=>`/notification/delete?id=${id}`,
    READ:(id:string)=>`/notification/seen?id=${id}`
  },

  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    PROFILE: 'auth/me',
    UPDATE_NAME:"/auth/edit-name",
    UPDATE_EMAIL:"/auth/edit-email",
    UPDATE_PASSWORD:"/auth/edit-password",
    REGISTER: '/auth/register',
    GOOGLE_LOGIN:'/auth/google-auth',
    APPLE_LOGIN:'/auth/apple-auth',
    REGISTER_DEVICE:'/auth/register-device',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/otp/resend',
    SEND_OTP:"/auth/send-otp",
    LOGOUT: '/auth/logout',
    UPDATE_PROFILE:(id:string)=> `/admin/update-profile/${id}`,
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/set-new-password',
    DELETE_ACCOUNT:'/auth/delete-account'
  },

  ONLINE:{
    TOGGLE_ONLINE:'/online/update',
    UPDATE_HEARTBEAT:'/online/update-heartbeat'
  },

  EMPLOYEES:{
    PROFILE:(id:string)=>`/user/profile?id=${id}`,
    ONLINE_EMPLOYEES:"admin/online-users",
  },

  JOBS:{
    CREATE:`/job/create`,
    GET:(id:string)=>`/job/${id}`,
    LIST:(params:JobsListParams)=>`/job?limit=${params.limit}&page=${params.page}&status=${params.status}`,
    TICKETS_LIST:(params:JobTicketListParams)=>`/ticket/all?user=${params.id}&active=true&status=assigned&page=${params.page}&limit=${params.limit}`,
    ACCEPT_JOB_TICKET:(id:string)=>`/ticket/accept?ticketId=${id}`,
    REJECT_JOB_TICKET:(id:string)=>`/ticket/reject?ticketId=${id}`,
    COMPLETE_JOB:'/job/complete'
  },

  REVIEW:{
    CREATE:(jobId:string,employeeId:string)=>`/review/create?jobId=${jobId}&employeeId=${employeeId}`
  },

  // Products
  PRODUCTS: {
    LIST:(params:ProductsListParams)=>`/product/all?page=${params.page}&limit=${params.limit}&search=${params.search}`,
    GET: (id: string) => `/product?id=${id}`,
  },

};

// Query Keys
export const QUERY_KEYS = {

  HELP_REQUEST:[`help-request`],
  HELP_REQUESTS_LIST:(params:HelpRequestsListPayload)=>[`help-request`,'list',params],

  PROFILE: ['user-profile'],

  HEART_BEAT:['last-heartbeat'],

  USER_PROFILE:(id:string)=>['user-profile-by-id',id],

  DASHBOARD_ANALYTICS:['dashboard-analytics'],

  ONLINE_EMPLOYEES_LIST:['online-employees-list'],
  EMPLOYEES:['employees'],
  EMPLOYEE_PROFILE:(id:string)=>['employees','profile',id],

  CUSTOMERS:'customers',

  NOTIFICATIONS:['notifications'],
  NOTIFICATIONS_LIST:(params:PAGINATION_DEFAULT)=>['notifications',params],

  JOBS: 'job',
  JOBS_LIST: (params: JobsListParams) => ['job', params],
  JOB_TICKETS_LIST: (params: JobTicketListParams) => ['job-tickets', params],
  JOBS_DETAIL: (id: string) => ['jobs', id],

  PRODUCTS: 'products',
  PRODUCTS_LIST: (params: ProductsListParams) => ['products','list', params],
  PRODUCTS_DETAIL: (id: string) => ['products', id],

};

// Pagination
export const PAGINATION_DEFAULTS = {
  limit: 10,
  page: 0,
  total: 0,
  totalPages: 0,
};
