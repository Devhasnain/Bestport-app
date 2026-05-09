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

  API_KEYS: {
    LIST: "/admin/get-api-keys",
    CREATE: "/admin/create-api-key",
    DELETE: "/admin/delete-api-key/"
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
    // EMPLOYEES_LIST:(params:PAGINATION_DEFAULT)=>`/admin/employees?limit=${params.limit}&page=${params.page}`,
    CREATE:"/admin/create-employee",
    UPDATE:(id:string)=>`/admin/update-employee?id=${id}`
  },

  CUSTOMERS:{
    // LIST:(params:PAGINATION_DEFAULT)=>`/admin/customers?limit=${params.limit}&page=${params.page}`,
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
    // LIST:(params:ProductsListParams)=> `/product/all?limit=${params.limit}&page=${params.page}`,
    GET: (id: string) => `/product?id=${id}`,
    CREATE: '/product/create',
    UPDATE: (id: string) => `/product/edit?id=${id}`,
    DELETE: (id: string) => `/product/delete?id=${id}`,
  },

  // Images
  IMAGES: {
    LIST: '/image',
    UPLOAD: '/image',
    UPLOAD_MULTIPLE: "/image/multiple-images",
    DELETE_MULTIPLE: "/image/multiple-delete",
    DELETE: (id: string) => `/image/${id}`,
  },

  // Orders
  ORDERS: {
    LIST: '/orders',
    GET: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
  },

  // Users
  USERS: {
    LIST: '/user/list',
    GET: (id: string) => `/admin/user/${id}`,
    CREATE: '/user',
    UPDATE: (id: string) => `/user/${id}`,
    DELETE: (id: string) => `/user/${id}`,
    UPDATE_PROFILE: `user/update-profile`,
    UPDATE_PASSWORD: `user/update-password`
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
    GET: (id: string) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },

  // Roles
  ROLES: {
    LIST: '/roles',
    GET: (id: string) => `/roles/${id}`,
    CREATE: '/roles',
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
  },

  // Settings
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
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

  API_KEYS_LIST: ['api-keys-list'],

  ONLINE_EMPLOYEES_LIST:['online-employees-list'],
  EMPLOYEES:['employees'],
  EMPLOYEE_PROFILE:(id:string)=>['employees','profile',id],
  // EMPLOYEES_LIST:(params:PAGINATION_DEFAULT)=>['employees',params],

  CUSTOMERS:'customers',
  // CUSTOMERS_LIST:(params:PAGINATION_DEFAULT)=>['customers',params],

  NOTIFICATIONS:['notifications'],
  NOTIFICATIONS_LIST:(params:PAGINATION_DEFAULT)=>['notifications',params],

  JOBS: 'job',
  JOBS_LIST: (params: JobsListParams) => ['job', params],
  JOB_TICKETS_LIST: (params: JobTicketListParams) => ['job-tickets', params],
  JOBS_DETAIL: (id: string) => ['jobs', id],

  PRODUCTS: 'products',
  PRODUCTS_LIST: (params: ProductsListParams) => ['products','list', params],
  PRODUCTS_DETAIL: (id: string) => ['products', id],

  //   IMAGES: ['image'],
  //   IMAGES_LIST:(params:ImagesListParams)=> ['image', params],

  //   ORDERS: 'orders',
  //   ORDERS_LIST: ['orders'],
  //   ORDERS_DETAIL: (id: string) => ['orders', id],

  //   USERS: 'users',
  //   USERS_LIST:(params:UserListParams)=> ['users','list', params],
  //   USERS_DETAIL: (id: string) => ['users', id],
  //   USER_PROFILE:["userProfile"],

  CATEGORIES: 'categories',
  CATEGORIES_LIST: ['categories'],
  CATEGORIES_DETAIL: (id: string) => ['categories', id],

  ROLES: 'roles',
  ROLES_LIST: ['roles'],
  ROLES_DETAIL: (id: string) => ['roles', id],

  SETTINGS: ['settings'],
};

// Pagination
export const PAGINATION_DEFAULTS = {
  limit: 10,
  page: 0,
  total: 0,
  totalPages: 0,
};
