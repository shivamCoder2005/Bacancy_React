import React, { useEffect, useState } from "react";
import type { Product, Option, ProductDataRespone } from "../types";
import Card from "./Card";
import ProductList from "./ProductList";

const baseUrl = "https://dummyjson.com/products";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [options, setOptions] = useState<Option>({
    search: "",
    category: "",
    skip: 0,
    limit: 30,
    sortBy: "",
    order: "",
  });

  useEffect(() => {
    if (!options.search) {
      fetchProducts();
      return;
    }
    const timerId = setTimeout(() => fetchProducts(), 1000);
    return () => clearTimeout(timerId);
  }, [options]);

  useEffect(() => {
    async function fetchCategory() {
      const result = await fetchData(
        "https://dummyjson.com/products/category-list",
      );
      setAllCategory(result);
    }
    fetchCategory();
  }, []);

  function getSearchUrl() {
    const optionsUrl = Object.entries(options)
      .slice(2)
      .filter(([_, value]) =>
        typeof value === "string" ? value !== "" : value >= 0,
      )
      .map((arr) => arr.join("="))
      .join("&&");
    if (options.search) {
      return baseUrl + `/search?q=${options.search}` + "&&" + optionsUrl;
    }
    if (options.category) {
      return baseUrl + `/category/${options.category}` + "?" + optionsUrl;
    }
    return baseUrl + "?" + optionsUrl;
  }

  async function fetchProducts() {
    try {
      setIsLoading(true);
      setError("");
      const result: ProductDataRespone = await fetchData(getSearchUrl());
      if (result.products.length == 0) {
        setError("404 No Product Found!!!");
        setProducts([]);
        setIsLoading(false);
        return;
      }
      setProducts(result.products);
      setIsLoading(false);
      setTotalItems(result.total);
    } catch (error) {
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

  function handleNext() {
    setOptions((prev) => {
      return {
        ...prev,
        skip: prev["skip"] + (options.limit > 0 ? options.limit : 10),
      };
    });
  }

  function handlePrev() {
    setOptions((prev) => {
      return {
        ...prev,
        skip: prev["skip"] - (options.limit > 0 ? options.limit : 10),
      };
    });
  }

  function clearFilter() {
    setOptions({
      skip: 0,
      limit: 30,
      search: "",
      sortBy: "",
      order: "",
      category: "",
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

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
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

        {allCategory.length > 0 && (
          <>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              value={options.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {allCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </>
        )}
        <button onClick={clearFilter}>Remove All Filters</button>
      </div>
      {/* Products */}
      <ProductList products={products} />

      {!error && (
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
      )}

      <br />
      {/* Error */}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Dashboard;
