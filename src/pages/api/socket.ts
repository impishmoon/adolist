import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((res.socket as any).server.io) {
    res.end();
    return;
  }

  const io = new Server((res.socket as any).server);
  (res.socket as any).server.io = io;

  res.end();
}
