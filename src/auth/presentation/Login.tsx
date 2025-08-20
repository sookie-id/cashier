import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import FloatingInput from "../../shared/components/OverlappingLabelInput";
import { userLoggedIn } from "../api/user-logged-in";
import { login } from "../workflow/login";
import "./login.css";

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
