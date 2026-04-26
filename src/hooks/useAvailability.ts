import { setUserOfflineOnLogout } from '@utils/setUserOfflineOnLogout';
import { useEffect, useRef, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AppState } from 'react-native';
import { store } from '@store/index';

import baseApi, { endpoints } from '../api';


export function useAvailability(onStatusSync?: (isOnline: boolean) => void) {
  const heartbeatRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);
  const isOnlineRef = useRef(false);
  const wasConnectedRef = useRef(true);
  const onStatusSyncRef = useRef(onStatusSync);

  useEffect(() => {
    onStatusSyncRef.current = onStatusSync;
  }, [onStatusSync]);

    const isUserLoggedIn = useCallback(() => {
    const token = store?.getState()?.auth?.token;
    const user = store?.getState()?.auth?.user;
    return !!(token && user);
  }, []);

  // ─── Heartbeat ────────────────────────────────────────────────
  const startHeartbeat = useCallback(() => {
    if (!isUserLoggedIn()) return; 
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);

    // console.log('[heartbeat] Started');
    heartbeatRef.current = setInterval(async () => {

      // Guard — agar offline ho gaya to heartbeat mat bhejo
      if (!isOnlineRef.current) {
        // console.warn('[heartbeat] Skipping — user is offline');
        return;
      }

      try {
        await baseApi.put(endpoints.updateOnlineHeartbeat, {}, {
          headers: { Authorization: `Bearer ${store?.getState()?.auth?.token}` },
        });
        // console.log('[heartbeat] Sent at', new Date().toLocaleTimeString());
      } catch (e) {
        // console.warn('[heartbeat] Failed — network issue');
        stopHeartbeat();
      }
    }, 30_000);
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
      // console.log('[heartbeat] Stopped');
    }
  }, []);

  // ─── Toggle Online/Offline ─────────────────────────────────────
  const setAvailable = useCallback(async (available: 'online' | 'offline') => {
    try {
      await baseApi.put(endpoints.toggleOnline, {
        is_online: available === 'online',
      }, {
        headers: { Authorization: `Bearer ${store?.getState()?.auth?.token}` },
      });

      // ✅ Pehle ref update — taake heartbeat guard kaam kare
      isOnlineRef.current = available === 'online';

      if (available === 'online') {
        startHeartbeat();
      } else {
        stopHeartbeat();
      }

      // console.log(`[availability] Status set to: ${available}`);
    } catch (e) {
      // console.error('[availability] setAvailable failed:', e);
      throw e;
    }
  }, [startHeartbeat, stopHeartbeat]);

  // ─── Server se sync ────────────────────────────────────────────
  const syncStatusFromServer = useCallback(async () => {
    try {
      if (!isUserLoggedIn()) return;
      const res = await baseApi.get(endpoints.profile, {
        headers: { Authorization: `Bearer ${store?.getState()?.auth?.token}` },
      });

      const serverIsOnline = res?.data?.data?.user?.is_online ?? false;

      // ✅ Pehle ref update
      isOnlineRef.current = serverIsOnline;

      // UI update karo
      onStatusSyncRef.current?.(serverIsOnline);

      if (serverIsOnline) {
        startHeartbeat();
      } else {
        stopHeartbeat();
      }

      // console.log(`[availability] Synced from server: ${serverIsOnline}`);
    } catch (e) {
      // console.error('[availability] syncStatusFromServer failed:', e.message);
    }
  }, [startHeartbeat, stopHeartbeat]);

  // ─── Mount pe ek baar sync ─────────────────────────────────────
  useEffect(() => {
    if (!isUserLoggedIn()) return; 
    syncStatusFromServer();
  }, []);

  // ─── Network drop / recovery ───────────────────────────────────
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const isConnected = !!(state.isConnected && state.isInternetReachable);

      // Network wapas aaya
      if (isConnected && wasConnectedRef.current === false) {
        // console.log('[availability] Network recovered — syncing...');
        await syncStatusFromServer();
      }

      // Network gaya
      if (!isConnected && wasConnectedRef.current === true) {
        // console.log('[availability] Network lost — heartbeat stopped');
        stopHeartbeat();
        // ✅ isOnlineRef same rehta — recovery pe resume hoga
      }

      wasConnectedRef.current = isConnected;
    });

    return () => unsubscribe();
  }, []);

  // ─── App background / foreground ──────────────────────────────
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextState) => {
      const prevState = appStateRef.current;
      appStateRef.current = nextState;

      // Foreground mein aaya
      if (
        (prevState === 'background' || prevState === 'inactive') &&
        nextState === 'active'
      ) {
        // console.log('[availability] App foregrounded — syncing...');
        await syncStatusFromServer();
      }

      // Background mein gaya
      if (
        prevState === 'active' &&
        (nextState === 'background' || nextState === 'inactive')
      ) {
        // console.log('[availability] App backgrounded');

        // ✅ Pehle ref false karo — heartbeat guard fire nahi karega
        isOnlineRef.current = false;
        stopHeartbeat();

        if (isOnlineRef.current) {
          try {
            await baseApi.put(endpoints.toggleOnline, { is_online: false }, {
              headers: { Authorization: `Bearer ${store?.getState()?.auth?.token}` },
            });
          } catch (e) {
            // Silent fail — cron 90s baad handle karega
          }
        }
      }
    });

    return () => {
      subscription.remove();
      stopHeartbeat();
    };
  }, []);

  // ─── Logout cleanup ───────────────────────────────────────────
  const setOfflineAndCleanup = useCallback(async () => {
    // ✅ Pehle ref false karo
    isOnlineRef.current = false;
    stopHeartbeat();
    await setUserOfflineOnLogout();
  }, [stopHeartbeat]);

  return { setAvailable, setOfflineAndCleanup };
}