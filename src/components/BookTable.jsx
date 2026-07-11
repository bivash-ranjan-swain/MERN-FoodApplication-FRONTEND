import { useState } from "react";
import "./BookTable.css";

const API_URL = "http://localhost:8800/api/table/create-table";
const REQUEST_TIMEOUT_MS = 10000;

const BookTable = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "10:00 AM",
    name: "",
    phone: "",
    totalPerson: 1,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "totalPerson" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Table booked successfully!");
        setFormData({
          date: "",
          time: "10:00 AM",
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
              <select id="time" name="time" value={formData.time} onChange={handleChange}>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="01:30 PM">01:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
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
              <option value={1}>Solo</option>
              <option value={2}>Couple</option>
              <option value={3}>3 Person</option>
              <option value={4}>4 Person</option>
              <option value={5}>5 Person</option>
              <option value={6}>5+ Person</option>
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