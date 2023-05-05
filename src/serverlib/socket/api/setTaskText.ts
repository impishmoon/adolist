import { decryptAccountToken, getToken } from "@/serverlib/auth";
import { checkBoardAccess } from "@/serverlib/essentials";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import SetTaskTextData from "@/types/api/setTaskText";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Server, Socket } from "socket.io";

const SocketSetTaskText = async (
  io: Server<SocketEmitEvents, SocketListenEvents>,
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetTaskTextData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);
  if (!user) return;

  const task = await TasksSQL.getById(data.id);
  if (!task) return;

  if (!checkBoardAccess(user.id, task.ownerid)) return;

  await TasksSQL.setText(data.id, data.text);
  await TasksSQL.setUpdatedBy(data.id, user.id);

  io.to(task.ownerid)
    .except(socket.id)
    .emit("setTaskText", task.ownerid, data.id, data.text);
};

export default SocketSetTaskText;
