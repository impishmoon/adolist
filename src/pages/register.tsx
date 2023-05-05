import { useState } from "react";
import LayoutContainer from "@/components/layout/container";
import Router from "next/router";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Link from "next/link";
import css from "./register.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useSocket } from "@/components/contexts/socket";

type FormData = {
  username: string;
  password: string;
  email?: string;
};

const RegisterPage = () => {
  const { socket } = useSocket();
  const { control, handleSubmit } = useForm<FormData>();

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    if (!socket) {
      return;
    }

    socket.once("apiResponse", async (response) => {
      if (!response.error) {
        await fetch("/api/setCookie", {
          headers: {},
          body: JSON.stringify(data),
          method: "POST",
        });

        Router.push("/");
      } else {
        setError(response.error);
      }
    });

    socket.emit("register", data);
  });

  return (
    <>
      <LayoutContainer className={css.root}>
        <Typography>Register</Typography>
        <form onSubmit={onSubmit}>
          <FormControl required fullWidth margin="normal">
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField required type="text" label="Username" {...field} />
              )}
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  required
                  type="password"
                  label="Password"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField type="email" label="Email" {...field} />
              )}
            />
          </FormControl>
          {error && (
            <FormControl fullWidth margin="normal">
              <Alert severity="error">{error}</Alert>
            </FormControl>
          )}
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
