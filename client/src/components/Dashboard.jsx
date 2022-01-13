import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
const Dashboard = () => {
  const [products, setProducts] = useState([]);
const [search, setSearch] = useState("")
  const [sortData, setSortData] = useState({brand: "", price: ""})
  const [addItem, setAddItem] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const csvReport = {
    data: products,
    filename: 'Products_Report.csv'
  };

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/product");
      const data = await res.json();
      setProducts(data.getallProducts);
    } catch (e) {
      console.log(e);
    }
  };

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
      getProducts();
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    if(search){
        const match = products.filter((item) => item.name === search || item.brand === search)
        setProducts(match)
    }
  }

  const sortInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSortData({...sortData, [name] : value});
  }
  const sortItem = (e) => {
      console.log("sortdata", sortData);
    e.preventDefault();
    const sortProduct = products.filter((item) => item.brand === sortData.brand && item.price <= sortData.price);
    setProducts(sortProduct)
    
  };
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/product/delete/${id}`, {
      method: "DELETE",
    });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [sortData, search]);
  return (
    <>
      <section>
        <h1>Dashboard</h1>
        <h3>Products</h3>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
         {/* Add new product */}

        <div>
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

        {/* search */}

        <div>
            <form onClick={(e) => searchSubmit(e)}>
                <input type="text" name="search" placeholder="search"  onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit">search</button>
            </form>
        </div>

         {/* sorting  */}

        <div className="sortItem">
          <form onSubmit={(e) => sortItem(e)}>
          <label htmlFor="">brand:</label>
          <input type="radio" name="brand" value="puma" onChange={(e) => sortInput(e)} />
          <label htmlFor="">puma</label>
          <input type="radio" name="brand" value="nike" onChange={(e) => sortInput(e)} />
          <label htmlFor="">nike</label>

          <br />
          <label htmlFor="">Price:</label>
          <input type="radio" name="price" value="500" onChange={(e) => sortInput(e)} />
          <label htmlFor="">0-500</label>
          <input type="radio" name="price" value="1000" onChange={(e) => sortInput(e)} />
          <label htmlFor="">0-1000</label>
          <input type="radio" name="price" value="2000" onChange={(e) => sortInput(e)} />
          <label htmlFor="">0-2000</label>
          <button type="submit">Apply</button>
          </form>
          <button onClick={() => getProducts()}>All</button>
        </div>

      {/* All Products */}

        {products.map((item) => (
          <div>
            <p>{item.name}</p>
            <p>{item.brand}</p>
            <p>{item.price}</p>
            <button onClick={() => deleteProduct(item._id)}>delete</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default Dashboard;
