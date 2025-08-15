// import { connectSocket } from '@services/socket';
import { ReactNode, useEffect } from 'react';
import { getUser } from '@store/authSlice';
import { useSelector } from 'react-redux';


const SocketProvider = ({children}: {children: ReactNode}) => {
  const user = useSelector(getUser);
  // useEffect(() => {
  //   if(!user) return;
  //   const socket = connectSocket();

  //   // Optional: Listen for connection errors
  //   socket.on('connect_error', err => {
  //     console.error('Socket connect_error:', err.message);
  //   });

  //   // Connect the socket
  //   socket.connect();

  //   // Log successful connection
  //   socket.on('connect', () => {
  //     console.log('Connected to socket server:', socket.id);
  //   });

  //   // Cleanup
  //   return () => {
  //     socket.off('connect');
  //     socket.disconnect();
  //     console.log('Socket disconnected');
  //   };
  // }, [user]);
  return <>{children}</>;
};

export default SocketProvider;
