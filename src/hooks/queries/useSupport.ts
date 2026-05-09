import { HelpRequestsListPayload } from "@/types/SupportRequest.types";
import { supportService } from "@/services/supportService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";


export const useSupport = (params:HelpRequestsListPayload)=>{
    return useQuery({
        queryKey:QUERY_KEYS.HELP_REQUESTS_LIST(params),
        queryFn:()=>supportService.getList(params)
    })
}