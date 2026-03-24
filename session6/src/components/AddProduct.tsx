import React, { useState } from "react";
import type { Product } from "../types/types";

const initialState: Product = {
  category: "",
  title: "",
  price: 0,
  rating: 0,
  stock: 0,
};

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const AddProduct = ({ setProducts }: Props) => {
  const [productData, setProductData] = useState<Product>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>(
    {},
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  function validate() {
    const newErrors: typeof errors = {};

    if (!productData.title.trim()) newErrors.title = "Title is required";
    if (!productData.category.trim())
      newErrors.category = "Category is required";
    if (productData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (productData.rating < 1 || productData.rating > 5)
      newErrors.rating = "Rating must be between 1-5";
    if (productData.stock < 0) newErrors.stock = "Stock cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    const finalData: Product = {
      ...productData,
      title: productData.title.trim(),
      category: productData.category.trim(),
    };

    setProducts((prev) => [finalData, ...prev]);
    setProductData(initialState);
  }

  return (
    <div className="form-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            aria-invalid={!!errors.title}
            aria-describedby="title-error"
          />
          {errors.title && (
            <p id="title-error" className="error">
              {errors.title}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            aria-invalid={!!errors.category}
            aria-describedby="category-error"
          />
          {errors.category && (
            <p id="category-error" className="error">
              {errors.category}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            aria-invalid={!!errors.price}
            aria-describedby="price-error"
          />
          {errors.price && (
            <p id="price-error" className="error">
              {errors.price}
            </p>
          )}
        </div>

        {/* Rating */}
        <div className="form-group">
          <label htmlFor="rating">Rating (1–5)</label>
          <input
            id="rating"
            type="number"
            name="rating"
            min={1}
            max={5}
            value={productData.rating}
            onChange={handleChange}
            aria-invalid={!!errors.rating}
            aria-describedby="rating-error"
          />
          {errors.rating && (
            <p id="rating-error" className="error">
              {errors.rating}
            </p>
          )}
        </div>

        {/* Stock */}
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            aria-invalid={!!errors.stock}
            aria-describedby="stock-error"
          />
          {errors.stock && (
            <p id="stock-error" className="error">
              {errors.stock}
            </p>
          )}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
