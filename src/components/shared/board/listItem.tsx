import { FC } from "react";
import css from "./listItem.module.scss";
import { Box, Checkbox, TextareaAutosize } from "@mui/material";
import TaskType from "@/types/client/board/task";

type Props = {
  data?: TaskType;
  onClick: () => void;
};

const ListItem: FC<Props> = ({ data, onClick }) => {
  const renderSideItem = () => {
    if (data) {
      return (
        <Box height={18} width={18}>
          <Checkbox
            className={css.checkbox}
            checked={data.checked}
            size="small"
          />
        </Box>
      );
    } else {
      return <div className={css.plusSign}>+</div>;
    }
  };

  return (
    <div className={css.root} onClick={onClick}>
      <div className={css.sideItem}>{renderSideItem()}</div>
      <div className={css.text}>
        <TextareaAutosize
          required={data != null}
          placeholder="An awesome task"
          defaultValue={data?.text}
        />
      </div>
    </div>
  );
};

export default ListItem;
