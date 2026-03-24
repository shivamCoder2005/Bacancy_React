import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header, Navbar } from "./components";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
