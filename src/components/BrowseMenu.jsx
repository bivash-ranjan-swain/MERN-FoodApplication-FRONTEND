import { useNavigate } from "react-router-dom";
import "./BrowseMenu.css";
import Tea from "../assets/tea 1.png";

// Each category gets its own time window, copy, and icon.
// Swap the `image` field for your own asset (same pattern as Tea below)
// or leave it out to fall back to the icon-only badge.
const categories = [
  {
    id: "breakfast",
    label: "Breakfast",
    time: "7:00 – 10:00 AM",
    segment: 0, // which quarter of the day-strip lights up
    description:
      "Start slow with warm brews, fresh bakes, and light bites to ease into the day.",
    image: Tea,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 8h11a3 3 0 0 1 0 6h-1M6 8v7a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4v-1M6 8V5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "lunch",
    label: "Lunch",
    time: "12:00 – 3:00 PM",
    segment: 1,
    description:
      "Hearty plates built for the midday rush — filling, balanced, and quick to the table.",
    image: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 3v7M5 3v4a2 2 0 0 0 4 0V3M17 3c-1.6 0-3 2-3 5s1.4 4 3 4v9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "snacks",
    label: "Evening Snacks",
    time: "4:00 – 6:00 PM",
    segment: 2,
    description:
      "A little something to bridge the afternoon — crisp, spiced, and best shared.",
    image: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 4h14l-2 8a5 5 0 0 1-10 0L5 4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "dinner",
    label: "Dinner",
    time: "7:00 – 10:00 PM",
    segment: 3,
    description:
      "Slow down with the day's biggest plates, made for lingering at the table.",
    image: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 15a8 8 0 1 1-9-9 6.5 6.5 0 0 0 9 9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// Four quarters of the day — the highlighted one shows when this menu is served
const DayStrip = ({ activeSegment }) => (
  <div className="day-strip" aria-hidden="true">
    {[0, 1, 2, 3].map((seg) => (
      <span key={seg} className={`day-strip-seg ${seg === activeSegment ? "active" : ""}`} />
    ))}
  </div>
);

const BrowseMenu = () => {
  const navigate = useNavigate();

  // const handleExplore = (categoryId) => {
  //   navigate(`/menu?category=${categoryId}`);
  // };

  return (
    <section className="browse-menu">
      <div className="browse-menu-heading">
        <p className="eyebrow">By Time of Day</p>
        <h2 className="Heading">Browse Our Menu</h2>
        <span className="browse-sub">Four menus, timed to how the day actually moves.</span>
      </div>

      <div className="card-div">
        {categories.map((cat) => (
          <div className="card" key={cat.id}>
            <div className="round">
              {cat.image ? (
                <img src={cat.image} alt={cat.label} />
              ) : (
                <span className="round-icon">{cat.icon}</span>
              )}
            </div>

            <p className="card-time">{cat.time}</p>
            <h3 className="card-head">{cat.label}</h3>
            <p className="card-para">{cat.description}</p>

            <DayStrip activeSegment={cat.segment} />

           <button className="card-btn" onClick={() => navigate('/explore-menu')}>
  Explore Menu
</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseMenu;