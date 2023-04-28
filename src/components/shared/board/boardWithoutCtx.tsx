import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { ChangeEvent, FC } from "react";
import css from "./boardWithoutCtx.module.scss";
import Input from "@/components/shared/input";
import List from "@/components/shared/board/list";
import BoardType from "@/types/client/board/board";
import { getDefaultData, useBoard } from "@/components/contexts/board";
import { Controller } from "react-hook-form";

export type Props = {
  data?: BoardType;
  createBoard: boolean;
};

const BoardWithoutCtx: FC<Props> = ({ createBoard, data }) => {
  const { forcedData, setForcedData, formData } = useBoard();
  const { control, handleSubmit } = formData;

  const onSubmit = handleSubmit(async (data) => {});

  const test = () => {
    setForcedData(getDefaultData());
  };

  const isUsingForcedData = createBoard;

  const useData = isUsingForcedData ? forcedData : data;

  return (
    <form onSubmit={onSubmit}>
      <Card key={useData?.id} variant="outlined">
        <CardContent>
          <div>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className={css.input}
                  required
                  type="text"
                  placeholder="Title"
                  defaultValue={useData?.name}
                />
              )}
            />
          </div>
          <div>{useData && <List data={useData} />}</div>
        </CardContent>
        <CardActions>
          <Grid container justifyContent={"space-between"}>
            <Button type="submit">Create</Button>
            <Button type="reset" color="warning" onClick={test}>
              Cancel
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </form>
  );
};

export default BoardWithoutCtx;
