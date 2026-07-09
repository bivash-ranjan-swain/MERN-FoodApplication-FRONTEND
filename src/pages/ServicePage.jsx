import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePage.css";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchServices = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "http://localhost:8800/api/service/get-all-services",
        { signal },
      );
      const data = await response.json();

      if (data.success) {
        setServices(data.services);
      } else {
        setError(data.message || "Failed to load services");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to fetch services. Please try again later.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchServices(controller.signal);
    return () => controller.abort();
  }, [fetchServices]);

  if (loading) {
    return (
      <div className="service-status">
        <div className="ticket-spinner" aria-hidden="true" />
        <p>Fetching today's lineup of services…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-status error">
        <p>{error}</p>
        <button className="retry-btn" onClick={() => fetchServices()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="service-section">
      <div className="service-header">
        <span className="service-eyebrow">Book your celebration</span>
        <h1>Services worth the occasion</h1>
        <p>
          Every event runs on the right details. Pick a service below and
          we'll handle the rest.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="service-empty">
          <p>No services are on the board right now.</p>
          <span>Check back soon — new listings are added often.</span>
        </div>
      ) : (
        <div className="service-grid">
          {services.map((service) => (
            <article
              className="service-card"
              key={service._id}
              tabIndex={0}
              role="button"
              onClick={() => navigate(`/services/${service._id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/services/${service._id}`);
                }
              }}
            >
              <div className="service-media">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-img"
                  loading="lazy"
                />
              </div>

              <div className="ticket-divider">
                <span className="notch notch-left" />
                <span className="notch notch-right" />
              </div>

              <div className="service-info">
                <div className="service-info-top">
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-desc">{service.description}</p>
                </div>

                <div className="service-stub">
                  <div className="stub-fare">
                    <span className="stub-label">Fare</span>
                    <span className="stub-price">₹{service.price}</span>
                  </div>
                  <button className="view-btn">
                    View details <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ServicePage;