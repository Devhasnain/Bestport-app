import { AppleLoginPayload, GoogleLoginPayload, LoginPayload, LoginResponse, SetPasswordPayload, SignUpPayload, VerifyOtpPayload } from "../types";
import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const authService = {
    login:async (payload:LoginPayload):Promise<LoginResponse>=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN,payload)
        return response.data
    },
    signUp:async (payload:SignUpPayload):Promise<LoginResponse>=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER,payload)
        return response.data
    },
    appleLogin:async (payload:AppleLoginPayload):Promise<LoginResponse>=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.APPLE_LOGIN,payload)
        return response.data
    },
    googleLogin:async (payload:GoogleLoginPayload):Promise<LoginResponse>=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN,payload)
        return response.data
    },
    forgotPassword: async (payload:{email:string})=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SEND_OTP,payload)
        return response.data
    },
    verifyOtp: async (payload:VerifyOtpPayload)=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_OTP,payload)
        return response.data
    },
    setNewPassword: async (payload:SetPasswordPayload)=>{
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD,payload)
        return response.data
    },
    getProfile:async ()=>{
        const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
        return response.data
    },
    toggleOnline:async(is_online:boolean)=>{
        const response= await axiosInstance.put(API_ENDPOINTS.ONLINE.TOGGLE_ONLINE,{is_online})
        return response.data
    },
    updateHeartBeat:async()=>{
        const response= await axiosInstance.put(API_ENDPOINTS.ONLINE.UPDATE_HEARTBEAT)
        return response.data
    },
    deleteAccount:async():Promise<any>=>{
        const response = await axiosInstance.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT)
        return response.data
    }
}