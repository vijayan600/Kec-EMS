// ============================================================
//  EMS - Static Data File
// ============================================================

export type EventStatus = "ongoing" | "upcoming" | "past";
export type Role = "faculty" | "clubadmin" | "studentcoordinator" | "volunteer";

// ─── CLUBS ───────────────────────────────────────────────────
export interface Club {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  adminEmail: string;
}

export const CLUBS: Club[] = [
  {
    id: "c1",
    name: "IEEE Student Branch",
    description: "Technical excellence and innovation club",
    logoUrl: "",
    adminEmail: "ieee@kongu.edu",
  },
  {
    id: "c2",
    name: "NSS",
    description: "National Service Scheme — social service wing",
    logoUrl: "",
    adminEmail: "nss@kongu.edu",
  },
  {
    id: "c3",
    name: "Rotaract Club",
    description: "Service above self",
    logoUrl: "",
    adminEmail: "rotaract@kongu.edu",
  },
  {
    id: "c4",
    name: "Photography Club",
    description: "Capturing moments, creating memories",
    logoUrl: "",
    adminEmail: "photo@kongu.edu",
  },
];

// ─── EVENTS ──────────────────────────────────────────────────
export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  venue: string;
  date: string;           // "DD-MM-YYYY"
  time: string;           // "HH:MM AM/PM"
  maxParticipants: number;
  points: number;
  status: EventStatus;
  bannerImage: string;    // filename in src/assets/events/
  approved: boolean;      // club admin approval
  createdBy: Role;
  tags: string[];
  chiefGuest?: string;
  prize?: string;
  registrationDeadline: string;
}

export const EVENTS: Event[] = [
  {
    id: "e1",
    clubId: "c1",
    title: "Web Design Championship",
    description:
      "A competitive event where participants showcase their web design skills by building responsive, creative, and functional websites within a time limit. Open to all departments.",
    venue: "CSE Lab Block - Lab 3",
    date: "15-07-2026",
    time: "09:00 AM",
    maxParticipants: 60,
    points: 20,
    status: "upcoming",
    bannerImage: "webdesign.jpeg",
    approved: true,
    createdBy: "clubadmin",
    tags: ["technical", "design", "competition"],
    prize: "₹5000 Cash Prize",
    registrationDeadline: "12-07-2026",
  },
  {
    id: "e2",
    clubId: "c1",
    title: "24hr Hackathon",
    description:
      "Build innovative solutions to real-world problems in 24 hours. Team event with 2-4 members per team. Problem statements released on the day of the event.",
    venue: "Main Seminar Hall",
    date: "20-07-2026",
    time: "08:00 AM",
    maxParticipants: 120,
    points: 30,
    status: "upcoming",
    bannerImage: "hackathon.jpeg",
    approved: true,
    createdBy: "faculty",
    tags: ["hackathon", "coding", "teamwork"],
    chiefGuest: "Dr. R. Senthilkumar, HOD-CSE",
    prize: "₹15000 + Internship Opportunity",
    registrationDeadline: "18-07-2026",
  },
  {
    id: "e3",
    clubId: "c3",
    title: "Robotics Workshop",
    description:
      "Hands-on workshop on building line-follower and obstacle-avoiding robots using Arduino. All components provided. Certificate of participation for all attendees.",
    venue: "ECE Seminar Hall",
    date: "05-07-2026",
    time: "10:00 AM",
    maxParticipants: 40,
    points: 15,
    status: "ongoing",
    bannerImage: "robotics.jpeg",
    approved: true,
    createdBy: "clubadmin",
    tags: ["robotics", "arduino", "workshop"],
    registrationDeadline: "04-07-2026",
  },
  {
    id: "e4",
    clubId: "c4",
    title: "Photography Contest",
    description:
      "Express yourself through the lens! Submit your best photographs on the theme 'Campus Life'. Winners get featured in the college magazine.",
    venue: "College Campus",
    date: "10-06-2026",
    time: "07:00 AM",
    maxParticipants: 80,
    points: 10,
    status: "past",
    bannerImage: "photography.jpeg",
    approved: true,
    createdBy: "clubadmin",
    tags: ["photography", "creative", "contest"],
    prize: "Trophy + Certificate",
    registrationDeadline: "08-06-2026",
  },
  {
    id: "e5",
    clubId: "c2",
    title: "Blood Donation Camp",
    description:
      "Donate blood, save lives. NSS organizes this annual blood donation camp in association with Erode Government Hospital. Free health checkup for all donors.",
    venue: "KEC Indoor Stadium",
    date: "25-07-2026",
    time: "09:00 AM",
    maxParticipants: 200,
    points: 25,
    status: "upcoming",
    bannerImage: "hackathon.jpeg",
    approved: false,  // pending club admin approval
    createdBy: "faculty",
    tags: ["social", "nss", "health"],
    registrationDeadline: "24-07-2026",
  },
];

// ─── USERS ───────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  clubId?: string;
  department?: string;
  password: string;
}

export const USERS: User[] = [
  {
    id: "u1",
    name: "Dr. Meena Krishnan",
    email: "meena@kongu.edu",
    role: "faculty",
    department: "CSE",
    password: "faculty123",
  },
  {
    id: "u2",
    name: "Arjun S",
    email: "ieee@kongu.edu",
    role: "clubadmin",
    clubId: "c1",
    department: "ECE",
    password: "admin123",
  },
  {
    id: "u3",
    name: "Priya R",
    email: "priya@kongu.edu",
    role: "studentcoordinator",
    clubId: "c1",
    department: "CSE",
    password: "20CB123",
  },
  {
    id: "u4",
    name: "Karthik M",
    email: "karthik@kongu.edu",
    role: "volunteer",
    clubId: "c1",
    department: "IT",
    password: "20CB456",
  },
];

// ─── REGISTRATIONS ───────────────────────────────────────────
export interface Registration {
  id: string;
  eventId: string;
  studentName: string;
  email: string;
  department: string;
  rollNumber: string;
  barcodeData: string;      // scanned barcode from ID card
  registeredAt: string;     // ISO timestamp
  attended: boolean;
  attendedAt?: string;
}

export let REGISTRATIONS: Registration[] = [
  {
    id: "r1",
    eventId: "e1",
    studentName: "Vijay Kumar",
    email: "vijaykumar@kongu.edu",
    department: "CSE",
    rollNumber: "22CB001",
    barcodeData: "22CB001KEC",
    registeredAt: "2026-07-01T10:30:00",
    attended: true,
    attendedAt: "2026-07-01T09:05:00",
  },
  {
    id: "r2",
    eventId: "e1",
    studentName: "Sneha P",
    email: "sneha@kongu.edu",
    department: "ECE",
    rollNumber: "22EC045",
    barcodeData: "22EC045KEC",
    registeredAt: "2026-07-01T11:00:00",
    attended: false,
  },
  {
    id: "r3",
    eventId: "e2",
    studentName: "Rahul D",
    email: "rahul@kongu.edu",
    department: "MECH",
    rollNumber: "22ME012",
    barcodeData: "22ME012KEC",
    registeredAt: "2026-07-02T09:00:00",
    attended: false,
  },
];

// ─── STUDENT COORDINATORS (managed by faculty) ───────────────
export interface StudentCoordinator {
  id: string;
  name: string;
  email: string;
  department: string;
  rollNumber: string;
  clubId: string;
  addedBy: string; // faculty user id
}

export let STUDENT_COORDINATORS: StudentCoordinator[] = [
  {
    id: "sc1",
    name: "Priya R",
    email: "priya@kongu.edu",
    department: "CSE",
    rollNumber: "22CB067",
    clubId: "c1",
    addedBy: "u1",
  },
];

// ─── VOLUNTEERS (managed by student coordinator) ──────────────
export interface Volunteer {
  id: string;
  name: string;
  email: string;
  department: string;
  clubId: string;
  password: string; // DOB
  addedBy: string;  // student coordinator user id
}

export let VOLUNTEERS: Volunteer[] = [
  {
    id: "v1",
    name: "Karthik M",
    email: "karthik@kongu.edu",
    department: "IT",
    clubId: "c1",
    password: "01012004",
    addedBy: "sc1",
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────

/** Add a new registration */
export const addRegistration = (reg: Omit<Registration, "id">): Registration => {
  const newReg: Registration = {
    ...reg,
    id: `r${Date.now()}`,
  };
  REGISTRATIONS.push(newReg);
  return newReg;
};

/** Mark student as attended via barcode */
export const markAttendance = (barcodeData: string, eventId: string): Registration | null => {
  const reg = REGISTRATIONS.find(
    (r) => r.barcodeData === barcodeData && r.eventId === eventId
  );
  if (reg) {
    reg.attended = true;
    reg.attendedAt = new Date().toISOString();
    return reg;
  }
  return null;
};

/** Get registrations for a specific event */
export const getEventRegistrations = (eventId: string): Registration[] =>
  REGISTRATIONS.filter((r) => r.eventId === eventId);

/** Get events by status */
export const getEventsByStatus = (status: EventStatus): Event[] =>
  EVENTS.filter((e) => e.status === status && e.approved);

/** Get approved events only */
export const getApprovedEvents = (): Event[] =>
  EVENTS.filter((e) => e.approved);

/** Get pending approval events */
export const getPendingEvents = (): Event[] =>
  EVENTS.filter((e) => !e.approved);

/** Add volunteer */
export const addVolunteer = (vol: Omit<Volunteer, "id">): Volunteer => {
  const newVol: Volunteer = { ...vol, id: `v${Date.now()}` };
  VOLUNTEERS.push(newVol);
  return newVol;
};

/** Remove volunteer */
export const removeVolunteer = (id: string): void => {
  VOLUNTEERS = VOLUNTEERS.filter((v) => v.id !== id);
};

/** Add student coordinator */
export const addStudentCoordinator = (sc: Omit<StudentCoordinator, "id">): StudentCoordinator => {
  const newSC: StudentCoordinator = { ...sc, id: `sc${Date.now()}` };
  STUDENT_COORDINATORS.push(newSC);
  return newSC;
};

/** Remove student coordinator */
export const removeStudentCoordinator = (id: string): void => {
  STUDENT_COORDINATORS = STUDENT_COORDINATORS.filter((sc) => sc.id !== id);
};

/** Approve event (club admin) */
export const approveEvent = (eventId: string): void => {
  const event = EVENTS.find((e) => e.id === eventId);
  if (event) event.approved = true;
};

/** Reject event (club admin) — removes it from the events list */
export const rejectEvent = (eventId: string): void => {
  const index = EVENTS.findIndex((e) => e.id === eventId);
  if (index !== -1) EVENTS.splice(index, 1);
};