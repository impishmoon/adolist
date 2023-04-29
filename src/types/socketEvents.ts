import { ApiResponse } from "@/types/apiResponse";
import BoardType from "./client/board/board";
import RegisterData from "@/types/api/register";
import SetAccountData from "@/types/api/setAccount";
import CreateBoardData from "@/types/api/createBoard";
import SetBoardNameData from "./api/setBoardName";
import SetTaskTextData from "./api/setTaskText";
import SetTaskCheckedData from "./api/setTaskChecked";

export interface SocketEmitEvents {
  register: (data: RegisterData) => void;
  setAccount: (data: SetAccountData) => void;
  createBoard: (data: CreateBoardData) => void;

  setBoardName: (data: SetBoardNameData) => void;
  setTaskText: (data: SetTaskTextData) => void;
  setTaskChecked: (data: SetTaskCheckedData) => void;
}

export interface SocketListenEvents {
  apiResponse: (data: ApiResponse) => void;
  setBoards: (data: BoardType[]) => void;
}
