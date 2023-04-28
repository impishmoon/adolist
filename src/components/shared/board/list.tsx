import { FC } from "react";
import ListItem from "./listItem";
import css from "./list.module.scss";
import BoardType from "@/types/client/board/board";

type Props = {
  data: BoardType;
};

const List: FC<Props> = ({ data }) => {
  const renderItems = data.tasks.map((task) => {
    return <ListItem key={task.id} data={task} onClick={() => {}} />;
  });

  return (
    <div className={css.root}>
      {renderItems}
      <ListItem onClick={() => {}} />
    </div>
  );
};

export default List;
