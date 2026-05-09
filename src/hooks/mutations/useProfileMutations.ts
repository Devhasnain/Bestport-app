import { profileService } from "@/services/profileService";
import { useMutation } from "@tanstack/react-query";


export const useUpdateName = ()=>{
    return useMutation({
        mutationFn:(payload:{name:string})=>profileService.updateName(payload)
    })
}


export const useUpdateEmail = ()=>{
    return useMutation({
        mutationFn:(payload:{email:string})=>profileService.updateEmail(payload)
    })
}