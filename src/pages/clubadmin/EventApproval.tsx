import { useState } from "react";
import { EVENTS, approveEvent, rejectEvent } from "../../data/static";

export default function EventApproval() {
  const [events, setEvents] = useState([...EVENTS]);

  const handleApprove = (id: string) => {
    approveEvent(id);
    setEvents([...EVENTS]);
  };

  const handleReject = (id: string) => {
    rejectEvent(id);
    setEvents([...EVENTS]);
  };

  const pending = events.filter((e) => !e.approved);
  const approved = events.filter((e) => e.approved);

  return (
    <div>
      <div className="page-title">Event Approval</div>
      <div className="page-subtitle">Review and approve events submitted by faculty coordinators</div>

      {/* Pending */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-title" style={{ marginBottom: 14 }}>
          ⏳ Pending Approval ({pending.length})
        </div>

        {pending.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", background: "var(--card)", borderRadius: 12, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
            <div style={{ fontWeight: 600, color: "#fff" }}>All caught up!</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>No events waiting for approval.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pending.map((e) => (
              <div
                key={e.id}
                style={{ background: "var(--card)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 12, padding: "18px 20px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 6 }}>{e.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
                      <span>📅 {e.date}</span>
                      <span>📍 {e.venue}</span>
                      <span>👥 Max {e.maxParticipants}</span>
                      <span>⭐ {e.points} pts</span>
                      <span>👤 Created by: {e.createdBy}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{e.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(e.id)}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleReject(e.id)}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved */}
      <div>
        <div className="section-title" style={{ marginBottom: 14 }}>
          ✅ Approved Events ({approved.length})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {approved.map((e) => (
            <div
              key={e.id}
              style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 10, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <div style={{ fontWeight: 600, color: "#fff" }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{e.date} · {e.venue}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span className={`badge badge-${e.status}`}>{e.status}</span>
                <span className="badge badge-approved">Approved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}