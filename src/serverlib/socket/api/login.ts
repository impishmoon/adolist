import { getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import UsersSQL from "@/serverlib/sql-classes/users";
import RegisterData from "@/types/api/register";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";
import { processUserSocket } from "../userSocketsMap";

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
  processUserSocket(user.id, socket);

  const ownedBoards = await BoardsSQL.getByOwnerId(user.id);
  const sharedWithBoards = await BoardSharesSQL.getSharedWithBoards(user.id);
  const allBoards = [...ownedBoards, ...sharedWithBoards];

  for (const board of allBoards) {
    socket.join(board.id);
  }

  socket.emit("apiResponse", { error: undefined, data: "success" });
};

export default SocketLogin;
