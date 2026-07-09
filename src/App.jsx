import Navbar from "./layout/Navbar.jsx";
import Footer from "./layout/Footer.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BookTable from "./components/BookTable.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import OurMenu from "./pages/OurMenu.jsx";
import OurFoods from "./pages/OurFoods.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import FoodDetailsPage from "./pages/FoodDetailsPage.jsx";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div style={{ marginTop: isAdminRoute ? "0px" : "80px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booktable" element={<BookTable />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/our-menu" element={<OurMenu />} />
          <Route path="/our-foods" element={<OurFoods />} />
          <Route path="/details/:id" element={<FoodDetailsPage />} />
          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route path="" element={<AdminPanel />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;