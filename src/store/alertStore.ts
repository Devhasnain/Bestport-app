import { create } from "zustand";


export interface AlertState {
    alert: {
        type: string,
        title: string,
        message: string,
    } | null;
    setAlert: (val: any) => void;
    hideAlert:(val:any)=>void
}

export const useAlertStore = create<AlertState>()(
    (set) => ({
        alert: null,
        setAlert: (alert) => set({ alert }),
        hideAlert:(alert)=>set({alert:null})
    })
)