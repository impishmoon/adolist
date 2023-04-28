import { FC } from "react";
import css from "./list-item.module.scss";

const ListItem: FC = () => {
  return (
    <div className={css.root}>
      <div className={css.sideItem}>+</div>
      <div className={css.text}>
        <textarea placeholder="An awesome task" />
      </div>
    </div>
  );
};

export default ListItem;
