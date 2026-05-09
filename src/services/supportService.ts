import { HelpRequestsListPayload } from "../types";
import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const supportService = {
    getList:async(params:HelpRequestsListPayload)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.SUPPORT_REQUESTS.LIST(params));
        return response.data
    },
    createRequest:async(payload:any)=>{
        const response = await axiosInstance.post(API_ENDPOINTS.SUPPORT_REQUESTS.CREATE,payload);
        return response.data
    }
}