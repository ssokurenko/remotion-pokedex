import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const headerStyle: React.CSSProperties = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: "bold",
  fontSize: 140,
  textAlign: "center",
  position: "absolute",
  width: "100%",
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const Title: React.FC<{
  readonly titleText: string;
  readonly titleColor: string;
  readonly top?: string;
  readonly opacity?: number;
}> = ({ titleText, titleColor, top = "40%", opacity = 1 }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const words = titleText.split(" ");

  return (
    <h1 style={{ ...headerStyle, top, opacity}}>
      {words.map((t, i) => {
        const delay = i * 5;

        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: {
            damping: 200,
          },
        });

        return (
          <span
            key={t}
            style={{
              ...word,
              color: titleColor,
              transform: `scale(${scale})`,
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
};
