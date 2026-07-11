import { useState } from "react";
import Navbar from "../layout/Navbar";
import "./Facilities.css";

// One place to edit copy for every facility card.
// `code` mirrors the ticket-style reference codes used elsewhere in the app.
const facilities = [
  {
    id: "fine-dining",
    code: "FAC-01",
    title: "Fine Dining Experience",
    teaser: "Plated with precision, built around what's in season.",
    description:
      "Every dish is composed by our kitchen team around what's freshest that week, then plated with the kind of care you'd expect from a tasting menu — without losing the comfort of a proper meal.",
    highlights: [
      "Seasonal menu refreshed monthly",
      "Chef's notes on every dish",
      "Wine and pairing suggestions on request",
    ],
  },
  {
    id: "service",
    code: "FAC-02",
    title: "Warm, Attentive Service",
    teaser: "Staff trained to notice what you need before you ask.",
    description:
      "Our team is trained on more than order-taking — reading the table, timing courses, and handling special requests quietly and well. The goal is a visit that feels looked after, not managed.",
    highlights: [
      "Dedicated server per table, not per section",
      "Allergy and dietary requests handled by the kitchen directly",
      "Multilingual staff on every shift",
    ],
  },
  {
    id: "ambiance",
    code: "FAC-03",
    title: "Vibrant Ambiance",
    teaser: "Lighting, music, and space designed to hold a mood.",
    description:
      "The room shifts with the hour — brighter and easier at lunch, warmer and slower by evening. Every material in the space, from the tables to the lighting fixtures, was chosen to support that arc rather than fight it.",
    highlights: [
      "Live acoustic sets on weekend evenings",
      "Private corner seating for quieter conversations",
      "Outdoor patio, weather permitting",
    ],
  },
  {
    id: "local-roots",
    code: "FAC-04",
    title: "Rooted in Local Culinary Culture",
    teaser: "Sourced from the city that shaped the menu.",
    description:
      "We buy directly from local farms and markets whenever we can, and a good part of the menu leans on techniques and flavors that come straight from this city's own food culture — not imported from somewhere else.",
    highlights: [
      "Partnered with 6 local farms",
      "Weekly market-driven specials",
      "Recipes developed with local home cooks",
    ],
  },
  {
    id: "global-palate",
    code: "FAC-05",
    title: "Global Palate, Local Roots",
    teaser: "Local ingredients, techniques borrowed from everywhere.",
    description:
      "Alongside the local-first dishes sits a menu that borrows technique and spice from further afield — built for people who want the comfort of something familiar next to something they haven't tried yet.",
    highlights: [
      "Rotating world-cuisine specials",
      "Spice levels adjusted to order",
      "Fusion dishes designed in-house, not franchised",
    ],
  },
  {
    id: "events",
    code: "FAC-06",
    title: "Private Events & Celebrations",
    teaser: "Custom menus for the days that matter more.",
    description:
      "From small birthday dinners to full private buyouts, our events team builds a custom menu and room layout around the occasion — with enough lead time, we'll build a menu you won't find printed anywhere else.",
    highlights: [
      "Private dining room for up to 24 guests",
      "Custom menu design included",
      "Dedicated event coordinator from booking to the night of",
    ],
  },
];

const Facilities = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleFacility = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <>
      <Navbar />
      <section className="facilities-page">
        <div className="facilities-heading">
          <p className="eyebrow">What We Offer</p>
          <h1>Our Facilities, In Detail</h1>
          <p className="facilities-sub">
            Tap any facility to see exactly what it includes.
          </p>
        </div>

        <div className="facilities-list">
          {facilities.map((facility) => {
            const isOpen = expandedId === facility.id;

            return (
              <div
                className={`facility-row ${isOpen ? "open" : ""}`}
                key={facility.id}
              >
                <button
                  type="button"
                  className="facility-header"
                  onClick={() => toggleFacility(facility.id)}
                  aria-expanded={isOpen}
                  aria-controls={`facility-panel-${facility.id}`}
                >
                  <span className="facility-code">{facility.code}</span>

                  <span className="facility-title-block">
                    <span className="facility-title">{facility.title}</span>
                    <span className="facility-teaser">{facility.teaser}</span>
                  </span>

                  <span className="facility-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>

                <div
                  className="facility-panel"
                  id={`facility-panel-${facility.id}`}
                  role="region"
                >
                  <div className="facility-panel-inner">
                    <div className="facility-divider" />
                    <p className="facility-description">
                      {facility.description}
                    </p>

                    <ul className="facility-highlights">
                      {facility.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Facilities;