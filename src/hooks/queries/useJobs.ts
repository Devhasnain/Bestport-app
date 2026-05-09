import { JobsListParams, JobTicketListParams } from "@/types/index";
import { jobService } from "@/services/jobService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";


export const useJobs = (params:JobsListParams)=>{
    return useQuery({
        queryKey:QUERY_KEYS.JOBS_LIST(params),
        queryFn:()=>jobService.getList({
            ...params,
            status:params?.status === null ? "all" : params?.status
        })
    })
}

export const useJobById=(id:string)=>{
    return useQuery({
        queryKey:QUERY_KEYS.JOBS_DETAIL(id),
        queryFn:()=>jobService.getById(id)
    })
}

export const useJobTickets = (params:JobTicketListParams)=>{
    return useQuery({
        queryKey:QUERY_KEYS.JOB_TICKETS_LIST(params),
        queryFn:()=>jobService.getTicketsList(params),
        refetchInterval:300000,
        refetchOnWindowFocus:true
    })
}