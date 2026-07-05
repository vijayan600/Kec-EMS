import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoleOption } from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = (location.state as { role?: RoleOption })?.role;
  const safeRole: RoleOption = role ?? {
    label: "Member",
    path: "/",
    color: "#2563eb",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(safeRole.path);
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
        background: "var(--bg-1)",
      }}
    >
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

      {/* Login card — Royal Blue Glassmorphism */}
      <div
        className="login-card-royal"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 420,
          width: "90%",
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
              background: "rgba(139,92,246,0.14)",
              border: "1px solid rgba(139,92,246,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "0 8px 24px rgba(139,92,246,0.15)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#c4b5fd" strokeWidth="1.8" />
              <path
                d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                stroke="#c4b5fd"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 20,
              background: "rgba(110,231,183,0.12)",
              border: "1px solid rgba(139,92,246,0.35)",
              color: "#c4b5fd",
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
              className="input-admin-style"
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
                className="input-admin-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ paddingRight: 44 }}
              />
              <button
                onClick={() => setShowPass((v) => !v)}
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPass ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M9.36 5.14A9.9 9.9 0 0112 5c5.5 0 9 4.5 10 7-.4 1.02-1.05 2.16-2 3.22M6.6 6.6C4.6 8 3.4 9.9 2 12c1.4 3 5 7 10 7 1.35 0 2.6-.28 3.72-.78"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "#c4b5fd", cursor: "pointer", fontWeight: 500 }}>
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn"
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background: loading
                ? "linear-gradient(90deg, rgba(110,231,183,0.1), rgba(139,92,246,0.1))"
                : "linear-gradient(90deg, rgba(110,231,183,0.22), rgba(139,92,246,0.22))",
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
              boxShadow: "0 8px 22px rgba(139,92,246,0.1)",
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