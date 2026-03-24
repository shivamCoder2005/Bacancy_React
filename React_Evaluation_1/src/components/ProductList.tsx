import type { Product } from "../types";
import Card from "./Card";
import { memo } from "react";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <>
      {products.length > 0 ? (
        <div className="products">
          {products.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <h2>No Products Found</h2>
      )}
    </>
  );
};

export default ProductList;
