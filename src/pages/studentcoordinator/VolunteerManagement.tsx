import { useState } from "react";
import { VOLUNTEERS, addVolunteer, removeVolunteer } from "../../data/static";

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState([...VOLUNTEERS]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", department: "", clubId: "c1", password: "" });
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Name, email and date of birth are required.");
      return;
    }
    addVolunteer({ ...form, addedBy: "sc1" });
    setVolunteers([...VOLUNTEERS]);
    setShowAdd(false);
    setForm({ name: "", email: "", department: "", clubId: "c1", password: "" });
    setError("");
  };

  const handleRemove = (id: string) => {
    removeVolunteer(id);
    setVolunteers([...VOLUNTEERS]);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="page-title">Volunteer Management</div>
          <div className="page-subtitle">Add or remove volunteers for your club events</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Volunteer</button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="card" style={{ marginBottom: 20, border: "1px solid var(--border-blue)" }}>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: 16, fontSize: 15 }}>Add New Volunteer</div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 14, color: "#fca5a5", fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input placeholder="Volunteer name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Kongu Email *</label>
              <input placeholder="name@kongu.edu" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
                <option value="">Select</option>
                {["CSE","ECE","EEE","MECH","CIVIL","IT","AIDS","AIML"].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth (Password) *</label>
              <input type="date" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add Volunteer</button>
            <button className="btn btn-outline btn-sm" onClick={() => { setShowAdd(false); setError(""); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Volunteer list */}
      {volunteers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text-muted)", background: "var(--card)", borderRadius: 14, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>👤</div>
          <div style={{ fontWeight: 600, color: "#fff" }}>No volunteers yet</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Click "+ Add Volunteer" to get started</div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>#</th><th>Name</th><th>Email</th><th>Department</th><th>Action</th></tr>
            </thead>
            <tbody>
              {volunteers.map((v, i) => (
                <tr key={v.id}>
                  <td>{i + 1}</td>
                  <td style={{ color: "#fff", fontWeight: 600 }}>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.department}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(v.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}