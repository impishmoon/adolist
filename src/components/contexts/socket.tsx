import io, { Socket } from "socket.io-client";
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

type ContextType = {
  socket: Socket | undefined;
};

export const SocketContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const SocketContextProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    (async () => {
      await fetch("/api/socket");
      setSocket(io());
    })();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

export const useSocket = () => {
  return useContext(SocketContext);
};
