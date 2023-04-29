import { decryptAccountToken, getToken } from "@/serverlib/auth";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import UsersSQL from "@/serverlib/sql-classes/users";
import SetTaskCheckedData from "@/types/api/setTaskChecked";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketSetTaskChecked = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetTaskCheckedData
) => {
  const session = decryptAccountToken(data.auth);
  const user = await UsersSQL.getById(session.id);

  if (user) {
    await TasksSQL.setChecked(data.id, data.checked);

    //TODO: Send task update to all sockets belonging to users that can see the task's board
  }
};

export default SocketSetTaskChecked;
