import { createContext, useContext, useState } from "react";

type OnlineUserContext = {
  users: any;
  setUsers: (val: any) => void;
};

const OnlineUsersContext = createContext<OnlineUserContext | undefined>(
  undefined
);

export const useOnlineUsersContext = () => {
  const context = useContext(OnlineUsersContext);
  if (!context) {
    throw new Error("useOnlineUsersContext must be used within a OnlineUsersProvider");
  }
  return context;
};

export const OnlineUsersProvider = ({ children }: any) => {
  const [users, setUsers] = useState<any>();
  return (
    <OnlineUsersContext.Provider value={{ users, setUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};
