import * as React from "react";

function RegisteredMarkIcon({
  width = "1em",
  height = "1em",
  fill = "#ffffff",
  ...props
}) {
  return (
    <svg
      viewBox="0 0 23 24"
      fill={fill}
      width={width}
      height={height}
      {...props}
    >
      <path d="M12.14 2a10 10 0 1010 10 10 10 0 00-10-10zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
      <path d="M16.14 10a3 3 0 00-3-3h-5v10h2v-4h1.46l2.67 4h2.4l-2.75-4.12A3 3 0 0016.14 10zm-3 1h-3V9h3a1 1 0 010 2z" />
    </svg>
  );
}

export default RegisteredMarkIcon;
