const ServiceCardSkeleton = () => (
  <div className="service-card service-card-skeleton" aria-hidden="true">
    <div className="service-media skeleton-block" />
    <div className="ticket-divider">
      <span className="notch notch-left" />
      <span className="notch notch-right" />
    </div>
    <div className="service-info">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-text" />
      <div className="skeleton-line skeleton-text short" />
    </div>
  </div>
);

export default ServiceCardSkeleton;