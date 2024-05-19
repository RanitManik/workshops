import { createRoot } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Raja" animal="Dog" breed="German" />
      <Pet name="Ganja" animal="Cat" breed="American" />
      <Pet name="Manja" animal="Kangaroo" breed="Australian" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
