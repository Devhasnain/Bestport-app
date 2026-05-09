import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const dashboardService = {
    getAnalytics:async()=>{
        const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD_ANALYTICS.ANALYTICS);
        return response.data
    }
}