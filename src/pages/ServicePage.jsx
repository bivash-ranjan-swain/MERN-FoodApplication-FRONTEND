import { useServices } from "../hooks/useServices.jsx";
import ServiceCard from "../components/ServiceCardSkeleton.jsx";           
import ServiceCardSkeleton from "../components/ServiceCardSkeleton.jsx"; 
import "./ServicePage.css";

const SKELETON_COUNT = 6;

const ServicePage = () => {
  const { services, loading, error, retry } = useServices();

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

      {error && (
        <div className="service-status error" role="alert">
          <p>{error}</p>
          <button className="retry-btn" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {!error && loading && (
        <div className="service-grid" aria-busy="true" aria-live="polite">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!error && !loading && services.length === 0 && (
        <div className="service-empty">
          <p>No services are on the board right now.</p>
          <span>Check back soon — new listings are added often.</span>
        </div>
      )}

      {!error && !loading && services.length > 0 && (
        <div className="service-grid">
          {services.map((service, i) => (
            <ServiceCard key={service._id || i} service={service} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ServicePage;