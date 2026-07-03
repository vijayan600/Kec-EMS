import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Users, CheckCircle2, Clock } from "lucide-react";
import { EVENTS, REGISTRATIONS, getEventRegistrations, getPendingEvents } from "../../data/static";

export default function ClubAdminDashboard() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id ?? "");
  const eventRegs = getEventRegistrations(selectedEvent);
  const pending = getPendingEvents();

  return (
    <div>
      <div className="page-title">Club Admin Dashboard</div>
      <div className="page-subtitle">Manage your club events and monitor registrations</div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { icon: ClipboardList, label: "Total Events",        value: EVENTS.length,                              color: "#7c3aed" },
          { icon: Users,         label: "Total Registrations", value: REGISTRATIONS.length,                       color: "#2563eb" },
          { icon: CheckCircle2,  label: "Attended",            value: REGISTRATIONS.filter((r) => r.attended).length, color: "#22c55e" },
          { icon: Clock,         label: "Pending Approval",    value: pending.length,                             color: "#f59e0b" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div className="stat-card" key={s.label}>
              <div
                className="stat-icon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  margin: "0 auto 10px",
                  borderRadius: 12,
                  background: `${s.color}1a`,
                }}
              >
                <Icon size={22} color={s.color} strokeWidth={2} />
              </div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Pending approval alert */}
      {pending.length > 0 && (
        <div
          style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div style={{ color: "#fbbf24", fontWeight: 600 }}>
            ⚠️ {pending.length} event{pending.length > 1 ? "s" : ""} waiting for your approval
          </div>
          <button className="btn btn-sm" style={{ background: "#f59e0b", color: "#000", fontWeight: 700 }} onClick={() => navigate("/clubadmin/event-approval")}>
            Review Now
          </button>
        </div>
      )}

      {/* Registrations by event */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div className="section-title">📍 Registrations by Event</div>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontFamily: "Inter, sans-serif" }}
          >
            {EVENTS.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </div>

        {eventRegs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)" }}>No registrations for this event.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Name</th><th>Roll No</th><th>Dept</th><th>Barcode</th><th>Attended</th></tr>
              </thead>
              <tbody>
                {eventRegs.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td style={{ color: "#fff", fontWeight: 600 }}>{r.studentName}</td>
                    <td>{r.rollNumber}</td>
                    <td>{r.department}</td>
                    <td><code style={{ fontSize: 12, color: "#c4b5fd" }}>{r.barcodeData}</code></td>
                    <td><span className={`badge ${r.attended ? "badge-approved" : "badge-pending"}`}>{r.attended ? "Present" : "Absent"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All events quick list */}
      <div className="card">
        <div className="section-header">
          <div className="section-title">📋 All Events</div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("/clubadmin/create-event")}>+ Create</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {EVENTS.map((e) => (
            <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 16px", border: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{e.date} · {e.venue}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className={`badge badge-${e.status}`}>{e.status}</span>
                <span className={`badge ${e.approved ? "badge-approved" : "badge-pending"}`}>{e.approved ? "Approved" : "Pending"}</span>
                <button className="btn btn-outline btn-sm" onClick={() => navigate(`/clubadmin/edit-event/${e.id}`)}>✏️ Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}