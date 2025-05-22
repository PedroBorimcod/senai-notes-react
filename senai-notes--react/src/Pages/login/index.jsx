import { useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = () => {
    if (email === "teste@teste.com" && password === "123456") {
      toast.success("Login realizado com sucesso!");
      let token = "meuToken";
      let userId = "meuId";
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      window.location.href = "/notes";
    } else {
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <>
      <div className="page__mask">
        <div className="form__container">
          <img src="assets/logo.svg" alt="Logo do Senai Notes." />
          <h1>Welcome to Note</h1>
          <p className="subtitle">Please log in to continue</p>

          <label>
            Email Address
            <input
              type="text"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <button onClick={onLoginClick}>Login</button>

          <p className="form__hint">
            No account yet? <a href="/new-user">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
