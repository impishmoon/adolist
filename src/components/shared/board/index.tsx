import BoardContextProvider from "@/components/contexts/board";
import { FC } from "react";
import BoardWithoutCtx, {
  Props,
} from "@/components/shared/board/boardWithoutCtx";

const Board: FC<Props> = (props) => {
  return (
    <BoardContextProvider>
      <BoardWithoutCtx {...props}></BoardWithoutCtx>
    </BoardContextProvider>
  );
};

export default Board;
