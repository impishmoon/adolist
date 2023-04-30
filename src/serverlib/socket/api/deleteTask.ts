import { decryptAccountToken, getToken } from "@/serverlib/auth";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import DeleteTaskData from "@/types/api/deleteTask";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketDeleteTask = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: DeleteTaskData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);

  if (user) {
    await TasksSQL.delete(data.id);

    //TODO: Send task update to all sockets belonging to users that can see the task's board
  }
};

export default SocketDeleteTask;
