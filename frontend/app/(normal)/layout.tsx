import { PropsWithChildren } from "react";
import CommonNavbar from "./_components/CommonNavbar";
import CommonFooter from "./_components/CommonFooter";

export default async function NormalLayout(props: PropsWithChildren) {
  return (
    <div>
      <CommonNavbar />
      {props.children}
      <CommonFooter />
    </div>
  );
}
