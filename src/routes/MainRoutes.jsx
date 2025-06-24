import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/SignUp"
import Dashboard from "../pages/Dashboard"
import { isLoggedIn } from '../auth'


const MainRoutes = () => {
  return (
     <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={isLoggedIn() ? <Dashboard/> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default MainRoutes