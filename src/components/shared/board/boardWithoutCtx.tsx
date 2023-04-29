import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { ChangeEvent, FC } from "react";
import css from "./boardWithoutCtx.module.scss";
import Input from "@/components/shared/input";
import List from "@/components/shared/board/list";
import BoardType from "@/types/client/board/board";
import { getDefaultData, useBoard } from "@/components/contexts/board";
import { useSocket } from "@/components/contexts/socket";
import getAuthCookie from "@/clientlib/getAuthCookie";

export type Props = {
  data?: BoardType;
};

const BoardWithoutCtx: FC<Props> = ({ data }) => {
  const { socket } = useSocket();
  const { createBoard, forcedData, setForcedData, formData } = useBoard();
  const { control, handleSubmit } = formData;

  const onSubmit = handleSubmit(async (data) => {
    //dont use data because we are dealing with a dynamic form and i cant be bothered to figure out how to make react-form-hook work with a dynamic number of inputs

    if (!socket) return;

    socket.emit("createBoard", {
      auth: getAuthCookie(),
      data: forcedData,
    });
    setForcedData(getDefaultData());
  });

  const test = () => {
    setForcedData(getDefaultData());
  };

  const isUsingForcedData = createBoard;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUsingForcedData) {
      const newForcedData = { ...forcedData };
      newForcedData.name = e.target.value;
      setForcedData(newForcedData);
    } else {
    }
  };

  const useData = isUsingForcedData ? forcedData : data;

  return (
    <form onSubmit={onSubmit}>
      <Card key={useData?.id} variant="outlined">
        <CardContent>
          <div>
            <Input
              className={css.input}
              required
              type="text"
              placeholder="Title"
              value={useData?.name}
              onChange={onNameChange}
            />
          </div>
          <div>{useData && <List data={useData} />}</div>
        </CardContent>
        {createBoard && (
          <CardActions>
            <Grid container justifyContent={"space-between"}>
              <Button type="submit">Create</Button>
              <Button type="reset" color="warning" onClick={test}>
                Cancel
              </Button>
            </Grid>
          </CardActions>
        )}
      </Card>
    </form>
  );
};

export default BoardWithoutCtx;
