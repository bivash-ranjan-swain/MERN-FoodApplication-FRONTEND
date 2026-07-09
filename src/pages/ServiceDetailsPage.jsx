import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetailsPage.css";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:8800/api/services/get-single/${id}`,
        );
        const data = await response.json();
        if (!ignore && data.success) {
          setService(data.service);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchService();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <div className="service-status">Loading...</div>;
  if (!service) return <div className="service-status">Service not found</div>;

  return (
    <section className="service-details-section">
      <div className="service-details-card">
        <img src={service.image} alt={service.name} className="details-img" />
        <div className="details-content">
          <h1>{service.name}</h1>
          <p className="details-price">₹{service.price}</p>
          <p className="details-desc">{service.description}</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back to Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;