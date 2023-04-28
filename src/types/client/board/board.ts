import ServerBoardType from "@/types/server/board/board";
import TaskType from "./task";

type BoardType = ServerBoardType & {
  tasks: TaskType[];
};

export default BoardType;
