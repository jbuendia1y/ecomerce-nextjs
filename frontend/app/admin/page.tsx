import { permanentRedirect } from "next/navigation";

export default function AdminPage() {
  return permanentRedirect("/admin/dashboard");
}
