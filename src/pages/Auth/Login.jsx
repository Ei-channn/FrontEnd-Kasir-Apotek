import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    console.log("FULL RESPONSE:", response.data);

    localStorage.setItem("token", response.data.access_token);

    navigate("/dashboard");

  } catch (error) {
    alert("Login gagal!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;