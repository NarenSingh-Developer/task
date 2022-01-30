import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {useDispatch ,useSelector } from "react-redux";
import {authUser} from "../redux/api/get";

const PrivateRoute = ({ children}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  // const [auth, setAuth] = useState(false);
  console.log('auth: ', auth);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  
  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    
    await dispatch(authUser(token));
      setIsTokenValidated(true)
  };

  React.useEffect(() => {
    verifyToken();
  }, []);

  if(!isTokenValidated) return <div/>
     return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
