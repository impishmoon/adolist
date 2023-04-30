import { getToken } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import RegisterData from "@/types/api/register";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketLogin = async (
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

  const user = await UsersSQL.getByUsernameAndPassword(
    data.username,
    data.password
  );
  if (user == null) {
    socket.emit("apiResponse", {
      error: "Username doesn't exist",
      data: undefined,
    });
    return;
  }

  socket.data.accountId = user.id;

  socket.emit("apiResponse", { error: undefined, data: "success" });
};

export default SocketLogin;
