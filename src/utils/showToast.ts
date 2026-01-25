import { hideAlert, setAlert } from "@store/authSlice";
import { Toast } from "@components/index";
import { store } from "@store/index";


export const showToast = (message: string) => {
   Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM, { tapToDismissEnabled: true });
};

export const showAlert = (
   type="warning",
   title = 'Warning',
   msg = '',
) => {
   store.dispatch(setAlert({ type: type, title, message: msg }));
   setTimeout(() => {
      store.dispatch(hideAlert());
   }, 2000);
};

export const showErrorAlert = (title: string, msg: string) => {
   store.dispatch(setAlert({ type: 'error', title: title || "Error", message: msg }));
   setTimeout(() => {
      store.dispatch(hideAlert());
   }, 2000);
}