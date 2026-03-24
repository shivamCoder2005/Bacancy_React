import React, { useEffect, useRef, useState } from "react";
import type { Product, Option, ProductDataRespone } from "../types/types";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const baseUrl = "https://dummyjson.com/products";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [options, setOptions] = useState<Option>({
    search: "",
    skip: 0,
    limit: 30,
    sortBy: "",
    order: "",
  });
  const observerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const first = entries[0];

      if (
        first.isIntersecting &&
        !isLoading &&
        products.length < totalItems
      ) {

        setOptions((prev) => ({
          ...prev,
          skip: prev.skip + prev.limit,
        }));
      }
    },
    {
      threshold: 0.6,
      rootMargin: "500px",
    }
  );

  const currentRef = observerRef.current;

  if (currentRef) observer.observe(currentRef);

  return () => {
    if (currentRef) observer.unobserve(currentRef);
  };
}, [products.length]);

useEffect(() => {
  const url = getSearchUrl(); 

  if (!options.search) {
    fetchProducts(url);
    return;
  }
  const timerId = setTimeout(() => fetchProducts(url), 1000);
  return () => clearTimeout(timerId);
}, [options]);

  function getSearchUrl() {
    const optionsUrl = Object.entries(options)
      .slice(1)
      .filter(([_, value]) =>
        typeof value === "string" ? value !== "" : value >= 0,
      )
      .map((arr) => arr.join("="))
      .join("&");
    if (options.search) {
      return baseUrl + `/search?q=${options.search}` + "&" + optionsUrl;
    }
    return baseUrl + "?" + optionsUrl;
  }

async function fetchProducts(url:string) {
  try {
    setIsLoading(true);
    setError("");

    const result: ProductDataRespone = await fetchData(url);

    if (result.products.length === 0) {
      setError("404 No Product Found!!!");
      setProducts([]);
      return;
    }

    setProducts((prev) => [...prev, ...result.products]);
    setTotalItems(result.total);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setOptions((prev) => {
      return { ...prev, [name]: name === "limit" ? Number(value) : value };
    });
  }

  // function handleNext() {
  //   setOptions((prev) => {
  //     return {
  //       ...prev,
  //       skip: prev["skip"] + (options.limit > 0 ? options.limit : 10),
  //     };
  //   });
  // }

  // function handlePrev() {
  //   setOptions((prev) => {
  //     return {
  //       ...prev,
  //       skip: prev["skip"] - (options.limit > 0 ? options.limit : 10),
  //     };
  //   });
  // }

  function clearFilter() {
    setOptions({
      skip: 0,
      limit: 30,
      search: "",
      sortBy: "",
      order: "",
    });
  }

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!result) {
        setError("Error While Fetching Data");
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="dashboard">
      <AddProduct setProducts={setProducts} />
      {/* Controls */}
      <div className="controls">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          name="search"
          id="search"
          value={options.search}
          onChange={handleChange}
        />

        <label htmlFor="limit">Enter Limit :-</label>
        <input
          type="number"
          name="limit"
          id="limit"
          value={options.limit}
          min={0}
          onChange={handleChange}
        />

        <select name="sortBy" value={options.sortBy} onChange={handleChange}>
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <select name="order" value={options.order} onChange={handleChange}>
          <option value="">Order</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

        <button onClick={clearFilter}>Remove All Filters</button>
      </div>
      {/* Products */}
      <ProductList products={products} setProducts={setProducts} />
      <div
        style={{ width: "300px", height: "300px", border: "1px solid black" }}
        ref={observerRef}
      >
        Loading....
      </div>
      {/* pagination */}
      {/* {!error && (
        <>
          <div className="stats">
            <div className="stat-box">
              <div className="stat-label">Total Results</div>
              <div className="stat-value">{totalItems}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Current Page</div>
              <div className="stat-value">
                {options.limit > 0
                  ? Math.floor(options.skip / options.limit) + 1
                  : 1}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Total Pages</div>
              <div className="stat-value">
                {options.limit > 0 ? Math.ceil(totalItems / options.limit) : 1}
              </div>
            </div>
          </div>

          <div className="pagination">
            {options.skip > 0 && options.limit <= totalItems && (
              <button onClick={handlePrev}>Prev</button>
            )}
            {options.skip + products.length < totalItems && (
              <button onClick={handleNext}>Next Page</button>
            )}
          </div>
        </>
      )} */}

      <br />
      {/* Error */}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Dashboard;


