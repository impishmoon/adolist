import { FC } from "react";
import ListItem from "./listItem";
import css from "./list.module.scss";
import BoardType from "@/types/client/board/board";

type Props = {
  data: BoardType;
  boardId: string;
};

const List: FC<Props> = ({ data, boardId }) => {
  const renderItems = data.tasks.map((task) => {
    return <ListItem key={task.id} data={task} boardId={boardId} />;
  });

  return (
    <div className={css.root}>
      {renderItems}
      <ListItem boardId={boardId} />
    </div>
  );
};

export default List;
