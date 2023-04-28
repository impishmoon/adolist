import { FC } from "react";
import ListItem from "./list-item";
import css from "./list.module.scss";
import BoardType from "@/types/client/board/board";

type Props = {
  data: BoardType;
};

const List: FC<Props> = ({ data }) => {
  const renderItems = data.tasks.map((task) => {
    return <ListItem key={task.id} data={task} />;
  });

  return (
    <div className={css.root}>
      {renderItems}
      <ListItem />
    </div>
  );
};

export default List;
