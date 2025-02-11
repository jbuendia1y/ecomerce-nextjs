import { PropsWithChildren } from "react";
import AdminNavbar from "./_components/AdminNavbar";

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <div>
      <AdminNavbar />
      {props.children}
    </div>
  );
}
