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
      {/* Tab bar */}
      <div
        className="tab-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ marginLeft: "auto", marginRight: "auto", touchAction: "pan-y" }}
      >
        <button onClick={() => navigate("/volunteer")}>Dashboard</button>
        <button className="active">Attendance Scanner</button>
      </div>

      <AttendanceScanner />
    </div>
  );
}