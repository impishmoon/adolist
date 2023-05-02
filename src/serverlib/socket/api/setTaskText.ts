import { decryptAccountToken, getToken } from "@/serverlib/auth";
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

  if (user) {
    const task = await TasksSQL.getById(data.id);
    await TasksSQL.setText(data.id, data.text);

    io.to(task.ownerid)
      .except(socket.id)
      .emit("setTaskText", task.ownerid, data.id, data.text);
    //TODO: Send task update to all sockets belonging to users that can see the task's board
  }
};

export default SocketSetTaskText;
