import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import BoardType from "@/types/client/board/board";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Server, Socket } from "socket.io";

const SocketShareBoardWithUser = async (
  io: Server<SocketEmitEvents, SocketListenEvents>,
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  auth: string,
  boardId: string,
  userId: string
) => {
  const session = decryptAccountToken(auth);
  const user = await UsersSQL.getById(session.id);

  if (user) {
    await BoardSharesSQL.create(boardId, userId);

    //TODO: send API response with new list of shared users for this board (create new response: setBoardSharedUsers)
    //TODO: find if there is a socket which belongs to userId, if yes, join that socket to the board's room and send him a personal update of this new board
    // io.to(data.id).except(socket.id).emit("setBoardName", data.id, data.name);
  }
};

export default SocketShareBoardWithUser;
