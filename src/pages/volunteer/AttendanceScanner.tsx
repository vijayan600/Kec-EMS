import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AttendanceScanner from "../studentcoordinator/AttendanceScanner";

export default function VolunteerScannerWrapper() {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SWIPE_THRESHOLD = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (delta < -SWIPE_THRESHOLD) {
      navigate("/volunteer");
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div>
      {/* Tab bar — swipe zone limited to this element only */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          display: "flex",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 4,
          marginBottom: 24,
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
          touchAction: "pan-y",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            width: "calc(50% - 4px)",
            height: "calc(100% - 8px)",
            borderRadius: 7,
            background: "var(--blue-bright)",
            transition: "transform 0.3s ease",
            transform: "translateX(100%)",
            zIndex: 0,
          }}
        />
        <button
          onClick={() => navigate("/volunteer")}
          style={{
            position: "relative",
            zIndex: 1,
            padding: "8px 24px",
            borderRadius: 7,
            border: "none",
            background: "transparent",
            color: "var(--text-muted)",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Dashboard
        </button>
        <button
          style={{
            position: "relative",
            zIndex: 1,
            padding: "8px 24px",
            borderRadius: 7,
            border: "none",
            background: "transparent",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Attendance Scanner
        </button>
      </div>

      <AttendanceScanner />
    </div>
  );
}