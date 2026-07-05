import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ClipboardList, LogOut } from "lucide-react";

const SC_NAV = [
  { icon: "", label: "Dashboard",          path: "/sc/dashboard" },
  { icon: "", label: "Attendance Scanner", path: "/sc/scanner" },
  { icon: "", label: "Volunteer Mgmt",     path: "/sc/volunteers" },
];

export default function SCLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }}
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>KEC EMS</div>
          <div
            className="sidebar-role-badge"
            style={{ background: "rgba(5,150,105,0.2)", color: "#6ee7b7", border: "1px solid rgba(5,150,105,0.3)" }}
          >
            Student Coordinator
          </div>
        </div>

        <nav className="sidebar-nav">
          {SC_NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        
      </aside>

      <div className="main-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="hamburger" onClick={() => setOpen(true)}>☰</button>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ClipboardList size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#e0ddddff" }}>Student Coordinator</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>coordinator</div>
            </div>
          </div>
          <button
            className="btn btn-white btn-sm"
            style={{ width: 36, height: 36, padding: 0, borderRadius: 10, justifyContent: "center" }}
            onClick={() => navigate("/")}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}