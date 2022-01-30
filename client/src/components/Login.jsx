import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log("data: ", data);

    if (data.error) {
      window.alert(data.error);
    } else {
      window.alert(data.message);
      setEmail("");
      setPassword("");
      localStorage.setItem("token", data.token);
      Navigate(`/dashboard/${1}`);
    }
  };
  return (
    <>
      <section className="loginSection">
        <div className="loginDiv">
          <h1>Login</h1>
          <form method="POST" onSubmit={(e) => Submit(e)}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <Link
              to="/signup"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              Don't have an account
            </Link>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
