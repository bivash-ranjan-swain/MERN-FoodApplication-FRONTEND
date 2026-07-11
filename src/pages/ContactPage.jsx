import { useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8800/api/contact/create",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="contact-section">
        <div className="contact-header">
          <h1>Contact Us</h1>

          <p>
            We consider all the drivers of change gives you the components
            <br />
            you need to change to create a truly happens.
          </p>
        </div>

        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="Write a subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Message</label>

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="send-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-box">
            <h4>Call Us:</h4>
            <p className="highlight">+91 96920-74451</p>
          </div>

          <div className="info-box">
            <h4>Hours:</h4>
            <p></p>
            <p></p>
          </div>

          <div className="info-box">
            <h4>Our Location:</h4>
            <p>123 Bridge Street</p>
            <p>Nowhere Land, LA 12345</p>
            <p>United States</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;