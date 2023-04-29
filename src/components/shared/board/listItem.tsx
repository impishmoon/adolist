import { ChangeEvent, FC } from "react";
import css from "./listItem.module.scss";
import { Box, Checkbox, TextareaAutosize } from "@mui/material";
import TaskType from "@/types/client/board/task";
import { useBoard } from "@/components/contexts/board";
import { randomId } from "@/sharedlib/essentials";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";
import { IndexPropsType } from "@/types/indexProps";
import { useSocket } from "@/components/contexts/socket";
import getAuthCookie from "@/clientlib/getAuthCookie";

type Props = {
  data?: TaskType;
  boardId: string;
};

const ListItem: FC<Props> = ({ data, boardId }) => {
  const { props, setProps }: IndexPropsType = useSSRFetcher();
  const { socket } = useSocket();
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
      //TODO: creating a new task
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
      const newProps = { ...props };

      if (!newProps.boards) return;

      const foundBoard = newProps.boards.find((board) => board.id === boardId);
      if (!foundBoard) return;

      const foundTask = foundBoard.tasks.find((task) => task.id === data?.id);
      if (!foundTask) return;

      foundTask.checked = e.target.checked;

      setProps(newProps);

      socket?.emit("setTaskChecked", {
        auth: getAuthCookie(),
        id: data!.id,
        checked: e.target.checked,
      });
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
      const newProps = { ...props };

      if (!newProps.boards) return;

      const foundBoard = newProps.boards.find((board) => board.id === boardId);
      if (!foundBoard) return;

      const foundTask = foundBoard.tasks.find((task) => task.id === data?.id);
      if (!foundTask) return;

      foundTask.text = e.target.value;

      setProps(newProps);

      socket?.emit("setTaskText", {
        auth: getAuthCookie(),
        id: data!.id,
        text: e.target.value,
      });
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
