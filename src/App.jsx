import Messenger from "./pages/Messenger";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
   //initializing protected route
   const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
   }


  return(
   <BrowserRouter>
      <Routes>
         <Route path="/"/>
         <Route index element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
         <Route path="messenger" element={<Messenger />} />
         <Route path="login" element={<Login />} />
         <Route path="register" element={<Register />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App;
