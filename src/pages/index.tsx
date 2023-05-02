import Head from "next/head";
import { Inter } from "next/font/google";
import { GetServerSideProps, NextPage } from "next";
import { getLoginSession } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import { Container, Grid } from "@mui/material";
import Board from "@/components/shared/board";
import BoardType from "@/types/client/board/board";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";
import IndexProps, { IndexPropsType } from "@/types/indexProps";
import { useSocket } from "@/components/contexts/socket";
import { useEffect } from "react";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getLoginSession(context.req);

  let username: string | null = null;
  let boards: BoardType[] | null = null;

  if (session?.id != null) {
    const account = await UsersSQL.getById(session.id);

    username = account.username;
    boards = [];
    const serverBoards = await BoardsSQL.getByOwnerId(account.id);
    for (const serverBoard of serverBoards) {
      boards.push({
        ...serverBoard,
        tasks: await TasksSQL.getByOwnerId(serverBoard.id),
        shares: await BoardSharesSQL.getUserShares(serverBoard.id),
      });
    }
  }

  return {
    props: {
      username,
      boards,
    },
  };
};

const Page: NextPage<IndexProps> = () => {
  const { socket } = useSocket();
  const { props, setProps }: IndexPropsType = useSSRFetcher();
  const { boards } = props;

  useEffect(() => {
    if (!socket) return;

    socket.on("setBoards", (boards) => {
      const newProps = { ...props };

      newProps.boards = boards;

      setProps(newProps);
    });

    socket.on("setTasks", (boardId, tasks) => {
      const newProps = { ...props };

      const foundBoard = newProps.boards?.find((board) => board.id === boardId);
      if (!foundBoard) return;

      foundBoard.tasks = tasks;

      setProps(newProps);
    });

    socket.on("setBoardName", (id, name) => {
      const newProps = { ...props };

      const foundBoard = newProps.boards?.find((board) => board.id === id);
      if (!foundBoard) return;

      foundBoard.name = name;

      setProps(newProps);
    });

    socket.on("setTaskText", (boardId, id, text) => {
      const newProps = { ...props };

      const foundBoard = newProps.boards?.find((board) => board.id === boardId);
      if (!foundBoard) return;

      const foundTask = foundBoard.tasks.find((task) => task.id == id);
      if (!foundTask) return;

      foundTask.text = text;

      setProps(newProps);
    });

    socket.on("setTaskChecked", (boardId, id, checked) => {
      const newProps = { ...props };

      const foundBoard = newProps.boards?.find((board) => board.id === boardId);
      if (!foundBoard) return;

      const foundTask = foundBoard.tasks.find((task) => task.id == id);
      if (!foundTask) return;

      foundTask.checked = checked;

      setProps(newProps);
    });

    return () => {
      socket.off("setBoards");
      socket.off("setBoardName");

      socket.off("setTasks");
      socket.off("setTaskText");
      socket.off("setTaskChecked");
    };
  }, [props, setProps, socket]);

  const renderBoards = boards?.map((board) => {
    return (
      <Grid key={board.id} item xs={6} lg={3}>
        <Board data={board} />
      </Grid>
    );
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ marginTop: "20px" }}>
        <Grid container>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Board createBoard />
            </Grid>
          </Grid>
          <Grid container>{renderBoards}</Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
