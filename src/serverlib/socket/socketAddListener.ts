import { Server, Socket } from "socket.io";
import SocketRegister from "./api/register";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import SocketSetAccount from "./api/setAccount";

const SocketAddListeners = (
  io: Server<SocketEmitEvents, SocketListenEvents>
) => {
  io.on(
    "connection",
    (socket: Socket<SocketEmitEvents, SocketListenEvents>) => {
      socket.on("register", (data) => SocketRegister(socket, data));
      socket.on("setAccount", (data) => SocketSetAccount(socket, data));
    }
  );
};

export default SocketAddListeners;
