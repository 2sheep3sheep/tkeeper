import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Solvers from "./pages/solvers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/solvers" element={<Solvers/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
