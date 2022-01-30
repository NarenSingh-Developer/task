import { authCheck } from "../isLoggedIn/actions";
import { getAllProducts } from "../product/actions";

export const authUser = (token) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/authCheck", {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });

    console.log("res", res);

    if (res.status === 200) {
      dispatch(authCheck(true));
    } else {
      dispatch(authCheck(false));
    }
  };
};

export const fetchAllProducts = (page) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:5000/product/${page}`);
      const data = await res.json();
      dispatch(getAllProducts(data.getallProducts));
    } catch (e) {
      console.log(e);
    }
  };
};
