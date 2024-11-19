import { AbsoluteFill } from "remotion";

const colorPresets = {
  apple: [
    "#74EBD5", // Teal Mint
    "#ACB6E5", // Soft Blue
    "#FBC2EB", // Lavender Pink
    "#FFA8A8", // Blush Pink
    "#85FFBD", // Bright Lime
  ],
  sunset: [
    "#FF9A8B", // Soft Coral
    "#FF6A88", // Warm Pink
    "#FF99AC", // Peach Pink
    "#FC627A", // Bold Rose
    "#FCE38A", // Pastel Yellow
  ],
  ocean: [
    "#00C9FF", // Aqua Blue
    "#92FE9D", // Mint Green
    "#1479FF", // Deep Sea Blue
    "#7AF5FF", // Light Cyan
    "#52B4E7", // Steel Blue
  ],
};

type BackgroundProps = {
  preset?: keyof typeof colorPresets;
  speedSeconds?: number;
};

export const Background: React.FC<BackgroundProps> = ({ preset = "apple", speedSeconds = 10 }) => {
  const colors = colorPresets[preset];

  return (
    <AbsoluteFill
      style={{
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(circle at 20% 30%, ${colors[0]}, transparent 40%),
          radial-gradient(circle at 80% 20%, ${colors[1]}, transparent 50%),
          radial-gradient(circle at 50% 80%, ${colors[2]}, transparent 40%),
          radial-gradient(circle at 90% 90%, ${colors[3]}, transparent 60%),
          radial-gradient(circle at 10% 70%, ${colors[4]}, transparent 50%)
        `,
        backgroundSize: "200% 200%",
        animation: `meshAnimation ${speedSeconds}s ease-in-out infinite`,
      }}
    />
  );
};
