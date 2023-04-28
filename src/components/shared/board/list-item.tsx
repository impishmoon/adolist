import { FC } from "react";
import css from "./list-item.module.scss";
import { TextareaAutosize } from "@mui/material";

const ListItem: FC = () => {
  return (
    <div className={css.root}>
      <div className={css.sideItem}>+</div>
      <div className={css.text}>
        <TextareaAutosize placeholder="An awesome task" />
      </div>
    </div>
  );
};

export default ListItem;
