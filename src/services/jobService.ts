import { CreateJobPayload, JobsListParams, JobTicketListParams } from "../types";
import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const jobService = {
    getList: async (params: JobsListParams) => {
        const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST(params))
        return response.data
    },
    getById:async (id:string)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.JOBS.GET(id));
        return response.data
    },
    getTicketsList:async(params:JobTicketListParams)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.JOBS.TICKETS_LIST(params));
        return response.data
    },
    acceptJobTicket:async(id:string)=>{
        const response = await axiosInstance.put(API_ENDPOINTS.JOBS.ACCEPT_JOB_TICKET(id))
        return response.data
    },
    rejectJobTicket:async(id:string)=>{
        const response = await axiosInstance.put(API_ENDPOINTS.JOBS.REJECT_JOB_TICKET(id))
        return response.data
    },
    createJob:async(data:CreateJobPayload)=>{
        const response= await axiosInstance.post(API_ENDPOINTS.JOBS.CREATE,data)
        return response.data
    },
    completeJob:async(data:any)=>{
        const response = await axiosInstance.put(API_ENDPOINTS.JOBS.COMPLETE_JOB,data)
        return response.data
    },
    reviewJob:async(data:any,jobId: string, employeeId: string)=>{
        const response = await axiosInstance.post(API_ENDPOINTS.REVIEW.CREATE(jobId,employeeId),data)
        return response.data
    }
}