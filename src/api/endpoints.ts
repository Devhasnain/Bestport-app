const endpoints = {
    register: "/auth/register",
    login: "/auth/login",
    googleLogin: "/auth/google-auth",
    profile: "/auth/me",
    setFcm: "/auth/set-fcm",
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


};

export default endpoints;