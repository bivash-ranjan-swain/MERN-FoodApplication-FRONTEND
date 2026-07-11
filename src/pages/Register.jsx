import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../layout/Navbar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  async function handelRegister(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/auth/register", { fullName, phoneNo, gender, email, password }, { withCredentials: true })
      console.log(response);
      navigate("/login");

    } catch (error) {
      console.log(error.message || error);
    }

  }
  return (
    <>
      <Navbar />
      <section className="register-section">
        <div className="register-container">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Register your account to get started.</p>
          </div>

          <form className="register-form" onSubmit={handelRegister}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNo}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
                <option value={"others"}>Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;