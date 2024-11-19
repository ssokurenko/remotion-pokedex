import { z } from "zod";
import {
  Audio,
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Slide } from "./Slide";
import { Title } from "./Title";
import { Background } from "./Background";
import { Pokemon } from "./Pokemon";
import { useGet } from "../hooks/useGet";
import {
  apiEndpoint,
  profileImageBaseUrl,
  profileImageExtension,
  ytHandle,
} from "../config";
import { Watermark } from "./Watermark";

export const slideshowSchema = z.object({
  titleText: z
    .string()
    .min(1, "Title text cannot be empty")
    .max(100, "Title text must be less than 100 characters"),

  slideDuration: z
    .number()
    .int("Slide duration must be a whole number")
    .min(30, "Slide duration must be at least 30 frames")
    .max(300, "Slide duration cannot exceed 300 frames"),

  totalCount: z
    .number()
    .int("Total count must be a whole number")
    .min(1, "Must have at least 1 slide")
    .max(2000, "Cannot exceed 2000 slides"),
});

export type SlideshowProps = z.infer<typeof slideshowSchema>;

export const SlideShow: React.FC<SlideshowProps> = ({
  titleText,
  slideDuration,
  totalCount,
}) => {
  const { fps } = useVideoConfig();

  const contentStartFrame = slideDuration;
  const titleDuration = slideDuration + 0.5 * slideDuration;

  const { data: pokemons } = useGet(`${apiEndpoint}?limit=${totalCount}`);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
      <Audio
        loop
        src={staticFile("soundtrack.mp3")}
        volume={0.9}
      />
      <AbsoluteFill>
        <Sequence name="Background">
          <Background preset="ocean" speedSeconds={10 * fps} />
        </Sequence>
        <Sequence name="Watermark" from={titleDuration}>
          <AbsoluteFill>
            <Watermark text={ytHandle} opacity={0.1} />
          </AbsoluteFill>
        </Sequence>

        <Sequence name="Title" durationInFrames={titleDuration}>
          <Title titleText={titleText} titleColor="#000" top="40%" />
        </Sequence>

        <Sequence name="SubTitle" from={fps} durationInFrames={titleDuration}>
          <Title
            titleText={`${totalCount} Characters`}
            titleColor="#FFF"
            opacity={0.9}
            top="55%"
          />
        </Sequence>

        {Array.from({ length: totalCount }).map((_, index) => {
          const id = index + 1;
          const startFrame = contentStartFrame + index * slideDuration;

          return (
            <Sequence
              key={id}
              name={`Slide ${id}`}
              from={startFrame}
              durationInFrames={slideDuration + 0.5 * slideDuration}
            >
              <Slide slideDuration={slideDuration}>
                <Pokemon
                  id={id}
                  imageUrl={profileImageBaseUrl + id + profileImageExtension}
                  name={(pokemons as { name: string }[])?.[index]?.name}
                />
              </Slide>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
