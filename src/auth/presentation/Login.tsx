import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import { userLoggedIn } from "../api/user-logged-in";
import { login } from "../workflow/login";
import { H1, LoginButton, LoginContainer, StyledInput } from "./Login.styled";

export async function clientLoader() {
  const user_logged_in = await userLoggedIn();

  if (user_logged_in) {
    // already logged in -> go home
    throw redirect("/");
  }
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <LoginContainer>
        <H1>Login</H1>
        <StyledInput
          label="Email"
          type="email"
          onChangeValue={setEmail}
          required
        />
        <StyledInput
          label="Password"
          type="password"
          onChangeValue={setPassword}
          required
        />
        <LoginButton type="submit">Login</LoginButton>
      </LoginContainer>
    </form>
  );
}
