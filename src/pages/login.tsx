import LayoutContainer from "@/components/layout/container";
import { Button, FormControl, TextField } from "@mui/material";
import Link from "next/link";
import css from "./login.module.scss";

const LoginPage = () => {
  return (
    <>
      <LayoutContainer className={css.root}>
        <div>Login</div>
        <form>
          <FormControl required fullWidth margin="normal">
            <TextField required type="text" label="Username" />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <TextField required type="password" label="Password" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <div className={css.buttons}>
              <Button type="submit" variant="contained" color="success">
                Login
              </Button>
              <Link href="/register">
                <Button type="button" variant="contained">
                  Register
                </Button>
              </Link>
            </div>
          </FormControl>
        </form>
      </LayoutContainer>
    </>
  );
};

export default LoginPage;
