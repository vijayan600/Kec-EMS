// ── ListEvents ─────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { EVENTS } from "../../data/static";

export function ListEvents({ basePath = "/faculty" }: { basePath?: string }) {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="page-title">All Events</div>
          <div className="page-subtitle">Manage and edit events</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate(`${basePath}/create-event`)}>+ Create Event</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {EVENTS.map((e) => (
          <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{e.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>
                {e.date} · {e.venue} · {e.maxParticipants} seats
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`badge badge-${e.status}`}>{e.status}</span>
              <span className={`badge ${e.approved ? "badge-approved" : "badge-pending"}`}>
                {e.approved ? "Approved" : "Pending"}
              </span>
              <button className="btn btn-outline btn-sm" onClick={() => navigate(`${basePath}/edit-event/${e.id}`)}>
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListEvents;