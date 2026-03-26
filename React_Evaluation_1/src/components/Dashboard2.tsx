import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import type { ProductDataRespone, Option } from "../types";
import useDebounce from "../hooks/useDebounce";
import ProductList from "./ProductList";
import Cart from "./Cart";

const initProductData: ProductDataRespone = {
  products: [],
  limit: 0,
  skip: 0,
  total: 0,
};
const baseUrl = "https://dummyjson.com/products";

const Dashboard2 = () => {
  const [options, setOptions] = useState<Option>({
    search: "",
    category: "",
    skip: 0,
    limit: 30,
    sortBy: "",
    order: "",
  });
  const { debouncedState: debouncedSearch } = useDebounce(options.search, 500);
  const url = useMemo(() => getSearchUrl(), [options, debouncedSearch]);
  const {
    data: productData,
    isLoading,
    error,
  } = useFetch<ProductDataRespone>(url, initProductData);

  const { data: allCategory } = useFetch<string[]>(
    "https://dummyjson.com/products/category-list",
    [],
  );

  const totalItems = productData.total;

  function getSearchUrl() {
    const optionsUrl = Object.entries(options)
      .slice(2)
      .filter(([_, value]) =>
        typeof value === "string" ? value !== "" : value >= 0,
      )
      .map((arr) => arr.join("="))
      .join("&&");
    if (options.category) {
      return baseUrl + `/category/${options.category}` + "?" + optionsUrl;
    }
    if (debouncedSearch) {
      return baseUrl + `/search?q=${debouncedSearch}` + "&&" + optionsUrl;
    }
    return baseUrl + "?" + optionsUrl;
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

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      <h2>Dashboard2</h2>
      <div className="layout">
        <div className="main-content">
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

            <select
              name="sortBy"
              value={options.sortBy}
              onChange={handleChange}
            >
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
          <ProductList products={productData.products} />

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
                    {options.limit > 0
                      ? Math.ceil(totalItems / options.limit)
                      : 1}
                  </div>
                </div>
              </div>

              <div className="pagination">
                {options.skip > 0 && options.limit <= totalItems && (
                  <button onClick={handlePrev}>Prev</button>
                )}
                {options.skip + productData.products.length < totalItems && (
                  <button onClick={handleNext}>Next Page</button>
                )}
              </div>
            </>
          )}
        </div>
        <Cart />
      </div>

      {error && <span>{error}</span>}
    </div>
  );
};

export default Dashboard2;
