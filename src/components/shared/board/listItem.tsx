import { ChangeEvent, FC } from "react";
import css from "./listItem.module.scss";
import { Box, Checkbox, TextareaAutosize } from "@mui/material";
import TaskType from "@/types/client/board/task";
import { useBoard } from "@/components/contexts/board";
import { randomId } from "@/sharedlib/essentials";

type Props = {
  data?: TaskType;
};

const ListItem: FC<Props> = ({ data }) => {
  const { createBoard, forcedData, setForcedData } = useBoard();

  const onClick = () => {
    if (data != null) return;

    if (createBoard) {
      const newForcedData = { ...forcedData };
      newForcedData.tasks.push({
        id: randomId(),
        ownerid: "",
        checked: false,
        text: "",
        timecreated: 0,
        timeupdated: 0,
        updatedby: "",
      });
      setForcedData(newForcedData);
    } else {
    }
  };

  const onCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (createBoard) {
      const newForcedData = { ...forcedData };
      const foundTask = newForcedData.tasks.find(
        (task) => task.id === data?.id
      );
      foundTask && (foundTask.checked = e.target.checked);
      setForcedData(newForcedData);
    } else {
    }
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (createBoard) {
      const newForcedData = { ...forcedData };
      const foundTask = newForcedData.tasks.find(
        (task) => task.id === data?.id
      );
      foundTask && (foundTask.text = e.target.value);
      setForcedData(newForcedData);
    } else {
    }
  };

  const renderSideItem = () => {
    if (data) {
      return (
        <Box height={18} width={18}>
          <Checkbox
            className={css.checkbox}
            checked={data.checked}
            size="small"
            onChange={onCheckedChange}
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
          autoFocus={data != null}
          required={data != null}
          placeholder="An awesome task"
          value={data?.text}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};

export default ListItem;
