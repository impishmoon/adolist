import { SocketEmitEvents, SocketListenEvents } from "@/types/socketEvents";
import { Socket } from "socket.io";
import { EventNames, EventParams } from "socket.io/dist/typed-events";

export const socketUserIdMap = new Map<
  string,
  Socket<SocketEmitEvents, SocketListenEvents>[]
>();

export const getUserSockets = (userId: string) => {
  return socketUserIdMap.get(userId);
};

export const userSocketsEmit = <Ev extends EventNames<SocketListenEvents>>(
  userId: string,
  event: Ev,
  ...args: Parameters<SocketListenEvents[Ev]>
) => {
  const sockets = getUserSockets(userId);
  if (!sockets) return;

  for (const socket of sockets) {
    (socket.emit as any)(event, args);
  }
};

export const processUserSocket = (
  userId: string,
  socket: Socket<SocketEmitEvents, SocketListenEvents>
) => {
  if (!socketUserIdMap.has(userId)) {
    socketUserIdMap.set(userId, []);
  }
  socketUserIdMap.get(userId)!.push(socket);

  socket.on("disconnect", () => {
    socketUserIdMap.set(
      userId,
      socketUserIdMap
        .get(userId)!
        .filter((otherSocket) => otherSocket.id != socket.id)
    );
    if (socketUserIdMap.get(userId)!.length == 0) {
      socketUserIdMap.delete(userId);
    }
  });
};
