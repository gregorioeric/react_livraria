import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layouts from "./components/layouts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
