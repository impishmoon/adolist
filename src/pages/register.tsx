import LayoutContainer from "@/components/layout/container";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <>
      <LayoutContainer>
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
            <div>
              <Button variant="contained" color="success">
                Register
              </Button>
            </div>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Link href="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </FormControl>
        </form>
      </LayoutContainer>
    </>
  );
};

export default RegisterPage;
