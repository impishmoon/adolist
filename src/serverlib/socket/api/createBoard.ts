import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import CreateBoardData from "@/types/api/createBoard";
import BoardType from "@/types/client/board/board";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketCreateBoard = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: CreateBoardData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);

  if (user) {
    const boardId = await BoardsSQL.create(user.id, data.data.name);
    await TasksSQL.createMultiple(boardId, user.id, data.data.tasks);

    const result: BoardType[] = [];

    const boards = await BoardsSQL.getByOwnerId(user.id);
    for (const board of boards) {
      result.push({
        ...board,
        tasks: await TasksSQL.getByOwnerId(board.id),
        shares: await BoardSharesSQL.getUserShares(board.id),
      });
    }

    socket.emit("setBoards", result);
  }
};

export default SocketCreateBoard;
