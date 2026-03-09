import "./App.css";
import HeavyComponent from "./components/HeavyComponent";
import LightComponenet from "./components/LightComponenet";

function App() {
  return (
    <>
      <LightComponenet/>
      <br /><br /><br />
      <HeavyComponent/>
    </>
  );
}

export default App;

// qustions to ask
// what fiber improved a real life example??
// why useEffect needs to run after render and commit phase??
