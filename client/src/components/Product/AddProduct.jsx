import React, { useState } from "react";
import Navbar from "../Navbar";

const AddProduct = () => {
  const [addItem, setAddItem] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddItem({ ...addItem, [name]: value });
  };

  const Submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addItem),
    });
    const data = await res.json();

    if (data.error) {
      window.alert(data.error);
    } else {
      window.alert(data.message);
      setAddItem({
        name: "",
        brand: "",
        price: "",
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className="addSection">
        <div className="addDiv">
          <h3>Add Product</h3>
          <form method="POST" onSubmit={(e) => Submit(e)}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleInput(e)}
              value={addItem.name}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="brand"
              name="brand"
              onChange={(e) => handleInput(e)}
              value={addItem.brand}
              autoComplete="off"
            />
            <input
              type="number"
              placeholder="price"
              name="price"
              onChange={(e) => handleInput(e)}
              value={addItem.price}
              autoComplete="off"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
