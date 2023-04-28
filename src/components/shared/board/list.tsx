import { FC } from "react";
import ListItem from "./list-item";
import css from "./list.module.scss";

const List: FC = () => {
  return (
    <div className={css.root}>
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  );
};

export default List;
