import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authCheck } from "../redux/isLoggedIn/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    dispatch(authCheck(false));
  };

  return (
    <>
      <header>
        <ul>
          <li>
            <Link to={`/dashboard/${1}`}>Dashboard</Link>
          </li>
          <li>
            <Link to="/addItem">AddItem</Link>
          </li>
        </ul>
        <button onClick={() => logout()} style={{ marginTop: "0px" }}>
          Logout
        </button>
      </header>
    </>
  );
};

export default Navbar;
