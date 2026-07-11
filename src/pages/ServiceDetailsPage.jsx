// ServiceDetailsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ServiceDetailsPage.css";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `http://localhost:8800/api/service/get-service/${id}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (ignore) return;

        if (data.success && data.service) {
          setService(data.service);
        } else {
          setError(data.message || "Service not found");
        }
      } catch (err) {
        if (!ignore && err.name !== "AbortError") {
          setError("Failed to fetch this service. Please try again later.");
          console.error(err);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id, refetchTrigger]);

  if (!id) {
    return (
      <div className="service-status error">
        <p>No service id was provided in the URL.</p>
        <button className="back-link" onClick={() => navigate("/services")}>
          ← Back to all services
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="service-status">
        <div className="ticket-spinner" aria-hidden="true" />
        <p>Fetching this service…</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-status error">
        <p>{error || "Something went wrong loading this service."}</p>
        <button
          className="retry-btn"
          onClick={() => setRefetchTrigger((n) => n + 1)}
        >
          Try again
        </button>
        <button className="back-link" onClick={() => navigate("/services")}>
          ← Back to all services
        </button>
      </div>
    );
  }

  return (
    <section className="service-details-section">
      <button className="back-link" onClick={() => navigate("/services")}>
        ← Back to all services
      </button>

      <div className="service-details-card">
        <div className="service-details-media">
          <img
            src={service.image}
            alt={service.title}
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>

        <div className="service-details-info">
          <span className="service-eyebrow">Service details</span>
          <h1>{service.title}</h1>
          <p className="service-details-desc">{service.description}</p>

          <div className="service-details-stub">
            <div className="stub-fare">
              <span className="stub-label">Fare</span>
              <span className="stub-price">₹{service.price}</span>
            </div>
            <button className="view-btn" onClick={() => navigate(`/booktable`)}>
              Book this service <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;