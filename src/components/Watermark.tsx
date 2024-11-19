import React from "react";
import { Img, staticFile } from "remotion";

type Props = {
  readonly text: string;
  readonly opacity?: number;
};

export const Watermark: React.FC<Props> = ({ text, opacity = 1 }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        height: "100%",
        width: "100%",
      }}
    >
      {/* Static YouTube image */}
      <Img
        src={staticFile("youtube.svg")}
        style={{
          height: "64px",
          marginRight: "10px",
          marginTop: "8px",
        }}
      />

      {/* Dynamic text */}
      <span
        style={{
          fontSize: "4rem",
          color: "#fff",
          fontWeight: "bold",
          lineHeight: "1", // Prevent extra spacing
        }}
      >
        {text}
      </span>
    </div>
  );
};
