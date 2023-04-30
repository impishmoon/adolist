import { IndexPropsType } from "@/types/indexProps";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useSSRFetcher } from "../contexts/ssrFetcher";
import Link from "next/link";

const NavBar: FC = () => {
  const { props }: IndexPropsType = useSSRFetcher();

  const renderButtons = () => {
    if (!props.username) {
      return (
        <>
          <Link href="/register">
            <Button color="inherit">Register</Button>
          </Link>
          <Link href="/login">
            <Button color="inherit">Login</Button>
          </Link>
        </>
      );
    }
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">ADoList</Link>
          </Typography>
          {renderButtons()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
