import './tailwind.css';
import { Composition } from "remotion";
import { Intro, myCompSchema } from "./Intro";

import { fps, width, height, introDurationInFrames } from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={introDurationInFrames}
        fps={fps}
        width={width}
        height={height}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Remotion Pokedex",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
