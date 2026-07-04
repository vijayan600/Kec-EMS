import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Users, CheckCircle2 } from "lucide-react";
import { EVENTS, REGISTRATIONS, getEventRegistrations } from "../../data/static";

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id ?? "");
  const regs = getEventRegistrations(selectedEvent);

  // ─── Swipe handling (only on tab bar) ──────────────────────
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SWIPE_THRESHOLD = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (delta > SWIPE_THRESHOLD) {
      navigate("/volunteer/scanner");
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div>
      {/* Tab bar */}
      <div
        className="tab-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ marginLeft: "auto", marginRight: "auto", touchAction: "pan-y" }}
      >
        <button className="active">Dashboard</button>
        <button onClick={() => navigate("/volunteer/scanner")}>Attendance Scanner</button>
      </div>

      <div className="page-title">Volunteer Dashboard</div>
      <div className="page-subtitle">View event data and mark attendance</div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: ClipboardList, label: "Active Events", value: EVENTS.filter((e) => e.status === "ongoing").length, color: "#f59e0b" },
          { icon: Users,         label: "Registrations", value: REGISTRATIONS.length,                                color: "#2563eb" },
          { icon: CheckCircle2,  label: "Attended",      value: REGISTRATIONS.filter((r) => r.attended).length,      color: "#22c55e" },
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

      {/* Event attendance table */}
      <div className="card">
        <div className="section-header">
          <div className="section-title">📍 Event Attendance</div>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "6px 12px",
              color: "#fff",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Dept</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {regs.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td style={{ color: "#fff", fontWeight: 600 }}>{r.studentName}</td>
                  <td>{r.rollNumber}</td>
                  <td>{r.department}</td>
                  <td>
                    <span className={`badge ${r.attended ? "badge-approved" : "badge-pending"}`}>
                      {r.attended ? "Present" : "Absent"}
                    </span>
                  </td>
                </tr>
              ))}
              {regs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>
                    No registrations for this event
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}