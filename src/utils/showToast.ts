import { useAlertStore } from "@/store/index";
import { Toast } from "@/components/index";


export const showToast = (message: string) => {
   Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM, { tapToDismissEnabled: true });
};

export const showAlert = (
   type = "warning",
   title = 'Warning',
   msg = '',
) => {
   useAlertStore.getState().setAlert({ type: type, title, message: msg });
   setTimeout(() => {
      useAlertStore.getState().hideAlert(null);
   }, 2000);
};

export const showErrorAlert = (title: string, msg: string) => {
   useAlertStore.getState().setAlert({ type: 'error', title: title || "Error", message: msg });
   setTimeout(() => {
      useAlertStore.getState().hideAlert(null);
   }, 2000);
}