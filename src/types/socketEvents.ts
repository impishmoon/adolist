import { ApiResponse } from "@/types/apiResponse";
import RegisterData from "@/types/api/register";
import SetAccountData from "@/types/api/setAccount";
import CreateBoardData from "@/types/api/createBoard";
import BoardType from "./client/board/board";

export interface SocketEmitEvents {
  register: (data: RegisterData) => void;
  setAccount: (data: SetAccountData) => void;
  createBoard: (data: CreateBoardData) => void;
}

export interface SocketListenEvents {
  apiResponse: (data: ApiResponse) => void;
  setBoards: (data: BoardType[]) => void;
}
