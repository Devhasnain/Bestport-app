import { PAGINATION_DEFAULT } from "../types";
import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const notificationService = {
    getList:async (params:PAGINATION_DEFAULT)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.LIST(params))
        return response.data
    },
    readNotification:async(id:string):Promise<void>=>{
        const response = await axiosInstance.put(API_ENDPOINTS.NOTIFICATIONS.READ(id))
        return response.data
    }
}