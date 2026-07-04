import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { getEventsByStatus, EventStatus } from "../data/static";

const TABS: { label: string; value: EventStatus }[] = [
  { label: " Ongoing", value: "ongoing" },
  { label: " Upcoming", value: "upcoming" },
  { label: " Past", value: "past" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<EventStatus>("upcoming");
  const touchStartX = useRef(0);

  const events = getEventsByStatus(activeTab);
  const activeIndex = TABS.findIndex((t) => t.value === activeTab);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 50;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0 && activeIndex < TABS.length - 1) {
      // swipe left → next tab
      setActiveTab(TABS[activeIndex + 1].value);
    } else if (deltaX > 0 && activeIndex > 0) {
      // swipe right → previous tab
      setActiveTab(TABS[activeIndex - 1].value);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      
      {/* Events Section */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        {/* Tab Slider */}
        <div className="tab-slider tab-slider-gold tab-slider-royal">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={activeTab === tab.value ? "active" : ""}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event List — swipe left/right on mobile to change tabs */}
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {events.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
                No {activeTab} events
              </div>
              <div style={{ fontSize: 13 }}>Check back soon for new events!</div>
            </div>
          ) : (
            <div className="events-row">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}