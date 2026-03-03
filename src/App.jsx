import { BrowserRouter, Routes, Route } from "react-router";
import './assets/styles/global.css'
import './App.css'
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Auth/Login"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  )
}
  
export default App;