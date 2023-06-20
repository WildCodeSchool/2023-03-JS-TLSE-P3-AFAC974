// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import LanguageMenu from "./components/LanguageMenu";
import "./App.css";

function App() {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [languageModalOpened, setLanguageModalOpened] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar
          setLoginModalOpened={setLoginModalOpened}
          setLanguageModalOpened={setLanguageModalOpened}
        />
        <Home />
        <p className="text-blue-500">coucou</p>
        {loginModalOpened && (
          <Login setLoginModalOpened={setLoginModalOpened} />
        )}
        {languageModalOpened && (
          <LanguageMenu setLanguageModalOpened={setLanguageModalOpened} />
        )}
      </div>
    </Router>
  );
}

export default App;
