const endpoints = {
    register: "/auth/register",
    login: "/auth/login",
    googleLogin: "/auth/google-auth",
    profile: "/auth/me",
    registerDevice: "/auth/register-device",
    getFcm: "/auth/fcm",
    createJob: "/job/create",
    jobs: '/job',
    editName: '/auth/edit-name',
    editEmail: '/auth/edit-email',
    updatePassword: '/auth/edit-password',
    sendMailOtp: '/auth/send-otp',
    verifyMailOtp: '/auth/verify-otp',
    setNewPassword: '/auth/set-new-password',
    jobTickets: "/ticket/all",
    getTicketByJob: "/ticket/by-job",
    AcceptJobTicket: "/ticket/accept",
    rejectJobTicket: "/ticket/reject",
    getNotifications: "/notification",
    readNotification: "/notification/seen",
    getProducts:"/product/all",
    getEmployeeProfile:(id:string)=>`/user/profile?id=${id}`,
    getProductById:(id:string)=>`/product?id=${id}`,
    completedJob:(id:string)=>`/job/complete?id=${id}`,
    createJobReview:(jobId:string,employeeId:string)=>`/review/create?jobId=${jobId}&employeeId=${employeeId}`,
    createHelpRequest:"/help-request/create"

};

export default endpoints;