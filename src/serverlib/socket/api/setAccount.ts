import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import SetAccountData from "@/types/api/setAccount";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketSetAccount = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetAccountData
) => {
  const session = decryptAccountToken(data.accountToken);

  if (session) {
    socket.data.accountId = session.id;

    const ownedBoards = await BoardsSQL.getByOwnerId(session.id);
    //const sharedWithBoards = await BoardSharesSQL.getb //TODO: get all boards that this user is shared with, too tired to program it right now

    for (const board of ownedBoards) {
      socket.join(board.id);
    }
  }
};

export default SocketSetAccount;
