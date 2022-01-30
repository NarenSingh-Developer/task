import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/api/get";
import { filterProduct } from "../redux/api/post";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState({ brand: "", price: "" });
  const [page, setPage] = useState(1);
  console.log("page: ", page);

  const csvReport = {
    data: products,
    filename: "Products_Report.csv",
  };

  const nextPage = () => {
    setPage(page + 1);
    dispatch(fetchAllProducts(page));
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      dispatch(fetchAllProducts(page));
    }
  };
  const getProducts = async () => {
    dispatch(fetchAllProducts(page));
    // try {
    //   const res = await fetch("http://localhost:5000/product");
    //   const data = await res.json();
    //   setProducts(data.getallProducts);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    dispatch(filterProduct({ search }));

    // if (search) {
    //   const match = products.filter(
    //     (item) => item.name === search || item.brand === search
    //   );
    // try {
    //   const res = await fetch("http://localhost:5000/product/sortdata", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ search }),
    //   });
    //   console.log("res>>>>>>>>>>>>>", res);
    // } catch (e) {
    //   console.log(e);
    // }
    // setProducts(match);
  };

  const sortInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSortData({ ...sortData, [name]: value });
  };
  const sortItem = async (e) => {
    console.log("sortData: ", sortData);
    // let { brand, price } = sortData;
    e.preventDefault();
    dispatch(filterProduct(sortData));
    // if (sortData.brand && sortData.price) {
    //   var result = products.filter(
    //     (item) => item.brand === sortData.brand && item.price <= sortData.price
    //   );
    //   setProducts(result);
    // } else if (sortData.price) {
    //   var result2 = products.filter((item) => item.price <= sortData.price);
    //   setProducts(result2);
    // } else if (sortData.brand) {
    //   var result3 = products.filter((item) => item.brand === sortData.brand);
    //   setProducts(result3);
    // }
  };
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/product/delete/${id}`, {
      method: "DELETE",
    });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [search, page]);
  return (
    <>
      <section className="dashboard">
        <Navbar />

        <div className="productDiv">
          <div className="filterDiv">
            {/* sorting  */}

            <div className="sortItem">
              <form onSubmit={(e) => sortItem(e)}>
                <label className="mr-2" htmlFor="">
                  brand:
                </label>
                <input
                  type="radio"
                  name="brand"
                  value="puma"
                  className="mr-2"
                  onChange={(e) => sortInput(e)}
                />
                <label className="mr-2">puma</label>
                <input
                  type="radio"
                  name="brand"
                  value="nike"
                  className="mr-2"
                  onChange={(e) => sortInput(e)}
                />
                <label className="mr-2">nike</label>

                <br />
                <label className="mr-2">Price:</label>
                <input
                  type="radio"
                  name="price"
                  value="500"
                  className="mr-2"
                  onChange={(e) => sortInput(e)}
                />
                <label className="mr-2">0-500</label>
                <input
                  type="radio"
                  name="price"
                  value="1000"
                  className="mr-2"
                  onChange={(e) => sortInput(e)}
                />
                <label className="mr-2">0-1000</label>
                <input
                  type="radio"
                  name="price"
                  value="2000"
                  className="mr-2"
                  onChange={(e) => sortInput(e)}
                />
                <label className="mr-2">0-2000</label>
                <button type="submit" style={{ marginTop: "10px" }}>
                  Apply
                </button>
              </form>
            </div>
          </div>

          <div className="row">
            {/* search */}

            <div className="searchDiv">
              <form onSubmit={(e) => searchSubmit(e)}>
                <input
                  type="text"
                  name="search"
                  placeholder="search"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ marginRight: "20px" }}
                />
                <button className="mr-2" type="submit">
                  Search
                </button>
                <button className="mr-2" onClick={() => getProducts()}>
                  ALL PRODUCT
                </button>
                <CSVLink {...csvReport}>EXPORT CSV</CSVLink>
              </form>
            </div>

            {/* All Products */}

            {products?.map((item) => (
              <div className="card">
                <img
                  width="100%"
                  src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=1f00&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true"
                />
                <div className="card-text">
                  <p>{item.name}</p>
                  <p>{item.brand}</p>
                  <p>{item.price}</p>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    style={{ width: "100%" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="pageDiv">
              <button className="mr-2" onClick={prevPage}>
                prev
              </button>
              <button className="mr-2" onClick={nextPage}>
                next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
