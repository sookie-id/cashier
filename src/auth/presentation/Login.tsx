import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import { PrimaryButton } from "../../shared/components/Button.styled";
import Input from "../../shared/components/Input";
import { userLoggedIn } from "../api/user-logged-in";
import { login } from "../workflow/login";
import { LoginContainer } from "./Login.styled";

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

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <form>
        <Input label="Email" type="email" onChange={setEmail} required />
        <Input
          label="Password"
          type="password"
          onChange={setPassword}
          required
        />
        <PrimaryButton type="submit" onClick={(e) => handleLogin(e)}>
          Login
        </PrimaryButton>
      </form>
    </LoginContainer>
  );
}
