import { Toast } from "@components/index";

export const showToast = (message:string) => {
   Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM, {tapToDismissEnabled:true});
};