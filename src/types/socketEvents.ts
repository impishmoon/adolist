import { ApiResponse } from "@/types/apiResponse";
import RegisterData from "@/types/api/register";
import SetAccountData from "./api/setAccount";

export interface SocketEmitEvents {
  register: (data: RegisterData) => void;
  setAccount: (data: SetAccountData) => void;
}

export interface SocketListenEvents {
  apiResponse: (data: ApiResponse) => void;
}
