import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { icon: "📊", label: "Dashboard",           path: "/clubadmin/dashboard" },
  { icon: "✅", label: "Event Approval",      path: "/clubadmin/event-approval" },
  { icon: "📋", label: "List Events",         path: "/clubadmin/events" },
  { icon: "➕", label: "Create Event",        path: "/clubadmin/create-event" },
  { icon: "📄", label: "OD Generation",       path: "/clubadmin/od-generation" },
  { icon: "👨‍🎓", label: "Coordinator Mgmt",  path: "/clubadmin/coordinator-management" },
  { icon: "📍", label: "Student Attendance",  path: "/clubadmin/attendance" },
  { icon: "🏛️", label: "Edit Club Details",  path: "/clubadmin/club-details" },
];

export default function ClubAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>KEC EMS</div>
          <div
            className="sidebar-role-badge"
            style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}
          >
            Club Admin
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setSidebarOpen(false)}
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
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
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
              <Building2 size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#e0ddddff" }}>Club Admin Dashboard</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>clubadmin</div>
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