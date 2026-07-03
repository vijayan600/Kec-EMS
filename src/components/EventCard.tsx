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
    <div className="event-card">
      {/* Top — Poster / Banner */}
      {bannerSrc ? (
        <img
          src={bannerSrc}
          alt={event.title}
          className="event-card-banner"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div
          className="event-card-banner"
          style={{
            background: "linear-gradient(135deg, #0f2347, #1a3a6b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
          }}
        >
          🎓
        </div>
      )}

      {/* Bottom — Details */}
      <div className="event-card-body">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span className={`badge badge-${event.status}`}>{event.status}</span>
            {event.points > 0 && (
              <span
                style={{
                  fontSize: 11,
                  color: "#fbbf24",
                  fontWeight: 600,
                  background: "rgba(251,191,36,0.1)",
                  padding: "2px 8px",
                  borderRadius: 20,
                  border: "1px solid rgba(251,191,36,0.2)",
                }}
              >
                ⭐ {event.points} pts
              </span>
            )}
          </div>

          <div className="event-card-title">{event.title}</div>

          <div className="event-card-meta">
            <span>📅 {event.date}</span>
            <span>🕐 {event.time}</span>
          </div>
        </div>

        {/* Actions — split 50/50, light glass vs gold glass */}
        <div className="event-card-btn-row">
          <button
            className="btn btn-sm event-card-btn btn-glass-light"
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
  );
}