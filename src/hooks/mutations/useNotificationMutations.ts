import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/index";
import { QUERY_KEYS } from "@/constants/api";


export const useReadNotification = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>notificationService.readNotification(id),
        onSuccess:()=>queryClient.invalidateQueries({queryKey:QUERY_KEYS.NOTIFICATIONS_LIST({})})
    })
}