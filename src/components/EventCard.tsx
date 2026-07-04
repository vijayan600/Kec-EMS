import { useNavigate } from "react-router-dom";
import { Event } from "../data/static";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const navigate = useNavigate();

  let bannerSrc = "";
  try {
    bannerSrc = new URL(`../assets/events/${event.bannerImage}`, import.meta.url).href;
  } catch {
    bannerSrc = "";
  }

  return (
    <div className="event-card-royal">
      {/* Corner ornaments */}
      <svg className="event-card-corner event-card-corner-tl" viewBox="0 0 26 26" fill="none">
        <path d="M2 2H14M2 2V14" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="2" fill="#d4af37" />
      </svg>
      <svg className="event-card-corner event-card-corner-tr" viewBox="0 0 26 26" fill="none">
        <path d="M2 2H14M2 2V14" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="2" fill="#d4af37" />
      </svg>

      <div className="event-card-inner">
        {/* Top — Framed Banner */}
        <div className="event-card-banner-frame">
          {bannerSrc ? (
            <img
              src={bannerSrc}
              alt={event.title}
              className="event-card-banner-royal"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div
              className="event-card-banner-royal"
              style={{
                background: "linear-gradient(135deg, #1a1400, #2c2308)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
              }}
            >
              🎓
            </div>
          )}
        </div>

        {/* Bottom — Details */}
        <div className="event-card-body">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, marginBottom: 10 }}>
              <span className="badge-engraved">{event.status}</span>
              {event.points > 0 && (
                <span className="badge-engraved">★ {event.points} pts</span>
              )}
            </div>

            <div className="event-card-title-royal">{event.title}</div>

            <div className="event-card-meta">
              <span>📅 {event.date}</span>
              <span>🕐 {event.time}</span>
            </div>

            <div className="royal-divider">
              <span className="royal-divider-diamond" />
            </div>
          </div>

          {/* Actions */}
          <div className="event-card-btn-row">
            <button
              className="btn btn-sm event-card-btn btn-ghost-gold"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              View Details
            </button>
            <button
              className="btn btn-sm event-card-btn btn-glass-gold"
              onClick={() => navigate(`/event/${event.id}?register=true`)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}