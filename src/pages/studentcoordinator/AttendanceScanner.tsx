import { useState } from "react";
import BarcodeScanner from "../../components/BarcodeScanner";
import { EVENTS, markAttendance, Registration } from "../../data/static";

export default function AttendanceScanner() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]?.id ?? "");
  const [scanning, setScanning] = useState(true); // camera opens by default
  const [result, setResult] = useState<{ success: boolean; reg?: Registration; code?: string } | null>(null);

  const handleScan = (code: string) => {
    const reg = markAttendance(code, selectedEvent);
    if (reg) {
      setResult({ success: true, reg });
    } else {
      setResult({ success: false, code });
    }
    // Auto-clear after 4s, then resume scanning
    setTimeout(() => setResult(null), 4000);
  };

  const event = EVENTS.find((e) => e.id === selectedEvent);

  return (
    <div>
      <div className="page-title">Attendance Scanner</div>
      <div className="page-subtitle">Scan student ID card barcode to mark attendance</div>

      {/* Event selector */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Select Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => { setSelectedEvent(e.target.value); setResult(null); }}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "Inter, sans-serif" }}
          >
            {EVENTS.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </div>
        {event && (
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-muted)" }}>
            📅 {event.date} &nbsp;·&nbsp; 📍 {event.venue}
          </div>
        )}
      </div>

      {/* Scan result */}
      {result && (
        <div
          style={{
            background: result.success ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${result.success ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 20,
          }}
        >
          {result.success && result.reg ? (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#4ade80", marginBottom: 6 }}>
                ✅ Attendance Marked!
              </div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{result.reg.studentName}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
                {result.reg.rollNumber} · {result.reg.department}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#f87171", marginBottom: 4 }}>
                ❌ Not Found
              </div>
              <div style={{ fontSize: 13, color: "#fca5a5" }}>
                Barcode <code>{result.code}</code> not registered for this event.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scanner - always open */}
      <div className="card">
        <div style={{ fontWeight: 600, color: "#fff", marginBottom: 12 }}>
           Point camera at the barcode on the ID card
        </div>
        <BarcodeScanner onScan={handleScan} onClose={() => {}} />
      </div>

      
    </div>
  );
}