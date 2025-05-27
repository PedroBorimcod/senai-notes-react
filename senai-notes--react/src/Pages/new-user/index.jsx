import { useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import Logo from "../../assets/imgs/Logo Wrapper.png"

function NewUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpClick = async () => {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (response.ok) {
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      toast.error("Erro ao cadastrar o usuário, tente novamente.");
    }
  };

  return (
    <>
      <div className="page__mask">
        <div className="form__container">
          <img src={Logo} alt="Logo do Senai Notes." />

          <h1>Create Your Account</h1>
          <p className="subtitle">
            Sign up to start organizing your notes and boost your productivity.
          </p>

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

          <button onClick={onSignUpClick}>Sign Up</button>

          <p className="form__hint">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default NewUser;
