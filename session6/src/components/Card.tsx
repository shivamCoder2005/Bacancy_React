import type { Product } from "../types/types";

type Props = {
  data: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Card = ({ data, setProducts }: Props) => {
  const { title, category, price, rating, stock } = data;

  function handleDelete() {
    setProducts((prev) =>
      prev.filter((product) => product.title !== data.title),
    );
  }
  return (
    <div className="card">
      <h3>{title}</h3>
      <ul>
        <li>Category :- {category}</li>
        <li>Price :- {price}</li>
        <li>Rating :- {rating}</li>
        <li>Stock :- {stock}</li>
        <button onClick={handleDelete}>Delete</button>
      </ul>
    </div>
  );
};

export default Card;
