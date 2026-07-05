import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";

const VOL_NAV = [
  { icon: "", label: "Dashboard",          path: "/volunteer/dashboard" },
  { icon: "", label: "Attendance Scanner", path: "/volunteer/scanner" },
];

export default function VolunteerLayout() {
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
            style={{ background: "rgba(217,119,6,0.2)", color: "#fcd34d", border: "1px solid rgba(217,119,6,0.3)" }}
          >
            Volunteer
          </div>
        </div>

        <nav className="sidebar-nav">
          {VOL_NAV.map((item) => (
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
              <LayoutDashboard size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#e0ddddff"}}>Volunteer Panel</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>volunteer</div>
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