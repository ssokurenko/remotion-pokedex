import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const slidePropsSchema = z.object({
  backgroundColor: zColor().optional(),
  slideDuration: z.number().int(), // Total duration of the slide in frames
  children: z.any().optional(),
});

export const Slide: React.FC<z.infer<typeof slidePropsSchema>> = ({
  backgroundColor = "#fff",
  slideDuration,
  children,
}) => {
  const frame = useCurrentFrame();

  const animationDuration = 0.5 * 30;

  const exitStart = slideDuration - animationDuration;

  const translateX = interpolate(
    frame,
    [0, animationDuration, exitStart, slideDuration],
    [1920, 0, 0, -1920], // Slide in, stay, then slide out
    {
      easing:
        frame < animationDuration
          ? Easing.out(Easing.ease)
          : Easing.in(Easing.ease),
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ padding: 80 }}>
      <div
        style={{
          transform: `translateX(${translateX}px)`,
          display: "flex",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor,
          width: "100%",
          height: "100%",
          fontSize: "4rem",
          color: "#000",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <AbsoluteFill>{children}</AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
