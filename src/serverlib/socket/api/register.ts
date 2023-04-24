import { getToken } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import RegisterData from "@/types/api/register";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socket-events";
import { Socket } from "socket.io";

const SocketRegister = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: RegisterData
) => {
  if (data.username == null || data.password == null) {
    socket.emit("apiResponse", {
      error: "Username or password is missing",
      data: undefined,
    });
    return;
  }

  const existingUser = await UsersSQL.getByUsername(data.username);
  if (existingUser != null) {
    socket.emit("apiResponse", {
      error: "Username already exists",
      data: undefined,
    });
    return;
  }

  const newId = await UsersSQL.create(data.username, data.password, data.email);

  // await setLoginSession(res, { id: newId });
  socket.data.accountId = newId;

  socket.emit("apiResponse", { error: undefined, data: "success" });
};

export default SocketRegister;
