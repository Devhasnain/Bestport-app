import { CreateJobPayload, ReviewJobPayload } from "@/types/job.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobService } from "@/services/jobService";
import { QUERY_KEYS } from "@/constants/api";


export const useCreateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: CreateJobPayload) => jobService.createJob(params),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.JOBS_LIST({}) })
    })
}

export const useAcceptJobTicket = (jobId: string, userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => jobService.acceptJobTicket(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS_DETAIL(jobId), QUERY_KEYS.JOB_TICKETS_LIST({ id: userId }), QUERY_KEYS.JOBS_LIST({})] })
    })
}

export const useRejectJobTicket = (jobId: string, userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => jobService.rejectJobTicket(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS_DETAIL(jobId), QUERY_KEYS.JOB_TICKETS_LIST({ id: userId })] })
    })
}

export const useCompleteJob = (jobId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => jobService.completeJob(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD_ANALYTICS,QUERY_KEYS.JOBS_DETAIL(jobId), QUERY_KEYS.JOBS_LIST({})] })
    })
}

export const useReviewJob = (jobId:string,employeeId:string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, jobId, employeeId }: ReviewJobPayload) => jobService.reviewJob(data, jobId, employeeId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS_LIST({}),QUERY_KEYS.JOBS_DETAIL(jobId),QUERY_KEYS.EMPLOYEE_PROFILE(employeeId)] })
    })
}