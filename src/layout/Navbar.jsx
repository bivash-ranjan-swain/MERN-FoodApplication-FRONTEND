import "./Navbar.css"
import Logo from "../assets/foodlogo.png"
import { CgProfile } from "react-icons/cg";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {

  const [openMobile, setOpenMobile] = useState(false)

  function HideMobileMenu() {
    setOpenMobile(false)
  }

  const navigate = useNavigate()
  return (
    <>
      <div className="Navbar">
        {/* left Div */}
        <div className="nav-left">
          <img className="Logo" src={Logo} alt="My Logo" />
          <h1 className="heading">BIVU FOOD UNIVERSE</h1>
        </div>

        {/* Middle */}
        <div className="nav-middle">
          <Link to="/">Home</Link>
          <Link to="/service">Service</Link>
          <Link to="/about">About Us</Link>
          <Link to="/our-foods">Our Foods</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Right */}
        <div className="nav-right">
          <button onClick={() => navigate("/booktable")} className="Book-btn">Book Your Order</button>
          <CgProfile onClick={() => navigate("/login")} className="icon" size={45} />
        </div>

        {/* menu Icon */}
        <div className="menu-icon">
          {openMobile ?
            <RxCross2 size={25} onClick={() => setOpenMobile(!openMobile)} /> :
            <TiThMenu size={25} onClick={() => setOpenMobile(!openMobile)} />}
        </div>

        {/* Mobile Menu View */}
        {openMobile && (
          <div className="mobile-menu">
            <div className="mobile-menu-item">
              <Link onClick={HideMobileMenu} to="/">Home</Link>
              <Link onClick={HideMobileMenu} to="/service">Service</Link>
              <Link onClick={HideMobileMenu} to="/about">About Us</Link>
              <Link onClick={HideMobileMenu} to="/our-food">Our Foods</Link>
              <Link onClick={HideMobileMenu} to="/contact">Contact Us</Link>
            </div>
            <div className="mobile-btn">
              <button className="Book-btn" onClick={() => { navigate("/booktable"); HideMobileMenu() }}>Book Your Order</button>
              
              <button className="ls-btn" onClick={() => { navigate("/login"); HideMobileMenu() }}>Login/SignUp</button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Navbar