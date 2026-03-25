import type { Product } from "../types";
import { useCartContext } from "./CartContextProvider";

type Props = {
  data: Product;
};

const Card = ({ data }: Props) => {
  const { thumbnail, title, category, price, rating, stock } = data;
  const { addToCart } = useCartContext();
  return (
    <div className="card">
      <img src={thumbnail} alt="product_img" />
      <h3>{title}</h3>
      <ul>
        <li>Id :- {data.id}</li>
        <li>Category :- {category}</li>
        <li>Price :- {price}</li>
        <li>Rating :- {rating}</li>
        <li>Stock :- {stock}</li>
        <button onClick={() => addToCart(data)}>Add To Cart</button>
      </ul>
    </div>
  );
};

export default Card;
