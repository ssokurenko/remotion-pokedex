import React from "react";
import { Img, useVideoConfig, useCurrentFrame } from "remotion";

type Props = {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
};

const formatToFourDigits = (num: number): string =>
  `#${num.toString().padStart(4, "0")}`;

export const Pokemon: React.FC<Props> = ({ id, name, imageUrl }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Set the animation duration and control the fade-in based on the frame
  const fadeInDuration = fps; // Adjust this to control the fade-in speed
  const fadeInOpacity = frame < fadeInDuration ? frame / fadeInDuration : 1;

  const animatedStyles = {
    background:
      "linear-gradient(to left, #ff007f, #ff7f00, #ffff00, #00ff00, #0000ff, #8a2be2, #ff007f)",
    backgroundSize: "400% 400%",
    color: "transparent", // Make the text color transparent to show gradient
    backgroundClip: "text", // Clip the background gradient to the text
    animation: `rainbow ${40 * fps}s ease infinite`, // Rainbow animation
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Left Half: Pokemon Image with Fade-in */}
      {imageUrl && (
        <Img
          src={imageUrl}
          style={{
            width: "50%", // Takes up left half of the container
            height: "auto",
            objectFit: "cover",
            marginLeft: "1rem",
            opacity: fadeInOpacity, // Apply fade-in opacity based on the frame
            transition: "opacity 0.5s ease", // Smooth transition for the opacity
          }}
        />
      )}

      {/* Right Half: ID and Name */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: "4rem",
          height: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "8rem",
            fontWeight: "bold",
            textAlign: "right",
            marginBottom: "1rem",
            ...animatedStyles,
          }}
        >
          {formatToFourDigits(id)}
        </h1>
        {/* Capitalized Name with Bangers font and rainbow animation */}
        <h1
          style={{
            fontSize: name?.length > 9 ? "9rem" : "10rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            textAlign: "center",
            fontFamily: "'Bangers', sans-serif",
            letterSpacing: "0.1em",
            ...animatedStyles,
          }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};
