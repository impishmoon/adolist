import { decryptAccountToken, getToken } from "@/serverlib/auth";
import SetAccountData from "@/types/api/setAccount";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";

const SocketSetAccount = async (
  socket: Socket<SocketEmitEvents, SocketListenEvents>,
  data: SetAccountData
) => {
  const session = decryptAccountToken(data.accountToken);

  socket.data.accountId = session.id;
};

export default SocketSetAccount;
