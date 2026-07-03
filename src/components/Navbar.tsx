import { useState } from "react";
import { useNavigate } from "react-router-dom";
import shaLogo from "../assets/sha.png";
import kecLogo from "../assets/kec.png";

export type RoleOption = {
  label: string;
  path: string;
  color: string;
};

// Single unified accent color used across ALL role boxes/badges.
// Change this one value to re-theme every login box at once.
const ACCENT = "#2563eb";

export const LOGIN_OPTIONS: RoleOption[] = [
  { label: "Faculty Coordinator", path: "/faculty",   color: ACCENT },
  { label: "Club Admin",          path: "/clubadmin", color: ACCENT },
  { label: "Student Coordinator", path: "/sc",        color: ACCENT },
  { label: "Club Volunteer",      path: "/volunteer", color: ACCENT },
];

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleRoleClick = (opt: RoleOption) => {
    setShowDropdown(false);
    // Navigate to the dedicated /login page instead of opening a modal
    navigate("/login", { state: { role: opt } });
  };

  return (
    <>
      {/* ── Outside-click backdrop — BEHIND dropdown (z:300) ── */}
      {showDropdown && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 300 }}
          onClick={() => setShowDropdown(false)}
        />
      )}

      <nav className="navbar" style={{ zIndex: 400 }}>
        {/* Left — SHA logo */}
        <div style={{ display: "flex", alignItems: "center", minWidth: 80 }}>
          <img
            src={shaLogo}
            alt="SHA"
            style={{ height: 40, objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Center — KEC logo (absolute so it's truly centered) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <img
            src={kecLogo}
            alt="KEC"
            style={{ height: 48, objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Right — Login button + dropdown */}
        <div style={{ position: "relative", zIndex: 500 }}>
          <button
            className="btn btn-white btn-sm"
            onClick={() => setShowDropdown((v) => !v)}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            Login <span style={{ fontSize: 10, opacity: 0.6 }}>{showDropdown ? "▴" : "▾"}</span>
          </button>

          {/* Dropdown — z:500 so it's above the backdrop */}
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 10px)",
                background: "#0a1628",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: 6,
                minWidth: 190,
                zIndex: 500,
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "6px 10px 9px",
                  fontSize: 11,
                  color: "#879ebeff",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  marginBottom: 4,
                }}
              >
                Login as
              </div>

              {LOGIN_OPTIONS.map((opt) => (
                <button
                  key={opt.path}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleClick(opt);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    padding: "9px 10px",
                    background: "transparent",
                    border: "none",
                    color: "#e2e8f0",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    borderRadius: 8,
                    textAlign: "left",
                    transition: "background 0.15s",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: 2,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${ACCENT}22`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>
                      {opt.path.replace("/", "")} portal
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}