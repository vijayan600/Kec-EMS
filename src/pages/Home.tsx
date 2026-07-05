import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { getEventsByStatus, EventStatus } from "../data/static";

const TABS: { label: string; value: EventStatus }[] = [
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<EventStatus>("upcoming");
  const touchStartX = useRef(0);
  const eventsRef = useRef<HTMLDivElement>(null);

  const events = getEventsByStatus(activeTab);
  const activeIndex = TABS.findIndex((t) => t.value === activeTab);

  // Quick stats — pulled from your existing static data
  const ongoingCount = getEventsByStatus("ongoing").length;
  const upcomingCount = getEventsByStatus("upcoming").length;
  const pastCount = getEventsByStatus("past").length;

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

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero Section — plain text on background, no card box */}
      <div className="hero-plain">
        <div className="hero-plain-college">
          Kongu Engineering College (Autonomous)
        </div>
        <div className="hero-plain-accred">
          Affiliated to Anna University &nbsp;|&nbsp; Accredited by NAAC with A++ Grade
        </div>

        <div className="hero-plain-title">Event Management System</div>
        <div className="hero-plain-subtitle">
          Your gateway to Kongu's vibrant student clubs &amp; activities
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{ongoingCount}</div>
            <div className="hero-stat-label">Ongoing</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{upcomingCount}</div>
            <div className="hero-stat-label">Upcoming</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{pastCount}</div>
            <div className="hero-stat-label">Past</div>
          </div>
        </div>

        <div className="scroll-hint" onClick={scrollToEvents}>
          <div className="scroll-hint-text">Scroll down to explore events</div>
          <div className="scroll-hint-arrow">⌄</div>
        </div>
      </div>

      {/* Events Section */}
      <div ref={eventsRef} style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
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