import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";

// Faculty
import FacultyLayout from "./layouts/FacultyLayout";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import CreateEvent from "./pages/faculty/CreateEvent";
import EditEvent from "./pages/faculty/EditEvent";
import ListEvents from "./pages/faculty/ListEvents";
import ODGeneration from "./pages/faculty/ODGeneration";
import StudentCoordinatorMgmt from "./pages/faculty/StudentCoordinatorMgmt";
import StudentAttendance from "./pages/faculty/StudentAttendance";
import EditClubDetails from "./pages/faculty/EditClubDetails";

// Club Admin
import ClubAdminLayout from "./layouts/ClubAdminLayout";
import ClubAdminDashboard from "./pages/clubadmin/ClubAdminDashboard";
import EventApproval from "./pages/clubadmin/EventApproval";
import CACreateEvent from "./pages/clubadmin/CreateEvent";
import CAEditEvent from "./pages/clubadmin/EditEvent";
import CAListEvents from "./pages/clubadmin/ListEvents";
import CAODGeneration from "./pages/clubadmin/ODGeneration";
import CAStudentCoordinatorMgmt from "./pages/clubadmin/StudentCoordinatorMgmt";
import CAStudentAttendance from "./pages/clubadmin/StudentAttendance";
import CAEditClubDetails from "./pages/clubadmin/EditClubDetails";

// Student Coordinator
import SCLayout from "./layouts/SCLayout";
import SCDashboard from "./pages/studentcoordinator/SCDashboard";
import SCAttendanceScanner from "./pages/studentcoordinator/AttendanceScanner";
import VolunteerManagement from "./pages/studentcoordinator/VolunteerManagement";

// Volunteer
import VolunteerLayout from "./layouts/VolunteerLayout";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerAttendanceScanner from "./pages/volunteer/AttendanceScanner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />

        {/* Faculty */}
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="events" element={<ListEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="od-generation" element={<ODGeneration />} />
          <Route path="coordinator-management" element={<StudentCoordinatorMgmt />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="club-details" element={<EditClubDetails />} />
        </Route>

        {/* Club Admin */}
        <Route path="/clubadmin" element={<ClubAdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ClubAdminDashboard />} />
          <Route path="event-approval" element={<EventApproval />} />
          <Route path="events" element={<CAListEvents />} />
          <Route path="create-event" element={<CACreateEvent />} />
          <Route path="edit-event/:id" element={<CAEditEvent />} />
          <Route path="od-generation" element={<CAODGeneration />} />
          <Route path="coordinator-management" element={<CAStudentCoordinatorMgmt />} />
          <Route path="attendance" element={<CAStudentAttendance />} />
          <Route path="club-details" element={<CAEditClubDetails />} />
        </Route>

        {/* Student Coordinator */}
        <Route path="/sc" element={<SCLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SCDashboard />} />
          <Route path="scanner" element={<SCAttendanceScanner />} />
          <Route path="volunteers" element={<VolunteerManagement />} />
        </Route>

        {/* Volunteer */}
        <Route path="/volunteer" element={<VolunteerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VolunteerDashboard />} />
          <Route path="scanner" element={<VolunteerAttendanceScanner />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}