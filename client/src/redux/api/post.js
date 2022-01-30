import { getFilterProduct } from "../product/actions";

export const filterProduct = (value) => {
    return(
        async (dispatch)  => {
            try {
                const res = await fetch("http://localhost:5000/product/sortdata", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(value),
                });
                const data = await res.json();
                dispatch(getFilterProduct(data.getfilterProduct))
              } catch (e) {
                console.log(e);
              }
        }
    )
}