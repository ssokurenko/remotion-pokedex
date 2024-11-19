import "./tailwind.css";
import { Composition } from "remotion";

import {
  fps,
  width,
  height,
  introDurationInFrames,
  slideDuration,
  title,
  totalCount,
} from "./config";
import { SlideShow, slideshowSchema } from "./components/SlideShow";

export const RemotionRoot: React.FC = () => {
  const totalDuration = introDurationInFrames + slideDuration * totalCount;
  return (
    <Composition
      id="SlideShow"
      component={SlideShow}
      durationInFrames={totalDuration}
      fps={fps}
      width={width}
      height={height}
      schema={slideshowSchema}
      defaultProps={{
        titleText: title,
        slideDuration,
        totalCount,
      }}
    />
  );
};
