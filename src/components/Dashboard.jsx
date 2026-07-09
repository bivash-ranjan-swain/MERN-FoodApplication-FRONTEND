import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("foods");

  useEffect(() => {
    let ignore = false;

    const fetchDashboardData = async () => {
      try {
        const [foodsRes, contactsRes] = await Promise.all([
          axios.get("http://localhost:8800/api/food/all", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8800/api/contact/all", {
            withCredentials: true,
          }),
        ]);

        if (!ignore) {
          setFoods(foodsRes.data.foods);
          setContacts(contactsRes.data.contacts);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Failed to load dashboard data",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDeleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8800/api/food/delete/${id}`, {
        withCredentials: true,
      });
      setFoods((prev) => prev.filter((food) => food._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete food item");
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this contact message?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8800/api/contact/delete/${id}`, {
        withCredentials: true,
      });
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete contact message");
    }
  };

  if (user && user.role !== "admin") {
    return (
      <div className="dashboard-denied">
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">Admin Panel</h2>
        <button
          className={activeTab === "foods" ? "active" : ""}
          onClick={() => setActiveTab("foods")}
        >
          Manage Foods
        </button>
        <button
          className={activeTab === "contacts" ? "active" : ""}
          onClick={() => setActiveTab("contacts")}
        >
          Contact Messages
        </button>
        <Link to="/admin/add-food" className="dashboard-add-btn">
          + Add New Food
        </Link>
      </aside>

      <main className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{foods.length}</h3>
            <p>Total Food Items</p>
          </div>
          <div className="stat-card">
            <h3>{contacts.length}</h3>
            <p>Contact Messages</p>
          </div>
        </div>

        {activeTab === "foods" && (
          <section className="dashboard-section">
            <h2>Manage Foods</h2>
            {foods.length === 0 ? (
              <p className="empty-state">No food items found.</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Actual Price</th>
                    <th>Discount Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td>
                        <img
                          src={food.image}
                          alt={food.name}
                          className="table-img"
                        />
                      </td>
                      <td>{food.name}</td>
                      <td>₹{food.actualPrice}</td>
                      <td>₹{food.discountPrice}</td>
                      <td>
                        <Link
                          to={`/admin/edit-food/${food._id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteFood(food._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeTab === "contacts" && (
          <section className="dashboard-section">
            <h2>Contact Messages</h2>
            {contacts.length === 0 ? (
              <p className="empty-state">No contact messages found.</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td className="message-cell">{contact.message}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;