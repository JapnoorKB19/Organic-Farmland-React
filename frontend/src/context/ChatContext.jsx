import { createContext, useContext, useEffect } from 'react';
import { socket } from '../socket';
import { useAuth } from './AuthContext'; // if you have auth context

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("join", user._id); // register yourself with socket
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <ChatContext.Provider value={{ socket }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
