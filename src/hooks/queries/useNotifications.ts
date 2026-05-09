import { notificationService } from "@/services/index";
import { PAGINATION_DEFAULT } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";


export const useNotifications = (params:PAGINATION_DEFAULT)=>{
    return useQuery({
        queryKey:QUERY_KEYS.NOTIFICATIONS_LIST(params),
        queryFn:()=>notificationService.getList(params)
    })
}