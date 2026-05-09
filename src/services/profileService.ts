import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const profileService = {
    updateName:async (payload:{name:string})=>{
        const response = await axiosInstance.put(API_ENDPOINTS.AUTH.UPDATE_NAME,payload);
        return response.data
    },
     updateEmail:async (payload:{email:string})=>{
        const response = await axiosInstance.put(API_ENDPOINTS.AUTH.UPDATE_EMAIL,payload);
        return response.data
    },
     updatePassword:async (payload:{name:string})=>{
        const response = await axiosInstance.put(API_ENDPOINTS.AUTH.UPDATE_PASSWORD,payload);
        return response.data
    },
    getEmployeeProfile:async(id:string)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.EMPLOYEES.PROFILE(id));
        return response.data
    }
}