import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <p>coucou</p>
      </div>
    </Router>
  );
}

export default App;
