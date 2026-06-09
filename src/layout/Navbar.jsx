import "./Navbar.css"
import Logo from "../assets/foodlogo.png"
import { CgProfile } from "react-icons/cg";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
function Navbar() {

  const [openMobile, setOpenMobile] = useState(false)
  return (
    <>
      <div className="Navbar">
        {/* left Div */}
        <div className="nav-left">
          <img className="Logo" src={Logo} alt="My Logo" />
          <h1 className="heading">Manoj Food-Corner</h1>
        </div>

        {/* Middle */}
        <div className="nav-middle">
          <Link to="/">Home</Link>
          <Link to="/service">Service</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Right */}
        <div className="nav-right">
          <button className="Book-btn">Book Your Order</button>
          <CgProfile className="icon" size={45} />
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
              <Link to="/">Home</Link>
              <Link to="/service">Service</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="mobile-btn">
              <button className="Book-btn">Book Your Order</button>
              <button className="ls-btn">Login/SignUp</button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Navbar