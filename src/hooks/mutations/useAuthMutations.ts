import { AppleLoginPayload, GoogleLoginPayload, LoginPayload, SetPasswordPayload, SignUpPayload, VerifyOtpPayload } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replace } from "@/navigation/NavigationService";
import { authService } from "@/services/index";
import { useAuthStore } from "@/store/index";
import { QUERY_KEYS } from "@/constants/api";


export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setAccessToken)
    return useMutation({
        mutationFn: (payload: LoginPayload) => authService.login(payload),
        onSuccess: async (data) => setToken(data.data.token)
    })
}

export const useSignUp = () => {
    const setToken = useAuthStore((state) => state.setAccessToken)
    return useMutation({
        mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
        onSuccess: async (data) => setToken(data.data.token)
    })
}

export const useAppleLogin = () => {
    const setToken = useAuthStore((state) => state.setAccessToken)
    return useMutation({
        mutationFn: (payload: AppleLoginPayload) => authService.appleLogin(payload),
        onSuccess: async (data) => setToken(data.data.token)
    })
}

export const useGoogleLogin = () => {
    const setToken = useAuthStore((state) => state.setAccessToken)
    return useMutation({
        mutationFn: (payload: GoogleLoginPayload) => authService.googleLogin(payload),
        onSuccess: async (data) => setToken(data.data.token)
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (payload: { email: string }) => authService.forgotPassword(payload),
    })
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    })
}

export const useSetPassword = () => {
    return useMutation({
        mutationFn: (payload: SetPasswordPayload) => authService.setNewPassword(payload),
    })
}

export const useGetProfile = () => {
    const { setUser, setLoading, setLastAuthenticated, logout } = useAuthStore();

    return useMutation({
        mutationFn: () => authService.getProfile(),
        onSuccess: (data) => {
            setUser(data?.data?.user);
            setLastAuthenticated(Date.now());
            setLoading(false);
            replace('App');
        },
        onError: () => {
            logout();
            setLoading(false);
            replace('Welcome');
        }
    })
}

export const useToggleOnline = () => {
    const queryClient = useQueryClient();
    const { setUser, user } = useAuthStore();
    return useMutation({
        mutationFn: (is_online: boolean) => authService.toggleOnline(is_online),
        onSuccess: (data: any) => {
            if (user) setUser({ ...user, is_online: data?.data?.is_online })

            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HEART_BEAT })
        }
    })
}

export const useDeleteAccout = ()=>{
    return useMutation({
        mutationFn:(val?:any)=>authService.deleteAccount()
    })
}