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

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getLoginSession(context.req);

  let username;
  let boards;

  if (session.id != null) {
    const account = await UsersSQL.getById(session.id);

    username = account.username;
    boards = await BoardsSQL.getByOwnerId(account.id);
  }

  return {
    props: {
      username,
      boards,
    },
  };
};

type Props = {
  username?: string;
  boards?: any;
};

const Page: NextPage<Props> = ({ username, boards }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ marginTop: "20px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <Board />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
