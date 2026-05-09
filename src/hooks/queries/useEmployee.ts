import { profileService } from "@/services/profileService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";


export const useEmployee = (id:string)=>{
    return useQuery({
        queryKey:QUERY_KEYS.EMPLOYEE_PROFILE(id),
        queryFn:()=>profileService.getEmployeeProfile(id)
    })
}