import { Server, Socket } from "socket.io";
import SocketRegister from "./api/register";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import SocketSetAccount from "./api/setAccount";
import SocketCreateBoard from "./api/createBoard";
import SocketSetBoardName from "./api/setBoardName";
import SocketSetTaskText from "./api/setTaskText";
import SocketSetTaskChecked from "./api/setTaskChecked";
import SocketCreateTask from "./api/createTask";
import SocketLogin from "./api/login";
import SocketDeleteTask from "./api/deleteTask";
import SocketDeleteBoard from "./api/deleteBoard";

const SocketAddListeners = (
  io: Server<SocketEmitEvents, SocketListenEvents>
) => {
  io.on(
    "connection",
    (socket: Socket<SocketEmitEvents, SocketListenEvents>) => {
      socket.on("register", (data) => SocketRegister(socket, data));
      socket.on("login", (data) => SocketLogin(socket, data));

      socket.on("setAccount", (data) => SocketSetAccount(socket, data));
      socket.on("createBoard", (data) => SocketCreateBoard(socket, data));
      socket.on("createTask", (data) => SocketCreateTask(socket, data));

      socket.on("setBoardName", (data) => SocketSetBoardName(io, socket, data));
      socket.on("setTaskText", (data) => SocketSetTaskText(io, socket, data));
      socket.on("setTaskChecked", (data) =>
        SocketSetTaskChecked(io, socket, data)
      );

      socket.on("deleteTask", (data) => SocketDeleteTask(socket, data));
      socket.on("deleteBoard", (data) => SocketDeleteBoard(socket, data));
    }
  );
};

export default SocketAddListeners;
