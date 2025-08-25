import { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from '@services/socket';
import { handleNewJob } from '@store/jobSlice';
import { getUser } from '@store/authSlice';

import { useOnlineUsersContext } from '../context/OnlineUsersContext';


const SocketProvider = ({children}: {children: ReactNode}) => {
  const {setUsers} = useOnlineUsersContext();
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    const socket = connectSocket();

    // Optional: Listen for connection errors
    socket.on('connect_error', err => {
      console.error('Socket connect_error:', err.message);
      setUsers([])
    });

    // Connect the socket
    socket.connect();

    // Log successful connection
    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('get-online-employees', payload => {
      setUsers(payload?.employees ?? [])
    });

    socket.on("jobAssigned",payload=>{
      console.log(payload)
      dispatch(handleNewJob(payload))
    })

    // Cleanup
    return () => {
      socket.off('connect');
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [user]);
  return <>{children}</>;
};

export default SocketProvider;
