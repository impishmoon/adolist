import { NextApiResponseServerIO } from "@/types/next";
import type { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import SocketAddListeners from "@/serverlib/socket/socket-add-listeners";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socket-events";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO<SocketEmitEvents, SocketListenEvents>(httpServer, {
      path: "/api/socketio",
    });

    SocketAddListeners(io);

    res.socket.server.io = io;
  }

  res.end();
}
