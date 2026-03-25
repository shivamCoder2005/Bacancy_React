import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { useCartContext } from "./CartContextProvider";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  const { addToCart, updateCart } = useCartContext();
  return (
    <>
      {products.length > 0 ? (
        <div className="products">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              data={product}
              addToCart={addToCart}
              updateCart={updateCart}
            />
          ))}
        </div>
      ) : (
        <h2>No Products Found</h2>
      )}
    </>
  );
};

export default ProductList;
