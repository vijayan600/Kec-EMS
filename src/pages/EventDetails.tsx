import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Trophy, Mic2 } from "lucide-react";
import {
  EVENTS,
  CLUBS,
  addRegistration,
  getEventRegistrations,
} from "../data/static";
import BarcodeScanner from "../components/BarcodeScanner";
import Navbar from "../components/Navbar";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const event = EVENTS.find((e) => e.id === id);
  const club = event ? CLUBS.find((c) => c.id === event.clubId) : null;
  const registrations = event ? getEventRegistrations(event.id) : [];

  const [showRegister, setShowRegister] = useState(searchParams.get("register") === "true");
  const [scanning, setScanning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scanError, setScanError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    rollNumber: "",
    barcodeData: "",
  });

  useEffect(() => {
    if (searchParams.get("register") === "true") setShowRegister(true);
  }, [searchParams]);

  if (!event) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>❌</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 12 }}>Event not found</div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  let bannerSrc = "";
  try {
    bannerSrc = new URL(`../assets/events/${event.bannerImage}`, import.meta.url).href;
  } catch { bannerSrc = ""; }

  const category = (event.category || event.tags?.[0] || event.type || "EVENT").toString().toUpperCase();

  const metaPills = [
    { icon: Calendar, text: event.date, color: "#60a5fa" },
    { icon: Clock, text: event.time, color: "#f472b6" },
    { icon: MapPin, text: event.venue, color: "#f87171" },
  ];

  const extraDetails = [
    { icon: Users, label: "Max Participants", value: `${event.maxParticipants}` },
    { icon: Clock, label: "Registration Closes", value: event.registrationDeadline },
    { icon: Mic2, label: "Organized by", value: club?.name ?? "—" },
    ...(event.chiefGuest ? [{ icon: Mic2, label: "Chief Guest", value: event.chiefGuest }] : []),
    ...(event.prize ? [{ icon: Trophy, label: "Prize", value: event.prize }] : []),
  ];

  const handleScan = (code: string) => {
    const cleanCode = code.trim();

    // Prevent registering with a barcode already used for THIS event
    const alreadyUsed = registrations.some((r) => r.barcodeData === cleanCode);
    if (alreadyUsed) {
      setScanError("This ID card is already registered for this event.");
      setScanning(false);
      return;
    }

    setScanError("");
    setForm((f) => ({ ...f, barcodeData: cleanCode }));
    setScanning(false); // BarcodeScanner (continuous=false) already vibrated + closed the camera itself
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.department || !form.rollNumber || !form.barcodeData) {
      alert("Please fill all fields and scan your ID card barcode.");
      return;
    }
    addRegistration({
      eventId: event.id,
      studentName: form.name,
      email: form.email,
      department: form.department,
      rollNumber: form.rollNumber,
      barcodeData: form.barcodeData,
      registeredAt: new Date().toISOString(),
      attended: false,
    });
    setSubmitted(true);
  };

  const update = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <div className="event-container">
        {/* Back */}
        <div className="event-back-row" style={{ marginBottom: 24 }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>

        {/* Main layout */}
        <div className="event-grid">
          {/* Left — Banner */}
          <div>
            {bannerSrc ? (
              <img
                src={bannerSrc}
                alt={event.title}
                className="event-banner-img"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            ) : (
              <div
                className="event-banner-img"
                style={{
                  height: 280,
                  background: "linear-gradient(135deg, #0f2347, #1a3a6b)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 64,
                }}
              >
                🎓
              </div>
            )}

            {/* Tags */}
            <div className="event-tags-row" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(37,99,235,0.12)",
                    color: "#93c5fd",
                    border: "1px solid rgba(37,99,235,0.25)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div className="event-details-col">
            {/* Category gradient pill */}
            <div
              style={{
                display: "inline-block",
                padding: "8px 22px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
                color: "#fff",
                background: "linear-gradient(90deg, #f59e0b 0%, #6b7fa8 55%, #3b82f6 100%)",
                marginBottom: 18,
              }}
            >
              {category}
            </div>

            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fdf6e3", marginBottom: 20, lineHeight: 1.2 }}>
              {event.title}
            </h1>

            {/* Meta pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              {metaPills.filter((m) => m.text).map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 999,
                      padding: "10px 18px",
                    }}
                  >
                    <Icon size={16} color={m.color} strokeWidth={2.2} />
                    <span style={{ fontSize: 13.5, color: "#fff", fontWeight: 600 }}>{m.text}</span>
                  </div>
                );
              })}
            </div>

            {/* About card */}
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "26px 28px",
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>
                <span style={{ color: "#fff" }}>About This </span>
                <span style={{ color: "#fbbf24" }}>Event</span>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#cbd5e1" }}>
                {event.description}
              </p>
            </div>

            {/* Extra detail chips */}
            {extraDetails.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {extraDetails.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "10px 14px",
                      }}
                    >
                      <Icon size={16} color="#fbbf24" />
                      <div>
                        <div style={{ fontSize: 10.5, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 600 }}>{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Stats */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{registrations.length}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Registered</div>
              </div>
              <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80" }}>
                  {registrations.filter((r) => r.attended).length}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Attended</div>
              </div>
              <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#93c5fd" }}>
                  {event.maxParticipants - registrations.length}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Seats Left</div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%" }}
              onClick={() => setShowRegister(true)}
            >
              Register for this Event →
            </button>
          </div>
        </div>

        {/* Event Winners */}
        {event.winners && event.winners.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 18 }}>
              <span style={{ color: "#fff" }}>Event </span>
              <span style={{ color: "#fbbf24" }}>Winners</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {event.winners.map((w, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "16px 18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Trophy size={16} color="#fbbf24" />
                    <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 700, textTransform: "uppercase" }}>
                      {w.position}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>{w.name}</div>
                  {w.team && <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>{w.team}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── REGISTER MODAL ── */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => !submitted && setShowRegister(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setShowRegister(false); setSubmitted(false); }}>✕</button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                  Registered Successfully!
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
                  You're registered for <strong style={{ color: "#fff" }}>{event.title}</strong>.<br />
                  See you there!
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => { setShowRegister(false); setSubmitted(false); }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                  Register
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 20 }}>
                  {event.title}
                </p>

                <div className="form-group">
                  <label>Full Name *</label>
                  <input placeholder="Enter your full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" placeholder="your@kongu.edu" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Department *</label>
                    <select value={form.department} onChange={(e) => update("department", e.target.value)}>
                      <option value="">Select dept</option>
                      {["MTS","MECH","EEE","ECE","CSE","CIVIL","IT","AIDS","AIML"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Roll Number *</label>
                    <input placeholder="Eg: 25MTR116" value={form.rollNumber} onChange={(e) => update("rollNumber", e.target.value)} />
                  </div>
                </div>

                {/* Barcode scan */}
                <div className="form-group">
                  <label>ID Card Barcode * (mandatory)</label>
                  {form.barcodeData ? (
                    <div
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.3)",
                        borderRadius: 8,
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#4ade80", fontSize: 13, fontWeight: 600 }}>
                        ✅ Scanned: {form.barcodeData}
                      </span>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => { setForm((f) => ({ ...f, barcodeData: "" })); setScanning(true); }}
                      >
                        Re-scan
                      </button>
                    </div>
                  ) : scanning ? (
                    <BarcodeScanner
                      onScan={handleScan}
                      onClose={() => setScanning(false)}
                    />
                  ) : (
                    <>
                      <button
                      className="btn btn-outline btn-outline-gold"
                      style={{ width: "100%" }}
                      onClick={() => { setScanError(""); setScanning(true); }}
                      >
                        📷 Open Scanner — Scan ID Card Barcode
                        </button>
                      {scanError && (
                        <div style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>
                          ⚠️ {scanError}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <button
  className="btn btn-primary"
  style={{ width: "100%", marginTop: 70, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}
  onClick={handleSubmit}
>
  Submit Registration
</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}