import { memo } from "react";
import { useNavigate } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const FALLBACK_IMAGE = "https://placehold.co/400x300?text=No+Image";

const ServiceCard = memo(({ service }) => {
  const navigate = useNavigate();
  const goToDetails = () => navigate(`/services/${service._id}`);

  return (
    <article
      className="service-card"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${service.title}`}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToDetails();
        }
      }}
    >
      <div className="service-media">
        <img
          src={service.image || FALLBACK_IMAGE}
          alt={service.title}
          className="service-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevent infinite loop if fallback also fails
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      <div className="ticket-divider">
        <span className="notch notch-left" />
        <span className="notch notch-right" />
      </div>

      <div className="service-info">
        <div className="service-info-top">
          <h3 className="service-name">{service.title}</h3>
          <p className="service-desc">{service.description}</p>
        </div>

        <div className="service-stub">
          <div className="stub-fare">
            <span className="stub-label">Fare</span>
            <span className="stub-price">
              {currencyFormatter.format(service.price || 0)}
            </span>
          </div>
          <button
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation();
              goToDetails();
            }}
          >
            View details <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;