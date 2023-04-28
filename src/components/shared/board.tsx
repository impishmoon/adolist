import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { FC } from "react";
import css from "./board.module.scss";
import Input from "./input";
import List from "./board/list";

const data = {
  id: "adasd",
  ownerid: "",
  name: "test",
  timecreated: 0,
  timeupdated: 0,
  tasks: [
    {
      id: "item1",
      ownerid: "",
      text: "this is a new task",
      checked: false,
      timecreated: 0,
      timeupdated: 0,
      updatedby: "",
    },
    {
      id: "item2",
      ownerid: "",
      text: "this is a new\nnew task!",
      checked: true,
      timecreated: 0,
      timeupdated: 0,
      updatedby: "",
    },
  ],
};

const Board: FC = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <div>
          <Input
            className={css.input}
            required
            type="text"
            placeholder="Title"
            value={data.name}
          />
        </div>
        <div>
          <List data={data} />
        </div>
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"space-between"}>
          <Button>Create</Button>
          <Button color="warning">Cancel</Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Board;
