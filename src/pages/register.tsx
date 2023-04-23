import LayoutContainer from "@/components/layout/container";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import Link from "next/link";
import css from "./register.module.scss";

const RegisterPage = () => {
  return (
    <>
      <LayoutContainer className={css.root}>
        <div>Register</div>
        <form>
          <FormControl required fullWidth margin="normal">
            <TextField required type="text" label="Username" />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <TextField required type="password" label="Password" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField type="email" label="Email" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <div className={css.buttons}>
              <Button type="submit" variant="contained" color="success">
                Register
              </Button>
              <Link href="/login">
                <Button type="button" variant="contained">
                  Login
                </Button>
              </Link>
            </div>
          </FormControl>
        </form>
      </LayoutContainer>
    </>
  );
};

export default RegisterPage;
