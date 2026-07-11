import "./Navbar.css";
import Logo from "../assets/foodlogo.png";
import { CgProfile } from "react-icons/cg";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);

  const navigate = useNavigate();

  const HideMobileMenu = () => {
    setOpenMobile(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login");
      HideMobileMenu();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="Navbar">
      {/* Left */}
      <div className="nav-left">
        <img className="Logo" src={Logo} alt="Food Logo" />
        <h1 className="heading">BIVU FOOD UNIVERSE</h1>
      </div>

      {/* Middle */}
      <div className="nav-middle">
        <Link to="/home">Home</Link>
        <Link to="/service">Services</Link>
        <Link to="/about">About Us</Link>
        <Link to="/our-foods">Our Foods</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      {/* Right */}
      <div className="nav-right">
        <button
          className="Book-btn"
          onClick={() => navigate("/book-table")}
        >
          Book Your Table
        </button>

        <CgProfile
          className="icon"
          size={45}
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon">
        {openMobile ? (
          <RxCross2
            size={25}
            onClick={() => setOpenMobile(false)}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <TiThMenu
            size={25}
            onClick={() => setOpenMobile(true)}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {openMobile && (
        <div className="mobile-menu">
          <div className="mobile-menu-item">
            <Link onClick={HideMobileMenu} to="/">
              Home
            </Link>

            <Link onClick={HideMobileMenu} to="/services">
              Services
            </Link>

            <Link onClick={HideMobileMenu} to="/about">
              About Us
            </Link>

            <Link onClick={HideMobileMenu} to="/our-foods">
              Our Foods
            </Link>

            <Link onClick={HideMobileMenu} to="/contact">
              Contact Us
            </Link>
          </div>

          <div className="mobile-btn">
            <button
              className="Book-btn"
              onClick={() => {
                navigate("/booktable");
                HideMobileMenu();
              }}
            >
              Book Your Order
            </button>

            <button
              className="ls-btn"
              onClick={() => {
                navigate("/login");
                HideMobileMenu();
              }}
            >
              Login / Sign Up
            </button>

            <button
              className="ls-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;