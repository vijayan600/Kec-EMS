// ── OD Generation ──────────────────────────────────────────
import { useState } from "react";
import { EVENTS, getEventRegistrations } from "../../data/static";

export function ODGeneration() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id ?? "");
  const regs = getEventRegistrations(selectedEvent);
  const event = EVENTS.find((e) => e.id === selectedEvent);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="page-title">OD Generation</div>
      <div className="page-subtitle">Generate On-Duty letters for registered students</div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="form-group">
          <label>Select Event</label>
          <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
            {EVENTS.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </div>
      </div>

      {event && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, color: "#fff" }}>{event.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{event.date} · {regs.length} students</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>🖨️ Print OD Letter</button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Name</th><th>Roll No</th><th>Department</th><th>Email</th></tr>
              </thead>
              <tbody>
                {regs.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td style={{ color: "#fff", fontWeight: 600 }}>{r.studentName}</td>
                    <td>{r.rollNumber}</td>
                    <td>{r.department}</td>
                    <td>{r.email}</td>
                  </tr>
                ))}
                {regs.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>No registrations for this event</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Student Coordinator Management ─────────────────────────
import { STUDENT_COORDINATORS, addStudentCoordinator, removeStudentCoordinator } from "../../data/static";

export function StudentCoordinatorMgmt() {
  const [coords, setCoords] = useState([...STUDENT_COORDINATORS]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", department: "", rollNumber: "", clubId: "c1" });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const sc = addStudentCoordinator({ ...form, addedBy: "u1" });
    setCoords([...STUDENT_COORDINATORS]);
    setShowAdd(false);
    setForm({ name: "", email: "", department: "", rollNumber: "", clubId: "c1" });
  };

  const handleRemove = (id: string) => {
    removeStudentCoordinator(id);
    setCoords([...STUDENT_COORDINATORS]);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="page-title">Coordinator Management</div>
          <div className="page-subtitle">Add or remove student coordinators</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Coordinator</button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: 20, border: "1px solid var(--border-blue)" }}>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: 16 }}>Add New Coordinator</div>
          <div className="form-grid-2">
            <div className="form-group"><label>Name</label><input placeholder="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
            <div className="form-group"><label>Email</label><input placeholder="@kongu.edu" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></div>
            <div className="form-group"><label>Department</label><input placeholder="CSE" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} /></div>
            <div className="form-group"><label>Roll Number</label><input placeholder="22CB001" value={form.rollNumber} onChange={(e) => setForm((f) => ({ ...f, rollNumber: e.target.value }))} /></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button>
            <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table>
          <thead><tr><th>#</th><th>Name</th><th>Roll No</th><th>Department</th><th>Email</th><th>Action</th></tr></thead>
          <tbody>
            {coords.map((sc, i) => (
              <tr key={sc.id}>
                <td>{i + 1}</td>
                <td style={{ color: "#fff", fontWeight: 600 }}>{sc.name}</td>
                <td>{sc.rollNumber}</td>
                <td>{sc.department}</td>
                <td>{sc.email}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleRemove(sc.id)}>Remove</button></td>
              </tr>
            ))}
            {coords.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>No coordinators added yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Student Attendance ──────────────────────────────────────
import { REGISTRATIONS } from "../../data/static";

export function StudentAttendance() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id ?? "");
  const regs = getEventRegistrations(selectedEvent);

  return (
    <div>
      <div className="page-title">Student Attendance</div>
      <div className="page-subtitle">View attendance records by event</div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="form-group">
          <label>Select Event</label>
          <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
            {EVENTS.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          <div style={{ fontWeight: 700, color: "#4ade80" }}>✅ Present: {regs.filter((r) => r.attended).length}</div>
          <div style={{ fontWeight: 700, color: "#f87171" }}>❌ Absent: {regs.filter((r) => !r.attended).length}</div>
          <div style={{ fontWeight: 700, color: "#93c5fd" }}>👥 Total: {regs.length}</div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead><tr><th>#</th><th>Name</th><th>Roll No</th><th>Department</th><th>Barcode</th><th>Status</th><th>Attended At</th></tr></thead>
          <tbody>
            {regs.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td style={{ color: "#fff", fontWeight: 600 }}>{r.studentName}</td>
                <td>{r.rollNumber}</td>
                <td>{r.department}</td>
                <td><code style={{ fontSize: 12, color: "#93c5fd" }}>{r.barcodeData}</code></td>
                <td><span className={`badge ${r.attended ? "badge-approved" : "badge-pending"}`}>{r.attended ? "Present" : "Absent"}</span></td>
                <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.attendedAt ? new Date(r.attendedAt).toLocaleString() : "—"}</td>
              </tr>
            ))}
            {regs.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>No data</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Edit Club Details ───────────────────────────────────────
import { CLUBS } from "../../data/static";

export function EditClubDetails() {
  const club = CLUBS[0];
  const [form, setForm] = useState({ name: club?.name ?? "", description: club?.description ?? "", adminEmail: club?.adminEmail ?? "" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (club) Object.assign(club, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-title">Edit Club Details</div>
      <div className="page-subtitle">Update your club's information</div>

      {saved && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#4ade80", fontWeight: 600 }}>
          ✅ Club details updated!
        </div>
      )}

      <div className="card" style={{ maxWidth: 560 }}>
        <div className="form-group"><label>Club Name</label><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
        <div className="form-group"><label>Admin Email</label><input value={form.adminEmail} onChange={(e) => setForm((f) => ({ ...f, adminEmail: e.target.value }))} /></div>
        <div className="form-group"><label>Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}

export default ODGeneration;