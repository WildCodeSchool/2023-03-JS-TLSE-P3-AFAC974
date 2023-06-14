// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import ArtworksAdministration from "./pages/ArtworksAdministration";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <ArtworksAdministration />
        <p>coucou</p>
      </div>
    </Router>
  );
}

export default App;
