import { Card, CardContent } from "@mui/material";
import { FC } from "react";
import css from "./board.module.scss";
import Input from "./input";
import List from "./board/list";

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
          />
        </div>
        <div>
          <List />
        </div>
      </CardContent>
    </Card>
  );
};

export default Board;
