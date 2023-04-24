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
import { SocketEmitEvents, SocketListenEvents } from "@/types/socket-events";

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
      //socket.emit("set-account", )
      console.log("socket connected");
    });

    socket.on("setAccount", (accountData) => {
      cookie.serialize("account", accountData.account, {
        expires: new Date(Date.now() + 60 * 60 * 24 * 365),
      });
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
