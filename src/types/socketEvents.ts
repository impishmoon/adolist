import { ApiResponse } from "@/types/apiResponse";
import BoardType from "./client/board/board";
import RegisterData from "@/types/api/register";
import SetAccountData from "@/types/api/setAccount";
import CreateBoardData from "@/types/api/createBoard";
import SetBoardNameData from "./api/setBoardName";
import SetTaskTextData from "./api/setTaskText";
import SetTaskCheckedData from "./api/setTaskChecked";
import CreateTaskData from "./api/createTask";
import TaskType from "./client/board/task";

export interface SocketEmitEvents {
  register: (data: RegisterData) => void;
  setAccount: (data: SetAccountData) => void;
  createBoard: (data: CreateBoardData) => void;
  createTask: (data: CreateTaskData) => void;

  setBoardName: (data: SetBoardNameData) => void;
  setTaskText: (data: SetTaskTextData) => void;
  setTaskChecked: (data: SetTaskCheckedData) => void;
}

export interface SocketListenEvents {
  apiResponse: (data: ApiResponse) => void;
  setBoards: (data: BoardType[]) => void;
  setTasks: (boardId: string, tasks: TaskType[]) => void;
}
