import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supportService } from "@/services/supportService";
import { QUERY_KEYS } from "@/constants/api";


export const useCreateSupportRequest = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(payload:any)=>supportService.createRequest(payload),
        onSuccess:()=>queryClient.invalidateQueries({queryKey:QUERY_KEYS.HELP_REQUESTS_LIST({})})
    })
}