import { authService } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";


export const useUpdateHeartBeat = (enabled:boolean) => {
    return useQuery({
        queryKey: QUERY_KEYS.HEART_BEAT,
        queryFn: () => authService.updateHeartBeat(),
        enabled,

        refetchInterval: 30000,

        refetchIntervalInBackground: false,

        retry: false,

        refetchOnReconnect: true,

        refetchOnWindowFocus: true,

    })
}