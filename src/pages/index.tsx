import Head from "next/head";
import { Inter } from "next/font/google";
import { GetServerSideProps, NextPage } from "next";
import { getLoginSession } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import Board from "@/components/shared/board";
import BoardType from "@/types/client/board/board";
import TasksSQL from "@/serverlib/sql-classes/tasks";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";
import IndexProps, { IndexPropsType } from "@/types/indexProps";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getLoginSession(context.req);

  let username;
  let boards;

  if (session.id != null) {
    const account = await UsersSQL.getById(session.id);

    username = account.username;
    boards = [];
    const serverBoards = await BoardsSQL.getByOwnerId(account.id);
    for (const serverBoard of serverBoards) {
      boards.push({
        ...serverBoard,
        tasks: await TasksSQL.getByOwnerId(serverBoard.id),
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
  const { props }: IndexPropsType = useSSRFetcher();
  const { boards } = props;

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
