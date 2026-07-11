import { useState } from "react";
import "./BookTable.css";


// Centralize the API endpoint so it's easy to change per environment.
// If you're using Create React App, set REACT_APP_API_URL in your .env file.
// If you're using Vite, use import.meta.env.VITE_API_URL instead.
const API_URL = "http://localhost:8800/api/table/create-table";

const REQUEST_TIMEOUT_MS = 10000; // 10 seconds

const BookTable = () => {
  // 1. Initialize state for form fields
  const [formData, setFormData] = useState({
    date: "",
    time: "06:30 PM", // Default to the first option
    name: "",
    phone: "",
    totalPerson: 1, // Stored as a number for easier backend handling
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // Convert totalPerson to a number, keep everything else as a string
      [name]: name === "totalPerson" ? Number(value) : value,
    }));
  };

  // 3. Handle form submission to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus(null);

    // Abort the request if the server takes too long to respond
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Guard against non-JSON responses (e.g. server errors, HTML error pages)
      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Table booked successfully!");
        // Reset form fields on success
        setFormData({
          date: "",
          time: "06:30 PM",
          name: "",
          phone: "",
          totalPerson: 1,
        });
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setStatus("error");

      if (error.name === "AbortError") {
        setMessage("Request timed out. Please check your connection and try again.");
      } else {
        console.error("API Error:", error);
        setMessage("Failed to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-table-section">
      <div className="book-table-header">
        <h1>Book A Table</h1>
        <p>
          We consider all the drivers of change gives you the components
          <br />
          you need to change to create a truly happens.
        </p>
      </div>

      <div className="booking-card">
        {/* Status message display */}
        {message && (
          <b
            className={`form-message ${
              status === "success" ? "form-message-success" : ""
            } ${status === "error" ? "form-message-error" : ""}`}
            role="alert"
          >
            {message}
          </b>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              >
                <option value="06:30 PM">10:00 AM</option>
                <option value="07:00 PM">10:30 AM</option>
                <option value="07:30 PM">11:00 AM</option>
                <option value="08:00 PM">11:30 AM</option>
                <option value="08:00 PM">12:00 PM</option>
                <option value="08:00 PM">12:30 PM</option>
                <option value="08:00 PM">01:00 PM</option>
                <option value="08:00 PM">01:30 PM</option>
                <option value="08:00 PM">03:00 PM</option>
                <option value="08:00 PM">03:30 PM</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="x-xxx-xxx-xxxx"
                
                title="Format: x-xxx-xxx-xxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="totalPerson">Total Person</label>
            <select
              id="totalPerson"
              name="totalPerson"
              value={formData.totalPerson}
              onChange={handleChange}
            >
              <option value={1}>SELECT NO OF PERSONS</option>
              <option value={1}>SOLO</option>
              <option value={2}>COUPLE</option>
              <option value={3}>3 Person</option>
              <option value={4}>4 Person</option>
              <option value={5}>5 Person</option>
              <option value={5}>5+ Person</option>
            </select>
          </div>

          <button type="submit" className="book-btn" disabled={loading}>
            {loading ? "Booking..." : "Book A Table"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookTable;