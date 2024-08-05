import React, { useState, useEffect } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="App">
      <Router basename="/ec-frontend-task">
        <Routes>
          <Route path="/ec-frontend-task" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path="/products" element={<ProductList />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
