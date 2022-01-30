import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const Navigate = useNavigate();
  const [newuser, setNewuser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewuser({ ...newuser, [name]: value });
  };

  const Submit = async (e) => {
      console.log("user", newuser);
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    });
    const data = await res.json();

    if(data.error)
    {
        window.alert(data.error);
    }else{
      window.alert(data.message);
      setNewuser({
        name: "",
        email: "",
        password: "",
      })
      Navigate("/login")
    }
  };
  return (
    <>
      <section className="signupSection">
      <div className="signupDiv">
        <h1>SignUp</h1>
        <form method="POST" onSubmit={(e) => Submit(e)}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleInput(e)}
            value={newuser.name}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleInput(e)}
            value={newuser.email}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleInput(e)}
            value={newuser.password}
            autoComplete="off"
          />
                <Link to="/login" style={{marginTop: "15px", textAlign: "center"}}>Already have account</Link>
          <button type="submit">Submit</button>
        </form>
</div>
      </section>
    </>
  );
};

export default SignUp;
