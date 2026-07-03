import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoleOption } from "../components/Navbar";
import shBg from "../assets/sh.jpeg";

const ACCENT = "#2563eb"; // same unified color used in Navbar

// Icon shown in the avatar circle, keyed by role path.
const ROLE_ICONS: Record<string, string> = {
  "/faculty": "👤",
  "/clubadmin": "👤",
  "/sc": "👤",
  "/volunteer": "👤",
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Role comes from navigate("/login", { state: { role } }) in Navbar.
  // If someone lands on /login directly, fall back to a generic role.
  const role = (location.state as { role?: RoleOption })?.role;
  const safeRole: RoleOption = role ?? {
    label: "Member",
    path: "/",
    color: ACCENT,
  };
  const roleIcon = ROLE_ICONS[safeRole.path] ?? "👤";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(safeRole.path); // redirect into that role's dashboard
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#050508",
      }}
    >
      {/* Lightly blurred background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${shBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
          opacity: 0.85,
          zIndex: 0,
        }}
      />

      {/* Dark tint so the form stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(6, 6, 10, 0.35)",
          zIndex: 1,
        }}
      />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 2,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 13,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        ← Back
      </button>

      {/* Login card */}
      <div
        className="modal-box"
        style={{
          position: "relative",
          zIndex: 2,
          border: `1px solid ${ACCENT}40`,
          boxShadow: `0 0 0 1px ${ACCENT}20, 0 32px 80px rgba(0,0,0,0.8)`,
          maxWidth: 420,
          width: "90%",
          background: "#12121a",
          borderRadius: 16,
          padding: 32,
        }}
      >
        {/* Role badge */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `${ACCENT}20`,
              border: `2px solid ${ACCENT}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              margin: "0 auto 14px",
            }}
          >
            {roleIcon}
          </div>

          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 20,
              background: `${ACCENT}15`,
              border: `1px solid ${ACCENT}40`,
              color: ACCENT,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            {safeRole.label}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0 }}>
            Welcome Back
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
            KEC Event Management System
          </p>
        </div>

        <div className="divider" />

        {/* Form */}
        <div style={{ marginTop: 20 }}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@kongu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ paddingRight: 44 }}
              />
              <button
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: 16,
                  padding: 0,
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: ACCENT, cursor: "pointer", fontWeight: 500 }}>
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 10,
              border: "none",
              background: loading ? `${ACCENT}80` : ACCENT,
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: 14 }}>⟳</span>
                Signing in...
              </>
            ) : (
              "Login →"
            )}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 20 }}>
          Access restricted to authorised KEC members only
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}