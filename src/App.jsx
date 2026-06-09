import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ServicePage from "./pages/ServicePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={{marginTop:"100px"}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
