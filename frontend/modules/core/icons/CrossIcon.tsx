export default function CrossIcon(props?: { stroke?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.4375 3.5625L3.5625 8.4375M3.5625 3.5625L8.4375 8.4375"
        stroke={props?.stroke ?? "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
