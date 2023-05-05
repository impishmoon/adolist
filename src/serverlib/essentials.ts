import BoardType from "@/types/client/board/board";
import BoardsSQL from "./sql-classes/boards";
import BoardSharesSQL from "./sql-classes/boardshares";
import TasksSQL from "./sql-classes/tasks";

export const getBoardsForClient = async (userId: string) => {
  const result: BoardType[] = [];

  const boards = [
    ...(await BoardsSQL.getByOwnerId(userId)),
    ...(await BoardSharesSQL.getSharedWithBoards(userId)),
  ];
  for (const board of boards) {
    result.push({
      ...board,
      tasks: await TasksSQL.getByOwnerId(board.id),
      shares: await BoardSharesSQL.getUserShares(board.id),
    });
  }

  return result;
};
