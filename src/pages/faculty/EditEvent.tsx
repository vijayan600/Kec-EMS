import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CLUBS, EVENTS } from "../../data/static";

interface Props { basePath?: string; }

export default function EditEvent({ basePath = "/faculty" }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find((e) => e.id === id);

  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: event?.title ?? "",
    clubId: event?.clubId ?? CLUBS[0]?.id ?? "",
    description: event?.description ?? "",
    venue: event?.venue ?? "",
    date: event?.date ?? "",
    time: event?.time ?? "",
    maxParticipants: String(event?.maxParticipants ?? 60),
    points: String(event?.points ?? 10),
    prize: event?.prize ?? "",
    chiefGuest: event?.chiefGuest ?? "",
    registrationDeadline: event?.registrationDeadline ?? "",
    tags: event?.tags?.join(", ") ?? "",
    bannerImage: event?.bannerImage ?? "",
  });

  if (!event) return (
    <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
      <div style={{ fontSize: 40 }}>❌</div>
      <div style={{ marginTop: 12, color: "#fff" }}>Event not found</div>
      <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => navigate(`${basePath}/events`)}>Back</button>
    </div>
  );

  const update = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleUpdate = () => {
    Object.assign(event, {
      title: form.title,
      clubId: form.clubId,
      description: form.description,
      venue: form.venue,
      date: form.date,
      time: form.time,
      maxParticipants: parseInt(form.maxParticipants) || 60,
      points: parseInt(form.points) || 10,
      prize: form.prize,
      chiefGuest: form.chiefGuest,
      registrationDeadline: form.registrationDeadline,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      bannerImage: form.bannerImage,
    });
    setSaved(true);
    setTimeout(() => navigate(`${basePath}/events`), 1500);
  };

  return (
    <div>
      <div className="page-title">Edit Event</div>
      <div className="page-subtitle">Update the event details — changes are saved immediately</div>

      {saved && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#4ade80", fontWeight: 600 }}>
          ✅ Event updated successfully! Redirecting...
        </div>
      )}

      <div className="card">
        <div className="form-grid-2">
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Event Title *</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Club</label>
            <select value={form.clubId} onChange={(e) => update("clubId", e.target.value)}>
              {CLUBS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Venue</label>
            <input value={form.venue} onChange={(e) => update("venue", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Date</label>
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
            <input value={form.bannerImage} onChange={(e) => update("bannerImage", e.target.value)} />
          </div>
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Chief Guest</label>
            <input value={form.chiefGuest} onChange={(e) => update("chiefGuest", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Prize</label>
            <input value={form.prize} onChange={(e) => update("prize", e.target.value)} />
          </div>
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => update("tags", e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button className="btn btn-primary" onClick={handleUpdate}>Update Event</button>
          <button className="btn btn-outline" onClick={() => navigate(`${basePath}/events`)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}