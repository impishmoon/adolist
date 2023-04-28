import { randomId } from "@/sharedlib/essentials";
import BoardType from "@/types/client/board/board";
import { createContext, useContext, FC, ReactNode, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

export const getDefaultData = () => ({
  id: randomId(),
  ownerid: "",
  name: "",
  timecreated: 0,
  timeupdated: 0,
  tasks: [],
});

type FormData = {
  name: string;
};

type ContextType = {
  forcedData: BoardType;
  setForcedData: (newData: BoardType) => void;

  formData: UseFormReturn<FormData, any>;
};

export const BoardContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const BoardContextProvider: FC<Props> = ({ children }) => {
  const formData = useForm<FormData>();

  const [forcedData, setForcedData] = useState<BoardType>(getDefaultData());

  return (
    <BoardContext.Provider value={{ forcedData, setForcedData, formData }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;

export const useBoard = () => {
  return useContext(BoardContext);
};
