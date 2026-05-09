import { useUpdateHeartBeat } from "./queries";
import { useToggleOnline } from "./mutations";
import { useAuthStore } from "../store";


export const useAvailability = () => {
  const {
    accessToken,
    user,
  } = useAuthStore();

  const { mutate: toggleOnline, isPending: isToggling } = useToggleOnline();

  const isLoggedIn =
    !!accessToken && !!user;

  const isOnline =
    user?.is_online ?? false;

  /**
   * Heartbeat
   */
  const {isPending:isSyncing,data} = useUpdateHeartBeat(
    isLoggedIn && isOnline,
  );


  /**
   * Toggle availability
   */
  const setAvailable = async (
    available: boolean,
  ) => {
    toggleOnline(available)
  };

  /**
   * Logout cleanup
   */
  const setOfflineAndCleanup =
    () => {
      toggleOnline(false)
    };

  return {
    setAvailable,
    setOfflineAndCleanup,
    isToggling,
    isSyncing
  };
};