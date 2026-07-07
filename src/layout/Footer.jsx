import "./Footer.css"
import image from "../assets/foodlogo.png"
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import momentimage from "../assets/moment.jpg";

function Footer() {
  return (
    <>
      <div className="Footer">
        {/* Left */}
        <div className="footer-left">
          <div className="logo-name">
            <img className="logo" src={image} alt="My Logo" />
            <h2 className="heading">BIVU FOOD UNIVERSE</h2>
          </div>
          <p className="para">In the new era of technology we look a in the future with certainty and pride to for our company and.</p>
          <div className="social-icons">
            <a href="">
              <div className="socila-link">
                <FaTwitter size={20} />
              </div>
            </a>
            <a href="">
              <div className="socila-link">
                <FaFacebookF size={20} />
              </div>
            </a>
            <a href="https://www.instagram.com/manoj_code_wala/" target="_blank">
              <div className="socila-link">
                <FaInstagram size={20} />
              </div>
            </a>
            <a href="">
              <div className="socila-link">
                <FaGithub size={20} />
              </div>
            </a>
          </div>
        </div>
        {/* Middle */}
        <div className="footer-middle">
          <div className="first">
            <p>Pages</p>
            <ul className="page-list">
              <li>Home</li>
              <li>About</li>
              <li>Menu</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Delivery</li>
            </ul>
          </div>
          <div className="second">
            <p>Utility Pages</p>
            <ul className="utility-list">
              <li>Start Here</li>
              <li>Styleguide</li>
              <li>Password Protected</li>
              <li>404 Not Found</li>
              <li>Licenses</li>
              <li>Changelog</li>
              <li>View More</li>
            </ul>
          </div>
        </div>
        {/* Right */}
        <div className="footer-right">
          <p>Our Moment</p>
          <div className="photo">
            <img className="image" src={momentimage} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer