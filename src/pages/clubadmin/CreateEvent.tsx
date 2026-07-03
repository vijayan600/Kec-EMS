// CACreateEvent — Club Admin Create Event (auto-approved)
import CreateEvent from "../faculty/CreateEvent";
export default function CACreateEvent() {
  return <CreateEvent role="clubadmin" basePath="/clubadmin" />;
}