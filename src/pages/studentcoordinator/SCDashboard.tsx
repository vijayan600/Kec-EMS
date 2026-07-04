import { useState } from "react";
import { ClipboardList, Users, CheckCircle2 } from "lucide-react";
import { EVENTS, REGISTRATIONS, getEventRegistrations } from "../../data/static";

export default function SCDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id ?? "");
  const regs = getEventRegistrations(selectedEvent);

  return (
    <div>
      <div className="page-title">Student Coordinator Dashboard</div>
      <div className="page-subtitle">Monitor event registrations and attendance</div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: ClipboardList, label: "Total Events",  value: EVENTS.filter((e) => e.approved).length, color: "#10b981" },
          { icon: Users,         label: "Registrations", value: REGISTRATIONS.length,                    color: "#2563eb" },
          { icon: CheckCircle2,  label: "Attended",      value: REGISTRATIONS.filter((r) => r.attended).length, color: "#22c55e" },
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
                  flexShrink: 0,
                  borderRadius: 12,
                  background: `${s.color}1a`,
                }}
              >
                <Icon size={22} color={s.color} strokeWidth={2} />
              </div>
              <div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event selector */}
      <div className="card">
        <div className="section-header">
          <div className="section-title">📍 Event Registrations</div>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontFamily: "Inter, sans-serif" }}
          >
            {EVENTS.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
          <span style={{ color: "#4ade80", fontWeight: 700 }}>✅ Present: {regs.filter((r) => r.attended).length}</span>
          <span style={{ color: "#f87171", fontWeight: 700 }}>❌ Absent: {regs.filter((r) => !r.attended).length}</span>
          <span style={{ color: "#93c5fd", fontWeight: 700 }}>👥 Total: {regs.length}</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>#</th><th>Name</th><th>Roll No</th><th>Dept</th><th>Barcode</th><th>Status</th></tr>
            </thead>
            <tbody>
              {regs.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td style={{ color: "#fff", fontWeight: 600 }}>{r.studentName}</td>
                  <td>{r.rollNumber}</td>
                  <td>{r.department}</td>
                  <td><code style={{ fontSize: 12, color: "#6ee7b7" }}>{r.barcodeData}</code></td>
                  <td><span className={`badge ${r.attended ? "badge-approved" : "badge-pending"}`}>{r.attended ? "Present" : "Absent"}</span></td>
                </tr>
              ))}
              {regs.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>No registrations</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}