import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import SetAccountData from "@/types/api/setAccount";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

//TODO: Use this userId->socket[] map to quickly find sockets to broadcast changes to, such as "hey, all sockets belonging to this account... you have a new shared board", etc
export const socketUserIdMap = new Map<
  string,
  Socket<SocketEmitEvents, SocketListenEvents>[]
>();

const SocketSetAccount = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetAccountData
) => {
  const session = decryptAccountToken(data.accountToken);

  if (session) {
    socket.data.accountId = session.id;

    //TODO: Make sure this socketUserIdMap code is correct...
    if (!socketUserIdMap.has(session.id)) {
      socketUserIdMap.set(session.id, []);
    }
    socketUserIdMap.get(session.id)!.push(socket);

    socket.on("disconnect", () => {
      socketUserIdMap.set(
        session.id,
        socketUserIdMap
          .get(session.id)!
          .filter((otherSocket) => otherSocket.id != socket.id)
      );
      if (socketUserIdMap.get(session.id)!.length == 0) {
        socketUserIdMap.delete(session.id);
      }
    });

    const ownedBoards = await BoardsSQL.getByOwnerId(session.id);
    //const sharedWithBoards = await BoardSharesSQL.getb //TODO: get all boards that this user is shared with, too tired to program it right now

    for (const board of ownedBoards) {
      socket.join(board.id);
    }
  }
};

export default SocketSetAccount;
