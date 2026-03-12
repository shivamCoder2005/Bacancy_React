import { useEffect, useReducer, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type CreateProduct = Omit<Product, "id">;

type State = {
  products: Product[];
};

type Error = {
  message: string;
};

type Action =
  | { type: "ADD_PRODUCT"; payload: { data: Product } }
  | { type: "REMOVE_PRODUCT"; payload: { id: number } }
  | { type: "UPDATE_PRODUCT"; payload: { id: number; data: CreateProduct } };

let ProductId = 1;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PRODUCT":
      state.products.push(action.payload.data);
      console.log(state);
      return state;
    case "REMOVE_PRODUCT":
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
      return state;
    case "UPDATE_PRODUCT":
      let found = false;
      state.products.forEach((product) => {
        if (product.id === action.payload.id) {
          found = true;
          Object.assign(product, action.payload.data);
        }
      });
      if (!found) throw new Error("Product Not Found");
      return state;

    default:
      return state;
  }
}

const Task6_2 = () => {
  const initState: State = {
    products: [],
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const [formData, setFormData] = useState<CreateProduct>({
    name: "",
    price: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchFlag, setFetchFlag] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpatePrice] = useState(0);

  useEffect(() => {
    setProducts(state.products);
  }, [fetchFlag]);

  function addProduct(): void {
    if (!formData.name) {
      setError({ message: "Please Provide Name Of Product" });
    }
    if (!formData.price) {
      setError({ message: "Please Provide Price Of Product" });
    }
    const newProduct: Product = {
      id: ProductId,
      name: formData.name,
      price: formData.price,
    };
    dispatch({ type: "ADD_PRODUCT", payload: { data: newProduct } });
    console.log(state.products);
    setFetchFlag((prev) => !prev);
    setFormData({ name: "", price: 0 });
    ProductId++;
  }

  function removeProduct(pid: number): void {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id: pid } });
    setFetchFlag((prev) => !prev);
  }

  function enableFields({ id, name, price }: Product): void {
    setUpdateName(name);
    setUpatePrice(price);
    setIsUpdating(true);
    setEditingId(id);
  }

  function updatedProduct(pid: number): void {
    if (!updateName) {
      setError({ message: "Please Provide Name Of Product" });
    }
    if (!updatePrice) {
      setError({ message: "Please Provide Price Of Product" });
    }
    const updatedProduct = { name: updateName, price: updatePrice };
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: pid, data: updatedProduct },
    });
    setFetchFlag((prev) => !prev);
    setEditingId(0);
    setIsUpdating(false);
    setUpdateName("");
    setUpatePrice(0);
  }

  function handleFormStateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [key]: key === "price" ? Number(value) : value };
    });
  }

  return (
    <>
      <label htmlFor="name">Enter Product Name :- </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={(e) => handleFormStateChange(e)}
        required
      />
      <br />
      <label htmlFor="price">Enter Product Price :- </label>
      <input
        type="number"
        name="price"
        id="price"
        value={formData.price}
        onChange={(e) => handleFormStateChange(e)}
        required
      />
      <br />
      {error && <h2>{error.message}</h2>}
      <button onClick={addProduct}>ADD Product</button>

      {products ? (
        products.map((product) => {
          return (
            <div key={product.id}>
              <ul>
                {/* // to have inplace updates */}
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.id !== editingId ? product.name : updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  disabled={product.id !== editingId}
                />
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.id !== editingId ? product.price : updatePrice}
                  onChange={(e) => setUpatePrice(Number(e.target.value))}
                  disabled={product.id !== editingId}
                />
              </ul>
              <button onClick={() => removeProduct(product.id)}>Delete</button>
              <button
                onClick={
                  isUpdating && product.id === editingId
                    ? () => updatedProduct(product.id)
                    : () => enableFields(product)
                }
              >
                {isUpdating && product.id === editingId
                  ? "Apply Update"
                  : "Update"}
              </button>
            </div>
          );
        })
      ) : (
        <h2>No Products !! Please Add Product First</h2>
      )}
    </>
  );
};

export default Task6_2;
