import io, { Socket } from "socket.io-client";
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import cookie from "cookie";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";

type ContextType = {
  socket: Socket<SocketListenEvents, SocketEmitEvents> | undefined;
};

export const SocketContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const SocketContextProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket: Socket<SocketListenEvents, SocketEmitEvents> = io({
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      const cookies = cookie.parse(document.cookie);
      if ("account" in cookies) {
        socket.emit("setAccount", { accountToken: cookies.account });
      }
    });

    setSocket(socket);
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
