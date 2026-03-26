import Dashboard from "./components/Dashboard";
import "./App.css";
import Dashboard2 from "./components/Dashboard2";
import CartContextProvider from "./components/CartContextProvider";

function App() {
  return (
    <>
      {/* <Dashboard/>  */}
      <CartContextProvider>
        <Dashboard2 />
      </CartContextProvider>
    </>
  );
}

export default App;
