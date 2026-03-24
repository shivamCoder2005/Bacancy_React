import type { Product } from "../types/types";
import Card from "./Card";

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductList = ({ products,setProducts }: Props) => {
  return (
    <>
      {products.length > 0 ? (
        <div className="products">
          {products.map((product) => (
            <Card key={product.title} data={product} setProducts={setProducts}/>
          ))}
        </div>
      ) : (
        <h2>No Products Found</h2>
      )}
    </>
  );
};

export default ProductList;
