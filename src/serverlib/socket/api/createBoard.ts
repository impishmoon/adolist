import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import CreateBoardData from "@/types/api/createBoard";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { getBoardsForClient } from "@/serverlib/essentials";
import { Socket } from "socket.io";
import { userSocketsEmit } from "../userSocketsMap";

const SocketCreateBoard = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: CreateBoardData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);
  if (!user) return;

  const lastBoardListOrder = (await BoardsSQL.getLast(user.id)) ?? "-1";

  const boardId = await BoardsSQL.create(
    user.id,
    data.data.name,
    parseInt(lastBoardListOrder) + 1
  );
  await TasksSQL.createMultiple(boardId, user.id, data.data.tasks);

  userSocketsEmit(user.id, "setBoards", await getBoardsForClient(user.id));
};

export default SocketCreateBoard;
