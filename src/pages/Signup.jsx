import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    gender: "",
    email: "",
    password: "",
    role: "customer", // sensible default; change if your backend expects something else
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { fullName, phoneNo, gender, email, password, role } = formData;
    if (!fullName || !phoneNo || !gender || !email || !password || !role) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully registered -> redirect to login page
        navigate("/login");
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Cannot connect to server. Please check your connection.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <h2>Create an Account</h2>
          <p className="subtitle">Join us to order delicious food items!</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter your phone number"
                value={formData.phoneNo}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="auth-input"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            {/* Only include this field if users should choose their own role.
                If "role" should always default to "customer" behind the scenes,
                remove this select and keep it out of the visible form entirely. */}
            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="auth-input"
                required
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;