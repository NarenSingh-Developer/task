import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children}) => {
    console.log('Component: ', children);
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  const verifyToken = async () => {
    const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/", {
      method: "POST", 
      headers: {
          Authorization: token,
        },
      });
      console.log("res", res);

      if (res.status === 200) {
        setAuth(true)
      }else{
        setAuth(false)
      }

      setIsTokenValidated(true)
  };

  React.useEffect(() => {
    verifyToken();
  }, []);

  if(!isTokenValidated) return <div/>
     return auth ? children : <Navigate to="/login" />;
  

};

export default PrivateRoute;
