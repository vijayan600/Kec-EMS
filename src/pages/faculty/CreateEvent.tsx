import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLUBS, EVENTS, Role } from "../../data/static";

interface Props {
  role?: Role;
  basePath?: string;
}

export default function CreateEvent({ role = "faculty", basePath = "/faculty" }: Props) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: "",
    clubId: CLUBS[0]?.id ?? "",
    description: "",
    venue: "",
    date: "",
    time: "",
    maxParticipants: "60",
    points: "10",
    prize: "",
    chiefGuest: "",
    registrationDeadline: "",
    tags: "",
    bannerImage: "",
  });

  const update = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSave = () => {
    if (!form.title || !form.date || !form.venue) {
      alert("Please fill in Title, Date, and Venue at minimum.");
      return;
    }
    // In real app: push to EVENTS array
    const newEvent = {
      id: `e${Date.now()}`,
      clubId: form.clubId,
      title: form.title,
      description: form.description,
      venue: form.venue,
      date: form.date,
      time: form.time,
      maxParticipants: parseInt(form.maxParticipants) || 60,
      points: parseInt(form.points) || 10,
      status: "upcoming" as const,
      bannerImage: form.bannerImage || "hackathon.jpeg",
      approved: role === "clubadmin", // club admin auto-approved
      createdBy: role,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      prize: form.prize,
      chiefGuest: form.chiefGuest,
      registrationDeadline: form.registrationDeadline,
    };
    EVENTS.push(newEvent);
    setSaved(true);
    setTimeout(() => navigate(`${basePath}/events`), 1500);
  };

  return (
    <div>
      <div className="page-title">Create Event</div>
      <div className="page-subtitle">Fill in the event details below</div>

      {saved && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#4ade80", fontWeight: 600 }}>
          ✅ Event created successfully! {role === "faculty" ? "Pending club admin approval." : "Event is live."} Redirecting...
        </div>
      )}

      <div className="card">
        <div className="form-grid-2">
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Event Title *</label>
            <input placeholder="e.g. Web Design Championship" value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Club *</label>
            <select value={form.clubId} onChange={(e) => update("clubId", e.target.value)}>
              {CLUBS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Venue *</label>
            <input placeholder="e.g. CSE Lab Block - Lab 3" value={form.venue} onChange={(e) => update("venue", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Max Participants</label>
            <input type="number" value={form.maxParticipants} onChange={(e) => update("maxParticipants", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Points</label>
            <input type="number" value={form.points} onChange={(e) => update("points", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Registration Deadline</label>
            <input type="date" value={form.registrationDeadline} onChange={(e) => update("registrationDeadline", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Banner Image Filename</label>
            <input placeholder="e.g. webdesign.jpeg" value={form.bannerImage} onChange={(e) => update("bannerImage", e.target.value)} />
          </div>

          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Description</label>
            <textarea placeholder="Describe the event..." value={form.description} onChange={(e) => update("description", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Chief Guest</label>
            <input placeholder="Optional" value={form.chiefGuest} onChange={(e) => update("chiefGuest", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Prize</label>
            <input placeholder="e.g. ₹5000 Cash Prize" value={form.prize} onChange={(e) => update("prize", e.target.value)} />
          </div>

          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Tags (comma separated)</label>
            <input placeholder="e.g. technical, coding, competition" value={form.tags} onChange={(e) => update("tags", e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button className="btn btn-primary" onClick={handleSave}>
            {role === "faculty" ? "Submit for Approval" : "Create & Publish"}
          </button>
          <button className="btn btn-outline" onClick={() => navigate(`${basePath}/events`)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}