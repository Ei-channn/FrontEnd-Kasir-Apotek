import { BrowserRouter, Routes, Route } from "react-router";
import './assets/styles/global.css'
import './App.css'
import Dashboard from "./pages/Dashboard"
import KategoriObat from "./pages/KategoriObat"
import Obat from "./pages/Obat"
import Transaksi from "./pages/Transaksi"
import History from "./pages/History"
import Login from "./pages/Auth/Login"
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/kategori" element={<KategoriObat />}/>
      <Route path="/obat" element={<Obat />}/>
      <Route path="/transaksi" element={<Transaksi />}/>
      <Route path="/history" element={<History />}/>
      <Route path="/users" element={<Users />}/>
    </Routes>
  )
}

export default App;