import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import CreateTaskData from "@/types/api/createTask";
import BoardType from "@/types/client/board/board";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketCreateTask = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: CreateTaskData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);
  if (!user) return;

  const board = await BoardsSQL.getById(data.boardId);
  if (!board) return;

  const lastTaskListOrder = await TasksSQL.getLastTask(data.boardId);
  if (lastTaskListOrder === undefined) return;

  await TasksSQL.create(data.boardId, user.id, lastTaskListOrder + 1);

  const result = await TasksSQL.getByOwnerId(data.boardId);
  socket.emit("setTasks", data.boardId, result);
};

export default SocketCreateTask;
