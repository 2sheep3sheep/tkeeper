import './App.css';

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
