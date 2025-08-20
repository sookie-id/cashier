import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import FloatingInput from "../shared/components/FloatingInput";
import { getSession } from "../data-access";
import { login } from "../workflows/login";
import "./login.css";

export async function clientLoader() {
  const session = await getSession();

  if (session) {
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
    navigate('/');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <FloatingInput label="Email" type="email" onChange={setEmail} />
        <FloatingInput
          label="Password"
          type="password"
          onChange={setPassword}
        />
        <button
          type="submit"
          className="login-button"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </form>
    </div>
  );
}
