import { decryptAccountToken, getToken } from "@/serverlib/auth";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";
import SetAccountData from "@/types/api/setAccount";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";
import { processUserSocket } from "../userSocketsMap";

const SocketSetAccount = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetAccountData
) => {
  const session = decryptAccountToken(data.accountToken);

  if (session) {
    socket.data.accountId = session.id;

    processUserSocket(session.id, socket);

    const ownedBoards = await BoardsSQL.getByOwnerId(session.id);
    const sharedWithBoards = await BoardSharesSQL.getSharedWithBoards(
      session.id
    );
    const allBoards = [...ownedBoards, ...sharedWithBoards];

    for (const board of allBoards) {
      socket.join(board.id);
    }
  }
};

export default SocketSetAccount;
