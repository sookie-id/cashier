import { useEffect, useState } from "react";
import FloatingInput from "../../components/FloatingInput";
import { login } from "../../workflows/login";
import "./index.css";
import { getSession } from "../../data-access";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check for existing session and redirect if present
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        window.location.href = "/";
      }
    };
    checkSession();
  }, []);

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
