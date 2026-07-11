import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import ServicePage from './pages/ServicePage.jsx'
import BookTable from './components/BookTable.jsx'
import ExploreMenu from './pages/OurMenu.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Checkout from "./pages/CheckOutPage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import Contact from "./pages/ContactPage.jsx"
import Facilities from "./components/Facilities.jsx"
import OurFoods from "./pages/OurFoods.jsx"
import ServiceDetailsPage from "./pages/ServiceDetailsPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
            
            <Route path='/' element={<Signup />} />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="/service" element={<ProtectedRoute><ServicePage /></ProtectedRoute>} />
            <Route path="/book-table" element={<ProtectedRoute><BookTable /></ProtectedRoute>} />
            <Route path="/explore-menu" element={<ProtectedRoute><ExploreMenu /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
            <Route path="/our-foods" element={<ProtectedRoute><OurFoods /></ProtectedRoute>} />
            <Route path="/service-details:_id" element={<ProtectedRoute><ServiceDetailsPage /></ProtectedRoute>} />
            
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App