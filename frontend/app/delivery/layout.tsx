import { PropsWithChildren } from "react";
import DeliveryPanelNavbar from "./_components/DeliveryPanelNavbar";

export default async function DeliveryPanelLayout(props: PropsWithChildren) {
  return (
    <div>
      <DeliveryPanelNavbar />
      {props.children}
    </div>
  );
}
