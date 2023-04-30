import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import UsersSQL from "@/serverlib/sql-classes/users";
import DeleteBoardData from "@/types/api/deleteBoard";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketDeleteBoard = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: DeleteBoardData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);

  if (user) {
    await BoardsSQL.delete(data.id);

    //TODO: Send task update to all sockets belonging to users that can see the task's board
  }
};

export default SocketDeleteBoard;
