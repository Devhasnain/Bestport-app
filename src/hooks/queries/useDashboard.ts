import { dashboardService } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";


export const useAnalytics = ()=>{
    return useQuery({
        queryKey:QUERY_KEYS.DASHBOARD_ANALYTICS,
        queryFn:()=>dashboardService.getAnalytics()
    })
}