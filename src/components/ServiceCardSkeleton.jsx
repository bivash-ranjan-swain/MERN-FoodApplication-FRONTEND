import "./ServiceCardSkeleton.css";

const ServiceCardSkeleton = () => {
  return (
    <div className="sd-card skeleton-card">
      <div className="sd-image-wrap skeleton-shimmer" />

      <div className="sd-content">
        <div className="skeleton-line skeleton-title skeleton-shimmer" />
        <div className="skeleton-line skeleton-text skeleton-shimmer" />
        <div className="skeleton-line skeleton-text skeleton-shimmer" />
        <div className="skeleton-line skeleton-text-short skeleton-shimmer" />

        <div className="sd-footer">
          <div className="skeleton-price-block">
            <div className="skeleton-line skeleton-label skeleton-shimmer" />
            <div className="skeleton-line skeleton-price skeleton-shimmer" />
          </div>
          <div className="skeleton-btn skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;