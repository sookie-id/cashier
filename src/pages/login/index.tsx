import { useState } from "react";
import { redirect } from "react-router";
import FloatingInput from "../../components/FloatingInput";
import { getSession } from "../../data-access";
import { login } from "../../workflows/login";
import "./index.css";

export async function clientLoader() {
  const session = await getSession();

  if (session) {
    // already logged in -> go home
    throw redirect("/");
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login(email, password);
    window.location.href = "/";
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
