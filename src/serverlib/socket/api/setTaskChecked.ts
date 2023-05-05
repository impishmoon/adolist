import { decryptAccountToken, getToken } from "@/serverlib/auth";
import { checkBoardAccess } from "@/serverlib/essentials";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import SetTaskCheckedData from "@/types/api/setTaskChecked";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Server, Socket } from "socket.io";

const SocketSetTaskChecked = async (
  io: Server<SocketEmitEvents, SocketListenEvents>,
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetTaskCheckedData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);
  if (!user) return;

  const task = await TasksSQL.getById(data.id);
  if (!task) return;

  if (!checkBoardAccess(user.id, task.ownerid)) return;

  await TasksSQL.setChecked(data.id, data.checked);
  await TasksSQL.setUpdatedBy(data.id, user.id);

  io.to(task.ownerid)
    .except(socket.id)
    .emit("setTaskChecked", task.ownerid, data.id, data.checked);
};

export default SocketSetTaskChecked;
